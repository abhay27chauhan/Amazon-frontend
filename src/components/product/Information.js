import React from 'react';
import CurrencyFormat from 'react-currency-format';

import './Information.scss';
import Rating from '../Rating/Rating';
import { calculatePriceDetails } from '../../utils/product';
import AddToCart from '../../utils/AddToCart'

function Information({ product }) {
    const { finalPrice, basePrice } = calculatePriceDetails(
        product.price,
    );
    return (
        <>
            {product && (
                <div className="information">
                    <div className="information__header">{product.title}</div>
                    <div className="information__category">Brand: {product.category}</div>
                    {product.rating && (
                        <div className="information__rating">
                            <Rating maxRating={5} rating={product.rating.value} />
                            <div className="information__rating-label">{product.rating.count} ratings</div>
                        </div>
                    )}

                    {product.price && (
                        <div className="information__pricing">
                            <div className="information__price">
                                <span className="information__label">M.R.P. : </span>
                                <CurrencyFormat
                                    renderText = {(value) => (
                                        <p className="product-card__amount strikethrough">{value}</p>       
                                    )}
                                    decimalScale={2}
                                    value={basePrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                            </div>
                            <div className="information__price">
                                <span className="information__label">Price. : </span>
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
                            </div>
                            <div>
                                <span className="information__label">You Save : </span>
                                {product.price.discount}
                            </div>
                        </div>
                    )}

                    <AddToCart product={product} />


                    <div className="information__specs">
                        {product.specs &&
                            product.specs.map((spec, i) => (
                                <div className="information__spec" key={i}>
                                    <span> {spec.name}</span> : <span>{spec.value}</span>
                                </div>
                            ))}
                    </div>

                    <div className="information__features">
                        <div className="information__spec-header">About this item</div>
                        <ul>
                            {product.features &&
                                product.features.map((feature, i) => (
                                    <li className="information__feature" key={i}>
                                        {feature}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Information;
