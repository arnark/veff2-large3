import React from "react";
import { Link } from 'react-router-dom';

const BundleCheckoutOverlay = ({ handleClose, show, bundleName}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <div className="modal-main">
            <h1>{bundleName} added to cart!</h1>
            <Link to={`/checkout`}>
                <p>Go to checkout!!!!</p>
            </Link>
         <button onClick={handleClose}>close</button>
        </div>
      </div>
    );
};

export default BundleCheckoutOverlay;