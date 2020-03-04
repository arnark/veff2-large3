import React from "react";
import PropTypes from 'prop-types';
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

/* 
  handleClose: required function to handle overlay close
  show: required boolean that decides wheter the overlay should be visible or not
  bundleName: the name of the bundle to be displayed
*/
BundleCheckoutOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  bundleName: PropTypes.string.isRequired
};

export default BundleCheckoutOverlay;