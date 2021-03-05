import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';

import { ACTIONS } from '../../Hooks/reducer';
import { useStateValue } from '../../Hooks/stateProvider';
import axios from '../../axios';
import './Payment.css';
import { db } from '../../firebase';
import CartItem from '../Checkout/CartItem';

function Payment() {
    const [{ basket, totalPrice, user }, dispatch] = useStateValue();
    const productIds = Object.keys(basket).filter((id) => basket[id]);
    const arrayOfBasket = Object.keys(basket).map(id => basket[id]).filter(obj => obj);
    
    const history = useHistory();
    
    const stripe = useStripe();
    const elements = useElements();

    const[error, setError] = useState(null);
    const[disabled, setDisabled] = useState(true);
    const[processing, setProcessing] = useState(false);
    const[succeeded, setSucceeded] = useState(false);
    const[clientSecret, setClientSecret] = useState(null);
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        const getClientSecret = async () => {
            setDidMount(true);
            if(totalPrice !== 0){
                const response = await axios({
                    method: 'post',
                    url: '/payments/create',
                    data: {
                        basketTotal: totalPrice*100,
                    }
            });
            setClientSecret(response.data.clientSecret)
            }
        }
        getClientSecret();

        return () => setDidMount(false);
    }, [basket, totalPrice])

    console.log('THE SECRET IS >>>', clientSecret);
    console.log('THE USER >> ', user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if(paymentIntent && paymentIntent.status === 'succeeded'){
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: arrayOfBasket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              }, { merge: true })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: ACTIONS.EMPTY_BASKET
            })

            history.replace('/orders');

        } else {
            alert("Error: ", error)
        }
    }

    const handleChange = event => {
        // listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    if(!didMount) {
        return null;
    }
    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Delhi, India</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="cart__items">
                        {productIds.map((id) => (
                            <CartItem key={id} product={basket[id]} />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText = {(value) => (
                                        <h3>Order Total: {value}</h3>       
                                    )}
                                    decimalScale={2}
                                    value={totalPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                                {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
