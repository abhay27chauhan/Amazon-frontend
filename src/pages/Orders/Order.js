import React from 'react';
import './Order.css';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import OrderItem from './OrderItem';
import FlipMove from 'react-flip-move';

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p className="order__date">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            <FlipMove>
                {order.data.basket?.map((product) => (
                    <OrderItem key={product.id} product={product}/>
                ))}
            </FlipMove>
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />   
        </div>
    )
}

export default Order
