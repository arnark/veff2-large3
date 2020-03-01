import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AddToCart from '../services/common.js'

export default function Bubbles() {
    const [ bubbles, updateBubbles ] = useState([]);
  
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

    return (
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
              <button className="addToCart" onClick={() => AddToCart(data.id)}>Add to Cart</button>
            </div>
        )})
        }
      </div>
    )
}