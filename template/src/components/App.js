import 'babel-polyfill';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from './Navigation';
import Bubbles from './Bubbles';
import Bubble from './Bubble';
import Bundles from './Bundles';
import About from './About';
import Cart from './Cart';
import Checkout from './Checkout';

export default function App() {
  return (
    <Router>
      <div>
        <Navigation/>

        <div id="container">
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
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/">
              <Bubbles />
            </Route>
          </Switch>
    	  </div>
      </div>
    </Router>
  );
}
