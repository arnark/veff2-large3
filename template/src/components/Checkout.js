import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { GetCartItems, CheckoutComplete } from '../services/common';

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
        if (postalCode === '' || parseInt(postalCode) < 100 || parseInt(postalCode) > 999) {
          errors.postalCode = 'Postal code is required.';
        }
    }

    if (name === '') {
      errors.name = 'Name is required.';
    }
    if (telephone === '' || isNaN(telephone) || telephone.length < 7) {
      errors.telephone = 'Telephone is required.';
    }

    updateErrors(errors);
    if (Object.keys(errors).length > 0) { return false; }
    return true;
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!validateForm()) { return; }

    customerData.cartItems = GetCartItems();
    
    fetch('http://localhost:3500/api/orders/' + customerData.telephone, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
    .then((response) => { 
      if (response.ok) {
        CheckoutComplete(customerData);
      }
    });
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
        <div className="checkout-input card text-dark mb-1 my-2">
          <h2 className="card-header">Checkout page</h2>
          <div className="padding">
            <p>Choose delivery type</p>
            <Link to="#" onClick={() => { updateCurrentStep(steps.DELIVERY_INPUT); updateDeliveryType(deliveryTypes.DELIVERY); }}>Delivery</Link>
            <br />
            <Link to="#" onClick={() => { updateCurrentStep(steps.PICKUP_INPUT); updateDeliveryType(deliveryTypes.PICKUP); }}>Store pick-up</Link>
          </div>
        </div>
        <CheckoutCartOverview />
      </div>
    )
  } else if (currentStep === steps.DELIVERY_INPUT) {
    return (
      <div id="checkout-container">
        <div className="checkout-input card text-dark mb-1 my-2">
          <h2 className="card-header">Delivery</h2>
          <Form className="padding">
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput 
                autoFocus
                name="name" 
                value={customerData.name} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('name') } 
                placeholder="Enter name" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="address">Address</label>
              <FormInput 
                name="address" 
                value={customerData.address} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('address') } 
                placeholder="Enter address" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="city">City</label>
              <FormInput 
                name="city" 
                value={customerData.city} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('city') } 
                placeholder="Enter city" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="telephone">Telephone</label>
              <FormInput 
                name="telephone" 
                value={customerData.telephone} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('telephone') } 
                placeholder="Enter telephone" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="postalCode">Postal code</label>
              <FormInput 
                name="postalCode"
                value={customerData.postalCode} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('postalCode') } 
                placeholder="Enter postal code" />
            </FormGroup>
            <Button theme="success" className="float-right" onClick={() => { if (validateForm()) { updateCurrentStep(steps.ORDER_OVERVIEW); }}}>Continue</Button>
            <Button theme="light" className="float-left" onClick={() => { updateCurrentStep(steps.DELIVERY_OPTIONS); }}>Go back</Button>
          </Form>
        </div>
        <CheckoutCartOverview />
      </div>
    );
  } else if (currentStep === steps.PICKUP_INPUT) {
    return (
      <div id="checkout-container">
        <div className="checkout-input card text-dark mb-1 my-2">
          <h2 className="card-header">Store pick-up</h2>
          <Form className="padding">
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput 
                autoFocus
                name="name" 
                value={customerData.name} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('name') } 
                placeholder="Enter name" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="telephone">Telephone</label>
              <FormInput 
                name="telephone" 
                value={customerData.telephone} 
                onChange={(evt) => genericInputHandler(evt)} 
                invalid={ errors.hasOwnProperty('telephone') } 
                placeholder="Enter telephone" />
            </FormGroup>
            <Button theme="success" className="float-right" onClick={() => { if (validateForm()) { updateCurrentStep(steps.ORDER_OVERVIEW); }}}>Continue</Button>
            <Button theme="light" className="float-left" onClick={() => { updateCurrentStep(steps.DELIVERY_OPTIONS); }}>Go back</Button>
          </Form>
        </div>
        <CheckoutCartOverview />
      </div>
    );
  } else if (currentStep === steps.ORDER_OVERVIEW) {
      if (deliveryType === deliveryTypes.DELIVERY) {
        return (
          <div id="checkout-container">
            <div className="checkout-input card text-dark mb-1 my-2">
              <h2 className="card-header">Customer details</h2>
              <div className="padding">
                <p>Name: {customerData.name}</p>
                <p>Address: {customerData.address}</p>
                <p>City: {customerData.city}</p>
                <p>Telephone: {customerData.telephone}</p>
                <p>Postal code: {customerData.postalCode}</p>
                <Button theme="success" className="float-right" onClick={ e => submitForm(e) }>Complete order</Button>
                <Button theme="light" className="float-left" onClick={() => { updateCurrentStep(steps.DELIVERY_INPUT); }}>Go back</Button>
              </div>
            </div>
            <CheckoutCartOverview />
          </div>
        );
      } else if (deliveryType === deliveryTypes.PICKUP) {
        return (
          <div id="checkout-container">
            <div className="checkout-input card text-dark mb-1 my-2">
              <h2 className="card-header">Customer details</h2>
              <div className="padding">
                <p>Name: {customerData.name}</p>
                <p>Telephone: {customerData.telephone}</p>
                <Button theme="success" className="float-right" onClick={ e => submitForm(e) }>Complete order</Button>
                <Button theme="light" className="float-left" onClick={() => { updateCurrentStep(steps.PICKUP_INPUT); }}>Go back</Button>
              </div>
            </div>
            <CheckoutCartOverview />
          </div>
        );
      }
  }
}