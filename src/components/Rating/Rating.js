import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

import './Rating.scss';

function Rating({ rating, maxRating, size = 16 }) {
  return (
    <div className="rating">
      {new Array(maxRating).fill(0).map((_, index) => {
        const isActive = rating >= index + 1;
        return (
            isActive ?
            (<StarIcon
                key={index}
                className="rating__star rating__star--active"
                style={{fontSize: size}}

              />) : 
            (<StarBorderOutlinedIcon
                key={index}
                className="rating__star"
                style={{fontSize: size}}
              />) 
        );
      })}
    </div>
  );
}

export default Rating;
