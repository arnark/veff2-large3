import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import CheckoutOrderReview from './CheckoutOrderReview';

const CheckoutPickupInput = ({ show, deliveryType, showDeliveryOptions }) => {
    let showHideClassName = show ? "" : "display-none";
    const [ showOverview, updateShowOverview ] = useState(false);
    const [ name, updateName ] = useState('');
    const [ telephone, updateTelephone ] = useState('');
    useEffect(() => {
        if (showDeliveryOptions === true) {
            showHideClassName = "";
        } else {
            showHideClassName = "display-none";
        }
    }, []);

    return (
      <div>
        <div className={showHideClassName}>
          <h1>Store pick-up</h1>
          <form>
          <label>
                Name:
                <input type="text" name="name" onChange={(evt) => updateName(evt.target.value)}/>
              </label>
              <br />
              <label>
                Telephone:
                <input type="text" name="telephone" onChange={(evt) => updateTelephone(evt.target.value)}/>
              </label>
              <br />
              <Link to="#">Review Order</Link>
          </form>
        </div>
        <CheckoutOrderReview show={showOverview} orderData={deliveryType} />
      </div>
    );
};

export default CheckoutPickupInput;