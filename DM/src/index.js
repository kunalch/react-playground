import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, Navigation} from 'react-router';
import {Provider} from 'react-redux';
import App from './components/App';
import Pageinit from './components/pageinit';
import Profile from './components/home/Profile';
import LookBook from './components/lookbook/Lookbook';
import ProductSelection from './components/productselection/Productselection';
import Ensemble from './components/ensemble/ensemble';
import configureStore from './store/configureStore'
import helper from './helpers';
import "../styles/style.scss";
import "../styles/_ensemble-grid.scss";
import {profileFetched} from "./actions";

const store = configureStore();

let routes = (
  <Provider store={store}>
  <Router history={helper.history}>
    <Route path='/' component={App} >
        <IndexRoute component={Pageinit} />
      <Route path='profile' component={Profile} />
    	<Route path='lookbook' component={LookBook} />
    	<Route path='productselection' component={ProductSelection} />
      <Route path='ensemble' component={Ensemble} />
    	<Route path="*" component={Pageinit}/>
    </Route>
  </Router>
  </Provider>
);

ReactDOM.render(routes, document.querySelector('#main'));