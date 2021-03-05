import React, { forwardRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CurrencyFormat from 'react-currency-format';

import './OrderItem.scss';

import Rating from '../../components/Rating/Rating';
import { calculatePriceDetails } from '../../utils/product';

const OrderItem = forwardRef(({ product }, ref) => {
  const { finalPrice } = calculatePriceDetails(product.price);

  return (
    <div ref={ref} className="order-item">
      <div className="order-item__image">
        <img alt={product.title} src={product.images[0]} />
      </div>
      <div className="order-item__details">
        <div className="order-item__title">{product.title}</div>
        <div className="order-item__brand">by {product.brand}</div>
        <div className="order-item__rating">
          <Rating rating={product.rating.value} maxRating={5} />
          <div className="order-item__rating-count">
            {product.rating.count} ratings
          </div>
        </div>
      </div>
      <div className="order-item__purchase">
        <div className="order-item__price">
            <CurrencyFormat
                renderText = {(value) => (
                    <p className="order-item__currency">{value}</p>       
                )}
                decimalScale={2}
                value={finalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
        </div>
        <div className="order-item__multiply">
          <CloseIcon />
        </div>
        <div className="order-item__quantity">
          {product.quantity}
        </div>
        <div className="order-item__assign">=</div>
        <div className="order-item__amount">
            <CurrencyFormat
                renderText = {(value) => (
                    <p className="order-item__currency bold">{value}</p>       
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

export default OrderItem;
