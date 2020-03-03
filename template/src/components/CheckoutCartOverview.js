import React, { useState, useEffect } from "react";
import { GetCartItems } from '../services/common';

export default function CheckoutCartOverview() {
    const [ cartItems, updateCartItems ] = useState([]);
    const [ totalISK, updateTotalISK ] = useState(0);

    useEffect(() => {
      getItemObjects();
    }, []);

    function getItemObjects() {
      let cartItemIds = GetCartItems();

      let cartItemObjects = [];
      let total = 0;
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(bubbles) {
          for (let i = 0; i < cartItemIds.length; i++) {
            cartItemObjects.push(bubbles.find(b => b.id == cartItemIds[i][0]));
            cartItemObjects[i].quantity = cartItemIds[i][1];
            total += (parseInt(cartItemObjects[i].quantity) * parseInt(cartItemObjects[i].price))
          }
          updateCartItems(cartItemObjects);
          updateTotalISK(total);
        });
    }
    
    if (cartItems.length > 0) {
      return (
        <div className="card text-center text-dark mb-1 checkout-cart-preview my-2">
            <h2 className="card-header">Shopping Cart</h2>
            {cartItems.map((data) => {
              return (
                <div className="checkout-cart-item" id={data.id} key={data.id}>
                    <img className="checkout-cart-item-image" src={data.image} />
                    <div className="checkout-cart-item-details">
                        <div className="item-name">
                          <p>{data.name}</p>
                        </div>
                        <div className="item-price">
                          <p>Price: {data.price} ISK</p>
                        </div>
                        <div className="item-quantity">
                          <p>Quantity: {data.quantity}</p>
                        </div>
                    </div>
                </div>
            )})
            }
          <h1>Total: {totalISK} ISK</h1>
        </div>
      )
    } else {
      return (
        <div className="card text-center text-dark mb-1 checkout-cart-preview my-2">
            <h2 className="card-header">Shopping Cart</h2>
            <p>No products in shopping cart.</p>
        </div>
      )
    }
}