import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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
          <Link to={`/bubbles/${data.id}`} className="item-container" key={data.id}>
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
        )})
        }
      </div>
    )
}