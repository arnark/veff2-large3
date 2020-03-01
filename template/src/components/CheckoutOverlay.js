import React from "react";
import { Link } from 'react-router-dom';

const CheckoutOverlay = ({ handleClose, show, bubble}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <div className="modal-main">
         {bubble.map((data) => {
             return (
              <div key={data.id}>
                <h1>{data.name} added to cart!</h1>
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
                <Link to={`/checkout`}>
                    <p>Go to checkout!!!!</p>
                </Link>
              </div>
             )})
         }
         <button onClick={handleClose}>close</button>
        </div>
      </div>
    );
};

export default CheckoutOverlay;