import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import CheckoutOrderReview from './CheckoutOrderReview';

const CheckoutDeliveryInput = ({ show, deliveryType, showDeliveryOptions }) => {
    const [ showOverview, updateShowOverview ] = useState(false);
    let showHideClassName = show ? "" : "display-none";

    const [ customerData, updateCustomerData ] = useState({
        name: '',
        address: '',
        city: '',
        telephone: '',
        postalCode: ''
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
          <h1>Delivery</h1>
          <form>
              <label>
                Name:
                <input type="text" name="name" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <label>
                City:
                <input type="text" name="city" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <label>
                Telephone:
                <input type="text" name="telephone" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <label>
                Postal Code:
                <input type="text" name="postalcode" onChange={(evt) => genericInputHandler(evt)}/>
              </label>
              <br />
              <Link to="#" onClick={() => { updateShowOverview(true); }}>Review Order</Link>
          </form>
        </div>
        <CheckoutOrderReview show={showOverview} orderData={deliveryType} />
      </div>
    );
};

export default CheckoutDeliveryInput;