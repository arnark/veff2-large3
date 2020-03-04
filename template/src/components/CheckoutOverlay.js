import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CheckoutOverlay = ({ handleClose, show, bubble}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>

        {bubble.map((data) => {
            return (        
            <div className="modal-main card text-center text-dark mb-1" key={data.id}>
            <h4 className="card-header">{data.name} added to cart!</h4>
              <div className="item-container-overlay" >
                  <img className="card-img-top" src={data.image} />
                  <p>{data.price} ISK</p>
                </div>
                <Link to={'/checkout'} className="btn btn-block btn-success addToCart">Checkout</Link>
                <button className="btn btn-block btn-light addToCart" onClick={handleClose}>Continue shopping</button>
              </div>
          )})
          }
      </div>
    );
};


/* 
  handleClose: required function to handle overlay close
  show: required boolean that decides wheter the overlay should be visible or not
  bubble: the bubble object to be displayed
*/
CheckoutOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  bubble: PropTypes.array.isRequired
};

export default CheckoutOverlay;