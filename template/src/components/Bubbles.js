import React, { useState, useEffect } from "react";

export default function Bubbles() {
    const [ bubbles, updateBubbles ] = useState([]);
  
    useEffect(() => {
      getBubbles();
    }, []);
  
    function getBubbles() {
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(data) {
        let result = JSON.parse(JSON.stringify(data));
        updateBubbles(result);
      });
    }
  
    return (
      <div>
        <table>
          <tbody>
            {bubbles.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.image}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }