import React from 'react';

import { Link } from 'react-router-dom';

import './Logo.scss';

function Logo({ country = 'in' }) {
  return (
    <Link to="/" className="logo">
      <img className="logo__img" alt="Amazon" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
      {country && <span className="logo__country">.{country}</span>}
    </Link>
  );
}

export default Logo;
