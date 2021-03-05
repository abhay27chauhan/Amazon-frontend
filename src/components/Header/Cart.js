import React from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

import './Cart.scss';
import { useStateValue } from '../../Hooks/stateProvider';


function Cart() {
  const [{ totalQuantity }, ] = useStateValue();

  return (
    <Link to="/checkout" className="h-cart">
      <ShoppingBasketIcon fontSize="large" />
      <span className="h-cart__count">{totalQuantity}</span>
    </Link>
  );
}

export default Cart;
