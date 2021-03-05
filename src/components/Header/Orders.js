import React from 'react';
import { Link } from 'react-router-dom';

import './Orders.scss';

function Orders() {
  return (
    <Link to="/orders" className="h-orders">
      <div className="h-orders__hint">Returns</div>
      <div className="h-orders__title">& Orders</div>
    </Link>
  );
}

export default Orders;
