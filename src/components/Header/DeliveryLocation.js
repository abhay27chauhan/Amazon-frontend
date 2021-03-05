import React from 'react';
import MapMarkerIcon from '@material-ui/icons/Room';

import './DeliveryLocation.scss';

function DeliveryLocation() {
  return (
    <div className="delivery-location">
      <MapMarkerIcon
        className="delivery-location__pin"
        fontSize="large"
      />
      <div className="delivery-location__details">
        <div className="delivery-location__hint">Hello</div>
        <div className="delivery-location__title">Select your address</div>
      </div>
    </div>
  );
}

export default DeliveryLocation;
