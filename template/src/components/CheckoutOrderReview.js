import React, { useState } from "react";

const CheckoutOrderReview = ({ show, deliveryData }) => {
    const showHideClassName = show ? "" : "display-none";

    return (
      <div className={showHideClassName}>
          <p>{deliveryData}</p>
      </div>
    );
};

export default CheckoutOrderReview;