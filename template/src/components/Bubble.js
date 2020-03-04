import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { AddToCart } from '../services/common';

import CheckoutOverlay from './CheckoutOverlay';

export default function Bubble(props) {
    const { bubbleId } = props.match.params;
    const [ show, toggleOverlay ] = useState(false);
    const [ bubble, updateBubble ] = useState([]);
  
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
        <div id="products" className="my-2">
          {bubble.map((data) => {
            return (
              <div className="w-100" key={data.id}>
                <CheckoutOverlay show={show} handleClose={() => hideOverlay()} bubble={bubble} />
                <div className="bubble-card-big card">
                  <div className="row no-gutters">
                    <div className="col-5">
                      <img className="card-img" src={data.image} />
                    </div>
                    <div className="col-7">
                      <div className="card-body h-100 d-flex flex-column">
                        <h3 className="card-title py-2">{data.name}</h3>
                        <p className="mb-auto">{data.description}</p>
                        <p>{data.price} ISK</p>  
                        <button className="btn btn-block btn-outline-success addToCart" onClick={() => handleAddToCart(data.id)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
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

/* 
  props.mathc.params.bubbleId: required string representing a bubble id
*/
Bubble.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      bubbleId: PropTypes.string.isRequired
    })
  })
}
