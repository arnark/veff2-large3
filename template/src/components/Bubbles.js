import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AddToCart from '../services/common';

import CheckoutOverlay from './CheckoutOverlay';

export default function Bubbles() {
    const [ bubbles, updateBubbles ] = useState([]);
    const [ show, toggleOverlay ] = useState(false);
    const [ addedBubble, updateAddedBubble ] = useState([]);
  
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
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(data) {
        if (addedBubble !== -1) {
          let newBubble = data.find(b => b.id == bubbleId);
          updateAddedBubble([newBubble]);
        }
      });
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
        <div id="products">
          {bubbles.map((data) => {
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
                    <p>{data.price}</p>
                  </div>
                </Link>
                <button className="addToCart" onClick={() => handleAddToCart(data.id)}>Add to Cart</button>
              </div>
          )})
          }
        </div>
      </div>
    )
}
