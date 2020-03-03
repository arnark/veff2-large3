import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { GetCartItems, ClearCart } from '../services/common';

export default function Cart() {
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
                      <p>Price: {data.price} ISK</p>
                    </div>
                    <div className="item-quantity">
                      <p>Quantity: {data.quantity}</p>
                    </div>
                  </Link>
                </div>
            )})
            }
          </div>
          <h1>Total: {totalISK} ISK</h1>
          <button onClick={() => { ClearCart(); getItemObjects();}}>Clear Shopping Cart</button>
          <Link to={'/checkout'}>CHECKOUT</Link>
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