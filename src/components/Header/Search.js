import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import './Search.scss';

const categories = [
  'All Categories',
  'Deals',
  'Alexa Skills',
  'Amazon Devices',
  'Amazon Fashion',
  'Amazon Pantry',
  'Appliances',
  'Apps & Games',
  'Baby',
  'Beauty',
  'Big Bazaar',
  'Books',
  'Car & Motorbike',
  'Clothing & Accessories',
  'Collectibles',
  'Computers & Accessories',
  'Electronics',
  'Furniture',
  'Garden & Outdoors',
  'Gift Cards',
  'Grocery & Gourmet Foods',
  'Health & Personal Care',
  'Home & Kitchen',
  'Industrial & Scientific',
  'Jewellery',
  'Kindle Store',
  'Luggage & Bags',
  'Luxury Beauty',
  'Movies & TV Shows',
  'Music',
  'Musical Instruments',
  'Office Products',
  'Pet Supplies',
  'Prime Video',
  'Shoes & Handbags',
  'Software',
  'Sports, Fitness & Outdoors',
  'Tools & Home Improvement',
  'Toys & Games',
  'Under ₹500',
  'Video Games',
  'Watches',
];

function Search() {
  const [category, setCategory] = useState(0);

  return (
    <div className="search">
      <select
        className="search__select"
        value={category}
        onChange={(e) => setCategory(parseInt(e.target.value, 10))}
      >
        {categories.map((o, i) => (
          <option key={i} value={i}>
            {o}
          </option>
        ))}
      </select>
      <input className="search__input" type="text" />
      <button className="search__button">
        <SearchIcon />
      </button>
    </div>
  );
}

export default Search;