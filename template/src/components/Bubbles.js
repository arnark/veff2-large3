import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AddToCart } from '../services/common';

import CheckoutOverlay from './CheckoutOverlay';

export default function Bubbles() {
    const [ bubbles, updateBubbles ] = useState([]);
    const [ addedBubble, updateAddedBubble ] = useState([]);
    const [ show, toggleOverlay ] = useState(false);
  
    useEffect(() => {
      getBubbles();
      updateAddedBubble([]);
    }, []);
  
    function getBubbles() {
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(data) {
        updateBubbles(data);
      });
    }

    function getBubble(bubbleId) {
      let newBubble = bubbles.find(b => b.id == bubbleId);
      updateAddedBubble([newBubble]);
    }

    function handleAddToCart(bubbleId) {
      AddToCart(bubbleId);
      getBubble(bubbleId);

      if (show === true) {
        hideOverlay();
      } else {
        showOverlay();
      }
    }

    function showOverlay() {
      toggleOverlay(true);
    };

    function hideOverlay() {
      toggleOverlay(false);
    };

    return (
      <div>
        <CheckoutOverlay show={show} handleClose={() => hideOverlay()} bubble={addedBubble} />
        <div id="products" className="my-2">
          {bubbles.map((data) => {
            return (
              <div className="item-container">
                <Link to={`/bubbles/${data.id}`}>
                  <div className="bubble-card card text-center text-dark mb-1" id={data.id} key={data.id}>
                    <h4 className="card-header">{data.name}</h4>
                    <img className="card-img-top" src={data.image} />
                    <p>{data.price} ISK</p>
                  </div>
                </Link>
                <button className="btn btn-block btn-outline-success addToCart" onClick={() => handleAddToCart(data.id)}>Add to Cart</button>
              </div>
          )})
          }
        </div>
      </div>
    )
}
