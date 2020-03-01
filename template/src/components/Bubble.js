import React, { useState, useEffect } from "react";

export default function Bubble(props) {
    const { bubbleId } = props.match.params;
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

    if (bubble !== undefined) {
        return (
            <div id="products">
              {bubble.map((data) => {
                return (
              <div className="item-container" key={data.id}>
      
                <div className="item-name">
                  <p>{data.name}</p>
                </div>
      
                <div className="item-image">
                  <img src={data.image} />
                </div>
      
                <div className="item-price">
                  <p>{data.price}</p>  
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
                <p>Please try again.</p>
            </div>
          )
    }

}