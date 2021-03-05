import React from 'react'
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../Hooks/stateProvider';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const[{ totalQuantity, totalPrice }, ] = useStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText = {(value) => (
                    <>
                        <h3>
                            Subtotal ({totalQuantity} items): <strong>{value}</strong>
                        </h3>
                        <small className="subtotal__gift">
                            <input type="checkbox"/> This order contains gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={e => {totalQuantity !== 0 ? history.push('/payment') : alert("No item in Basket")}}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
