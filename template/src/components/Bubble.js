import React, { useState, useEffect } from "react";
import AddToCart from '../services/common';

import CheckoutOverlay from './CheckoutOverlay';

export default function Bubble(props) {
    const { bubbleId } = props.match.params;
    const [ show, toggleOverlay ] = useState(false);
    const [ bubble, updateBubble ] = useState([]);
    //const [ addedBubble, updateAddedBubble ] = useState([]);
  
    useEffect(() => {
      getBubble();
    }, []);
  
    function getBubble() {
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(data) {
        let newBubble = data.find(b => b.id == bubbleId);
        updateBubble([newBubble]);
      });
    }

    function handleAddToCart(bubbleId) {
        AddToCart(bubbleId);
        // getBubble(bubbleId);
  
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

    if (bubble !== undefined) {
        return (
         <div id="products">
           {bubble.map((data) => {
             return (
                <div key={data.id}>
                 <CheckoutOverlay show={show} handleClose={() => hideOverlay()} bubble={bubble} />
                 <div className="item-container">
                   <div className="item-name">
                     <p>{data.name}</p>
                   </div>
                   <div className="item-image">
                     <img src={data.image} />
                   </div>
                   <div className="item-description">
                     <p>{data.description}</p>
                   </div>
                   <div className="item-price">
                     <p>{data.price}</p>  
                   </div>
                   <button className="addToCart" onClick={() => handleAddToCart(data.id)}>Add to Cart</button>
                 </div>
                </div>
            )})
           }
         </div>
        )
    } else {
        return (
            <div>
                <h1>Bubble not found.</h1>
            </div>
          )
    }

}