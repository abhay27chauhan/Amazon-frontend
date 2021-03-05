import React, { forwardRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './CartItem.scss';


import CurrencyFormat from 'react-currency-format';
import AddToCard from '../../utils/AddToCart';
import { calculatePriceDetails } from '../../utils/product';

const CartItem = forwardRef(({ product }, ref) => {
  const { finalPrice } = calculatePriceDetails(product.price);

  return (
    <div ref={ref} className="cart-item">
      <div className="cart-item__image">
        <img alt={product.title} src={product.images[0]} />
      </div>
      <div className="cart-item__details">
        <div className="cart-item__title">{product.title}</div>
        <div className="cart-item__brand">by {product.brand}</div>
      </div>
      <div className="cart-item__purchase">
        <div className="cart-item__price">
            <CurrencyFormat
                renderText = {(value) => (
                    <p className="cart-item__currency">{value}</p>       
                )}
                decimalScale={2}
                value={finalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
        </div>
        <div className="cart-item__multiply">
          <CloseIcon />
        </div>
        <div className="cart-item__quantity">
          <AddToCard product={product} />
        </div>
        <div className="cart-item__assign">=</div>
        <div className="cart-item__amount">
            <CurrencyFormat
                renderText = {(value) => (
                    <p className="cart-item__currency bold">{value}</p>       
                )}
                decimalScale={2}
                value={finalPrice * product.quantity}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
        </div>
      </div>
    </div>
  );
})

export default CartItem;
