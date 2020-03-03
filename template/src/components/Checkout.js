import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Checkout() {

  const steps = {
    DELIVERY_OPTIONS: 'delivery-options',
    DELIVERY_INPUT: 'delivery-input',
    PICKUP_INPUT: 'pickup-input',
    ORDER_OVERVIEW: 'overview'
  }

  const [ currentStep, updateCurrentStep ] = useState(steps.DELIVERY_OPTIONS);
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

  if (currentStep === steps.DELIVERY_OPTIONS) {
    return (
      <div>
        <div>
            <h1>Checkout Page</h1>
            <p>Choose delivery type:</p>
            <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_INPUT); }}>Delivery</Link>
            <br />
            <Link to="#" onClick={() => { updateCurrentStep(steps.PICKUP_INPUT); }}>Store pick-up</Link>
        </div>
      </div>
    )
  } else if (currentStep === steps.DELIVERY_INPUT) {
    return (
      <div>
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
          <Link to="#" onClick={() => {  updateCurrentStep(steps.ORDER_OVERVIEW); }}>Review Order</Link>
        </form>
    </div>
    );
  } else if (currentStep === steps.PICKUP_INPUT) {
    return (
      <div>
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
          <Link to="#" onClick={() => { updateCurrentStep(steps.ORDER_OVERVIEW); }}>Review Order</Link>
        </form>
      </div>
    );
  } else if (currentStep === steps.ORDER_OVERVIEW) {
    return (
      <div>
          <p>overview</p>
      </div>
    );
  }

  }