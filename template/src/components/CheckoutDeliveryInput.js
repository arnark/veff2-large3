import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import CheckoutOrderReview from './CheckoutOrderReview';

const CheckoutDeliveryInput = ({ show, deliveryType }) => {

    console.log(show)
    const [ showInputFields, updateShowInputFields ] = useState(false);
    const [ showOverview, updateShowOverview ] = useState(false);
    
    const showHideClassName = show ? "" : "display-none";

    const [ name, updateName ] = useState('');
    const [ address, updateAddress ] = useState('');
    const [ city, updateCity ] = useState('');
    const [ telephone, updateTelephone ] = useState('');
    const [ postalCode, updatePostalCode ] = useState('');

    return (
      <div>
        <div className={showHideClassName}>
          <h1>Delivery</h1>
          <form>
              <label>
                Name:
                <input type="text" name="name" onChange={(evt) => updateName(evt.target.value)}/>
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" onChange={(evt) => updateAddress(evt.target.value)}/>
              </label>
              <br />
              <label>
                City:
                <input type="text" name="city" onChange={(evt) => updateCity(evt.target.value)}/>
              </label>
              <br />
              <label>
                Telephone:
                <input type="text" name="telephone" onChange={(evt) => updateTelephone(evt.target.value)}/>
              </label>
              <br />
              <label>
                Postal Code:
                <input type="text" name="postalcode" onChange={(evt) => updatePostalCode(evt.target.value)}/>
              </label>
              <br />
              <Link to="#" onClick={() => { updateShowOverview(true); updateShowInputFields(false); }}>Review Order</Link>
          </form>
        </div>
        <CheckoutOrderReview show={showOverview} orderData={deliveryType} />
      </div>
    );
};

export default CheckoutDeliveryInput;