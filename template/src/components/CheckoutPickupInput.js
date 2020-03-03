import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import CheckoutOrderReview from './CheckoutOrderReview';

const CheckoutPickupInput = ({ show, deliveryType, showDeliveryOptions }) => {
    let showHideClassName = show ? "" : "display-none";
    const [ showOverview, updateShowOverview ] = useState(false);
    const [ customerData, updateCustomerData ] = useState({
        name: '',
        telephone: ''
    });

    function genericInputHandler(e) {
        updateCustomerData({
            ...customerData,
            [ e.target.name ]: e.target.value
        });
      }

    return (
      <div>
        <div className={showHideClassName}>
          <h1>Store pick-up</h1>
          <form>
          <label>
                Name:
                <input type="text" name="name" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <label>
                Telephone:
                <input type="text" name="telephone" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <Link to="#" onClick={() => { updateShowOverview(true); }}>Review Order</Link>
          </form>
        </div>
        <CheckoutOrderReview show={showOverview} orderData={deliveryType} />
      </div>
    );
};

export default CheckoutPickupInput;