import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { GetCartItems, ClearCart } from '../services/common';

import PreviousOrderInput from './PreviousOrderInput';

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
        <div className="my-3">
          <h2>Shopping Cart</h2>
          <div id="products">
            <table className="table mt-2">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((data) => {
                  return (
                    <tr className="item-container" id={data.id} key={data.id}>
                      <td>
                        <Link to={`/bubbles/${data.id}`}>
                          <div className="d-flex cart-item">
                            <img src={data.image} />
                            <p>{data.name}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="align-middle text-right">
                        <p>{data.quantity}</p>
                      </td>
                      <td className="align-middle text-right">
                        <p>{data.price} ISK</p>
                      </td>
                    </tr>
                  )})
                }
              </tbody>
              <thead>
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th className="text-right">{totalISK} ISK</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-danger" onClick={() => { ClearCart(); getItemObjects();}}>Clear Shopping Cart</button>
            <Link className="btn btn-success px-5" to={'/checkout'}>Checkout</Link>
          </div>
          <PreviousOrderInput />
        </div>
      )
    } else {
      return (
        <div className="my-3">
          <h2>Shopping Cart</h2>
          <h6>No products in shopping cart.</h6>
          <PreviousOrderInput />
        </div>
      )
    }
}