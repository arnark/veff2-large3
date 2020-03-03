import React, { useState } from "react";
import { Link } from 'react-router-dom';

import CheckoutCartOverview from './CheckoutCartOverview';

export default function Checkout() {

  const steps = {
    DELIVERY_OPTIONS: 'delivery-options',
    DELIVERY_INPUT: 'delivery-input',
    PICKUP_INPUT: 'pickup-input',
    ORDER_OVERVIEW: 'overview'
  }

  const deliveryTypes = {
    DELIVERY: 'delivery',
    PICKUP: 'pick-up'
  }

  const [ currentStep, updateCurrentStep ] = useState(steps.DELIVERY_OPTIONS);
  const [ deliveryType, updateDeliveryType ] = useState(deliveryTypes.DELIVERY);
  const [ errors, updateErrors ] = useState({});
  const [ customerData, updateCustomerData ] = useState({
      name: '',
      address: '',
      city: '',
      telephone: '',
      postalCode: ''
  });

  function validateForm() {
    const { name, address, city, telephone, postalCode } = customerData;
    const errors = {};

    if (deliveryType === deliveryTypes.DELIVERY) {
        if (address === '') {
          errors.address = 'Address is required.';
        }
        if (city === '') {
          errors.city = 'City is required.';
        }
        if (postalCode === '') {
          errors.postalCode = 'Postal code is required.';
        }
    }

    if (name === '') {
      errors.name = 'Name is required.';
    }
    if (telephone === '') {
      errors.telephone = 'Telephone is required.';
    }

    updateErrors(errors);
    if (Object.keys(errors).length > 0) { return false; }
    return true;
  }

  function submitForm(e) {
    e.preventDefault();
    if (!validateForm()) { alert("Incorrect data"); return; }
    alert('Form was submitted correctly');
  }

  function genericInputHandler(e) {
      updateCustomerData({
          ...customerData,
          [ e.target.name ]: e.target.value
      });
  }

  if (currentStep === steps.DELIVERY_OPTIONS) {
    return (
      <div id="checkout-container">
        <div className="checkout-input">
            <h1>Checkout Page</h1>
            <p>Choose delivery type:</p>
            <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_INPUT); updateDeliveryType(deliveryTypes.DELIVERY); }}>Delivery</Link>
            <br />
            <Link to="#" onClick={() => { updateCurrentStep(steps.PICKUP_INPUT); updateDeliveryType(deliveryTypes.PICKUP); }}>Store pick-up</Link>
        </div>
        <CheckoutCartOverview />
      </div>
    )
  } else if (currentStep === steps.DELIVERY_INPUT) {
    return (
      <div id="checkout-container">
        <div className="checkout-input">
          <h1>Delivery</h1>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={customerData.name} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <label>
              Address:
              <input type="text" name="address" value={customerData.address} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <label>
              City:
              <input type="text" name="city" value={customerData.city} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <label>
              Telephone:
              <input type="text" name="telephone" value={customerData.telephone} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <label>
              Postal Code:
              <input type="text" name="postalCode" value={customerData.postalCode} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <Link to="#" onClick={() => { updateCurrentStep(steps.ORDER_OVERVIEW); }}>Review Order</Link>
          </form>
          <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_OPTIONS); }}>GO BACK</Link>
        </div>
        <CheckoutCartOverview />
      </div>
    );
  } else if (currentStep === steps.PICKUP_INPUT) {
    return (
      <div id="checkout-container">
        <div className="checkout-input">
          <h1>Store pick-up</h1>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={customerData.name} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <label>
              Telephone:
              <input type="text" name="telephone" value={customerData.telephone} onChange={(evt) => genericInputHandler(evt)}/>
            </label>
            <br />
            <Link to="#" onClick={() => { updateCurrentStep(steps.ORDER_OVERVIEW); }}>Review Order</Link>
          </form>
          <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_OPTIONS); }}>GO BACK</Link>
        </div>
        <CheckoutCartOverview />
      </div>
    );
  } else if (currentStep === steps.ORDER_OVERVIEW) {
      if (deliveryType === deliveryTypes.DELIVERY) {
        return (
          <div id="checkout-container">
            <div className="checkout-input">
              <form onSubmit={ e => submitForm(e) }>
                <p>{customerData.name}</p>
                <p>{customerData.address}</p>
                <p>{customerData.city}</p>
                <p>{customerData.telephone}</p>
                <p>{customerData.postalCode}</p>
                <button>Order</button>
              </form>
              <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_INPUT); }}>GO BACK</Link>
            </div>
            <CheckoutCartOverview />
          </div>
        );
      } else if (deliveryType === deliveryTypes.PICKUP) {
        return (
          <div id="checkout-container">
            <div className="checkout-input">
              <form onSubmit={ e => submitForm(e) }>
                <p>{customerData.name}</p>
                <p>{customerData.telephone}</p>
                <button>Order</button>
              </form>
              <Link to="#" onClick={() => { updateCurrentStep(steps.PICKUP_INPUT); }}>GO BACK</Link>
            </div>
            <CheckoutCartOverview />
          </div>
        );
      }
  }
}