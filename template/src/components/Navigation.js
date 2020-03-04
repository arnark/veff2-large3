import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-primary">
        <Link to="/" className="navbar-brand mr-auto d-flex">
          <img src="https://i.imgur.com/UoqLLcB.png" height="50" />
          <p className="text-light m-auto pl-3">Bubblify</p>
        </Link>
        <div className="navbar-nav">
          <Link to="/bubbles" className="nav-link text-light">Products</Link>
          <Link to="/bundles" className="nav-link text-light">Bundles</Link>
          <Link to="/about" className="nav-link text-light">About Us</Link>
          <Link to="/cart" className="nav-link text-light">Shopping Cart</Link>
        </div>
      </nav>
    )
}