import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import CheckoutDeliveryInput from './CheckoutDeliveryInput';
import CheckoutPickupInput from './CheckoutPickupInput';

export default function Checkout() {
  const [ showDelivery, updateDelivery ] = useState(false);
  const [ showPickup, updatePickup ] = useState(false);
  const [ showDeliveryOptions, updateCheckoutState ] = useState(true);
  
  const showHideClassName = showDeliveryOptions ? "" : "display-none";

    return (
      <div>
        <div className={showHideClassName}>
            <h1>Checkout Page</h1>
            <p>Choose delivery type:</p>
            <Link to="#" onClick={() => { updateDelivery(true); updateCheckoutState(false); }}>Delivery</Link>
            <br />
            <Link to="#" onClick={() => { updatePickup(true); updateCheckoutState(false); }}>Store pick-up</Link>
        </div>
        <CheckoutDeliveryInput show={showDelivery} deliveryType={'delivery'} />
        <CheckoutPickupInput show={showPickup} deliveryType={'pick-up'} />
      </div>
    )
  }