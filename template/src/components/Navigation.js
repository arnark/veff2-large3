import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-primary">
        <div className="navbar-nav">
          <Link to="/bubbles" className="nav-link text-light">Products</Link>
          <Link to="/bundles" className="nav-link text-light">Bundles</Link>
          <Link to="/about" className="nav-link text-light">About Us</Link>
          <Link to="/cart" className="nav-link text-light">Shopping Cart</Link>
        </div>
      </nav>
    )
}