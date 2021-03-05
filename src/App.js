import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from './firebase';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import './App.scss'

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import ProductPage from './pages/Product/Product';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';

import { useStateValue } from './Hooks/stateProvider';
import { ACTIONS } from './Hooks/reducer';

const promise = loadStripe(
  'pk_test_51Hk4Y1IQ8MiZInN8D5Vpmcg6ldlMctjhF6zDH3t6wc1amkEaSj3GjpYZTQn8pWE6D3s1Tehq8k0cgxDHSvufEPcX00ulsb1V5J'
);
 
function App() {
  const [ , dispatch] = useStateValue();
  
  useEffect(() => {
  // will only going to run once when app component loads....

    auth.onAuthStateChanged(authUser => {

      if(authUser){
        dispatch({type: ACTIONS.SET_USER, user: authUser});
      }else{
        dispatch({type: ACTIONS.SET_USER, user: null});
      }
    })
  }, [dispatch])

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/orders'>
            <Header/>
            <Orders />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header/>
            <Checkout />
          </Route>
          <Route exact path="/product/:productId">
            <Header/>
            <ProductPage />
          </Route>
          <Route path='/payment'>
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header/>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
