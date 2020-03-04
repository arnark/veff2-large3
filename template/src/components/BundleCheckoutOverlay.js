import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BundleCheckoutOverlay = ({ handleClose, show, bundleName}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <div className="modal-main card text-center text-dark mb-1">
          <h4 className="card-header">{bundleName} added to cart!</h4>
          <Link to={'/checkout'} className="btn btn-block btn-success addToCart">Checkout</Link>
          <button className="btn btn-block btn-light addToCart" onClick={handleClose}>Continue shopping</button>
        </div>
      </div>
    );
};

/* 
  handleClose: required function to handle overlay close
  show: required boolean that decides wether the overlay should be visible or not
  bundleName: the name of the bundle to be displayed
*/
BundleCheckoutOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  bundleName: PropTypes.string.isRequired
};

export default BundleCheckoutOverlay;