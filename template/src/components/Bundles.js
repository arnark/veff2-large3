import React, { useState, useEffect } from "react";

export default function Bundles() {
    const [ bundles, updateBundles ] = useState([]);
  
    useEffect(() => {
      getBundles();
    }, []);
  
    function getBundles() {
      fetch('http://localhost:3500/api/bundles')
      .then(response => response.json())
      .then(function(data) {
        updateBundles(data);
      });
    }
  
    return (
      <div>
        <table>
          <tbody>
            {bundles.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.items}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }