import 'babel-polyfill';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Bubbles from './Bubbles';
import Bubble from './Bubble';
import Bundles from './Bundles';
import About from './About';
import Cart from './Cart';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/bubbles">Products</Link>
            </li>
            <li>
              <Link to="/bundles">Bundles</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/bubbles/:bubbleId" component={Bubble} />
          <Route path="/bubbles">
            <Bubbles />
          </Route>
          <Route path="/bundles">
            <Bundles />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Bubbles />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
