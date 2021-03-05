import React from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

import CurrencyFormat from 'react-currency-format';
import Rating from '../../components/Rating/Rating';
import AddToCard from '../../utils/AddToCart';
import { calculatePriceDetails } from '../../utils/product';

function ProductCard({ product }) {
  const { finalPrice, basePrice, isDiscounted } = calculatePriceDetails(
    product.price,
  );

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <div className="product-card__title">{product.title}</div>
        <div className="product-card__price">
            <CurrencyFormat
                renderText = {(value) => (
                    <p className="product-card__amount">{value}</p>       
                )}
                decimalScale={2}
                value={finalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
          {isDiscounted && (
                <CurrencyFormat
                    renderText = {(value) => (
                        <p className="product-card__amount product-card__amount--discount" >{value}</p>       
                    )}
                    decimalScale={2}
                    value={basePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                />
          )}
        </div>

        <div className="product-card__rating">
          <Rating rating={product.rating.value} maxRating={5} />
          <div className="product-card__rating-count">
            {product.rating.count} ratings
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="product-card__gallery">
          <img
            className="product-card__image"
            alt={product.title}
            src={product.images[0]}
          />
        </Link>

        <div className="product-card__actions">
         <AddToCard product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;