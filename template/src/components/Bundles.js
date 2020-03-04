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
        {bundles.map((data) => {
          return (
            <div className="bundle text-center my-3" key={data.id}>
              <h2 className="pt-2">{data.name}</h2>
              <div className="card-deck justify-content-center">
                {data.items.map((bubble) => {
                return (
                  <Link to={`/bubbles/${bubble.id}`} key={bubble.id}>
                    <div className="bubble-card card bundle-card text-center text-dark" id={bubble.id} >
                      <h4 className="card-header">{bubble.name}</h4>
                      <img className="img-fluid" src={bubble.image} />
                      <p>{bubble.price} ISK</p>
                    </div>
                  </Link>
                  )})
                }
              </div>
              <div className="w-100 d-flex">
                <button className="btn btn-lg btn-outline-success bundle-button addToCart" onClick={() => handleAddBundleToCart(data.items, data.name)}>Add Bundle to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    )
}