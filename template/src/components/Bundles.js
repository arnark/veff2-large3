import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AddBundleToCart } from '../services/common';

import BundleCheckoutOverlay from './BundleCheckoutOverlay';

export default function Bundles() {
    const [ bundles, updateBundles ] = useState([]);
    const [ show, toggleOverlay ] = useState(false);
    const [ addedBundle, updateAddedBundle ] = useState([]);
  
    useEffect(() => {
      getBundles();
      updateAddedBundle();
    }, []);
  
    function getBundles() {
      fetch('http://localhost:3500/api/bubbles')
      .then(response => response.json())
      .then(function(bubbles) {
        fetch('http://localhost:3500/api/bundles')
        .then(response => response.json())
        .then(function(bundles) {
          for (let i = 0; i < bundles.length; i++) {
            for (let y = 0; y < bundles[i].items.length; y++) {
              bundles[i].items[y] = bubbles.find(b => b.id == bundles[i].items[y]);
            }
          }
          updateBundles(bundles);
        });
      });
    }

    function handleAddBundleToCart(bubbles, bundleName) {
      AddBundleToCart(bubbles);
      updateAddedBundle(bundleName);

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
        <BundleCheckoutOverlay show={show} handleClose={() => hideOverlay()} bundleName={addedBundle} />
        <h1>Bundles</h1>
        {bundles.map((data) => {
          return (
            <div key={data.id}>
              <h2>{data.name}</h2>
              {data.items.map((bubble) => {
            return (
              <div className="item-container" id={bubble.id} key={bubble.id}>
                <Link to={`/bubbles/${bubble.id}`}>
                  <div className="item-name">
                    <p>{bubble.name}</p>
                  </div>
                  <div className="item-image">
                    <img src={bubble.image} />
                  </div>
                  <div className="item-price">
                    <p>{bubble.price}</p>
                  </div>
                </Link>
              </div>
              )})
            }
          <button className="addToCart" onClick={() => handleAddBundleToCart(data.items, data.name)}>Add Bundle to Cart</button>
          <br /><br /><br />
         </div>
         )
        })}
      </div>
    )
}