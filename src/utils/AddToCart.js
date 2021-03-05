import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import './AddToCart.scss';

import { ACTIONS } from '../Hooks/reducer';
import { useStateValue } from '../Hooks/stateProvider';

function AddToCard({ product }) {
  const [{ basket } , dispatch] = useStateValue();

  const cartEntry = basket[product.id];

  if (cartEntry) {
    return (
      <div className="add-to-cart">
        <button
          className="add-to-cart__action add-to-cart__action--minus"
          onClick={() => dispatch({ type: ACTIONS.REMOVE_FROM_BASKET, payload: product })}
        >
          <RemoveIcon className="add-to-cart__icon" />
        </button>
        <div className="add-to-cart__quantity">{cartEntry.quantity}</div>
        <button
          className="add-to-cart__action add-to-cart__action--plus"
          onClick={() => dispatch({ type: ACTIONS.ADD_TO_BASKET, payload: product })}
        >
          <AddIcon className="add-to-cart__icon"/>
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="add-to-cart-button"
        onClick={() => dispatch({ type: ACTIONS.ADD_TO_BASKET, payload: product })}
      >
        Add to cart
      </button>
    );
  }
}

export default AddToCard;
