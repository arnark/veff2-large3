import React, { useState, useEffect } from "react";

export default function About() {
  const [ info, updateInfo ] = useState({});
  
  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    fetch('http://localhost:3500/api/about')
    .then(response => response.json())
    .then(function(data) {
      updateInfo(data);
    });
  }
    return (
      <div className="my-3 bundle">
        <h2>About Bubblify</h2>
        <div className="d-flex">
          <img src={info.image} height="150" />
          <div className="mt-3 ml-3">
            {info.info ? info.info.map((text, index) => <p key={index}>{text}</p>) : <></>}
          </div>
        </div>
      </div>
    )
  }