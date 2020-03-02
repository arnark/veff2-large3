import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { GetCartItems, ClearCart } from '../services/common';

export default function Cart() {
  const [ cartItems, updateCartItems ] = useState([]);

  useEffect(() => {
    getItemObjects();
  }, []);

  function getItemObjects() {
    let cartItemIds = GetCartItems();
    console.log(cartItemIds)

    let cartItemObjects = [];
    fetch('http://localhost:3500/api/bubbles')
    .then(response => response.json())
    .then(function(bubbles) {
        console.log(cartItemIds.length);
        for (let i = 0; i < cartItemIds.length; i++) {
          cartItemObjects.push(bubbles.find(b => b.id == cartItemIds[i][0]));
          cartItemObjects[i].quantity = cartItemIds[i][1];
        }
        console.log(cartItemObjects);
        updateCartItems(cartItemObjects);
      });
  }

    if (cartItems.length > 0) {
      return (
        <div>
            <h1>Shopping Cart</h1>
            <div id="products">
            {cartItems.map((data) => {
              return (
                <div className="item-container" id={data.id} key={data.id}>
                  <Link to={`/bubbles/${data.id}`}>
                    <div className="item-name">
                      <p>{data.name}</p>
                    </div>
                    <div className="item-image">
                      <img src={data.image} />
                    </div>
                    <div className="item-price">
                      <p>Price: {data.price}</p>
                    </div>
                    <div className="item-quantity">
                      <p>Quantity: {data.quantity}</p>
                    </div>
                  </Link>
                </div>
            )})
            }
          </div>
          <button onClick={() => { ClearCart(); getItemObjects();}}>Clear Shopping Cart</button>
        </div>
      )
    } else {
      return (
        <div>
            <h1>Shopping Cart</h1>
            <p>No products in shopping cart!!!!! Get shopping.</p>
        </div>
      )
    }
}