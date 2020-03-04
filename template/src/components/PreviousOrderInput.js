import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { AddBundleToCart } from '../services/common';

export default function PreviousOrderInput() {
    const [ bubbles, updateBubbles ] = useState([]);
    const [ phoneNumber, updatePhoneNumber ] = useState('');
    const [ error, updateError ] = useState('');
    const [ previousOrders, updatePreviousOrders ] = useState([]);

    useEffect(() => {
        getBubbles();
      }, []);

    function getBubbles() {
        fetch('http://localhost:3500/api/bubbles')
        .then(response => response.json())
        .then(function(data) {
          updateBubbles(data);
        });
      }

    function handlePrevOrderSearch(phoneNumber) {
        fetch('http://localhost:3500/api/orders/' + phoneNumber)
        .then((response) => {
            if (response.ok) {
                updateError('');
                return response.json();
            } else {
                updatePreviousOrders([]);
                updateError('Not found.');
            }
        })
        .then((data) => {
            let prevOrders = convertPrevOrderSearchToBundle(data);
            updatePreviousOrders(prevOrders);
            return data;
          });
    }

    function convertPrevOrderSearchToBundle(response) {
        let bundles = [];
        for (let i = 0; i < response.length; i++) {
            let currBubbles = [];
            for (let n = 0; n < response[i].cartItems.length; n++) {
                let bubble = bubbles.find(b => b.id == response[i].cartItems[n][0]);
                let quantity = response[i].cartItems[n][1];
                bubble.quantity = quantity;
                currBubbles.push(bubble);
            }
            bundles.push({id: i, items: currBubbles});
        }
        return bundles;
    }

    function handleAddBundleToCart(bubbles, bundleName) {
        AddBundleToCart(bubbles);
      }

    return (
      <div className="cart-prev-order">
        <h1 className="cart-prev-order-title">Previous orders</h1>
          <Form onSubmit={e => { e.preventDefault(); }} >
            <FormGroup>
              <label htmlFor="name">Telephone</label>
              <FormInput 
                name="telephone"
                onChange={(e) => updatePhoneNumber(e.target.value)}
                placeholder="Enter telephone" />
            </FormGroup>
            <Button className="btn btn-light px-5" onClick={() => handlePrevOrderSearch(phoneNumber)}>Search</Button>
            <p>{error}</p>
            {previousOrders.map((data) => {
              return (
                <div className="bundle text-center my-3" key={data.id}>
                  <div className="card-deck justify-content-center">
                    {data.items.map((bubble) => {
                    return (
                      <Link to={`/bubbles/${bubble.id}`} key={bubble.id}>
                        <div className="bubble-card card bundle-card text-center text-dark" id={bubble.id} >
                          <h4 className="card-header">{bubble.name}</h4>
                          <img className="img-fluid" src={bubble.image} />
                          <p>Quantity: {bubble.quantity}</p>
                          <p>{bubble.price} ISK</p>
                        </div>
                      </Link>
                      )})
                    }
                  </div>
                  <div className="w-100 d-flex">
                    <button className="btn btn-lg btn-outline-success bundle-button addToCart" onClick={() => handleAddBundleToCart(data.items, data.name)}>Add to Cart</button>
                  </div>
                </div>
              )
            })}
          </Form>
      </div>
    )
  }