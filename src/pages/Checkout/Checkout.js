import React from 'react';
import FlipMove from 'react-flip-move';

import './Checkout.scss';

import CartItem from './CartItem';
import { useStateValue } from '../../Hooks/stateProvider';
import Subtotal from '../../components/Subtotal/Subtotal';

function CartPage() {
  const [{ basket }, ] = useStateValue();
  const productIds = Object.keys(basket).filter((id) => basket[id]);
  
  return (
    <div className="cart">
      <div className="cart__main">
        <div className="cart__items">
          <FlipMove>
            {productIds.map((id) => (
              <CartItem key={id} product={basket[id]} />
            ))}
          </FlipMove>
        </div>

        <div className="cart__summary">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
