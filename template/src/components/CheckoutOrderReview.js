import React, { useState } from "react";

const CheckoutOrderReview = ({ show, orderData }) => {
    const showHideClassName = show ? "" : "display-none";

    return (
      <div className={showHideClassName}>
          <p>{orderData}</p>
      </div>
    );
};

export default CheckoutOrderReview;