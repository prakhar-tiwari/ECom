import React, { Component } from 'react';
import './App.css';
import Navigation from './layout/navigation/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import Home from './components/Home';
import AddProduct from './components/admin/AddProduct';
import Shop from './components/shop/Shop';
import Product from './components/shop/Product';
import Cart from './components/shop/Cart';
import Checkout from './components/shop/Checkout';
import Orders from './components/shop/Orders';
import { connect } from 'react-redux';
import { googleCurrentUser } from './actions/authActions';


class App extends Component {
  componentDidMount() {
    this.props.googleCurrentUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Shop} />
        </Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={Product} />
        <Switch>
          <PrivateRoute
            exact
            path="/add-product"
            component={AddProduct}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/cart"
            component={Cart}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/checkout"
            component={Checkout}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/orders"
            component={Orders}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, { googleCurrentUser })(App);
