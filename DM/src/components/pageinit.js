import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route, browserHistory } from 'react-router';
import { createStore, combineReducers , bindActionCreators} from 'redux';
import Redux, { connect } from 'react-redux';
import * as TodoActions from '../actions'
import configureStore from '../store/configureStore'
import {profileFetched} from "../actions";


const store = configureStore();

export default class Pageinit extends React.Component {
  constructor(props) {
  	super(props);
    this.timer = '';
    this.state = {
      profiledata: {} 
    }
  }
  
  componentDidMount() {
    this.timer = setInterval(() => this._fetchprofile() , 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
//'http://localhost:8000/public/profile.json'
//http://54.169.189.83:8080/user?machineName=raspi-1
  _fetchprofile() {
  	var self = this;
    jQuery.ajax({
    	url : 'http://localhost:8000/public/profile.json',
    	type : 'GET',
    	success: function(data) {
        
         store.dispatch({
           type: 'PROFILE_FETCHED'
         }); 

        if(typeof data === "string") {
          data = JSON.parse(data);
         } 
         clearInterval(self.timer);

          self.setState({
            profiledata: data
          }); 
          //console.log('self.context.router ------- ',self.context.router)
         self.context.router.push('profile');
    	},
    	error: function(request, error)
    	{
        	console.log("Request: "+ JSON.stringify(request));
    	}
	});
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div className="blank" {...actions}>

     </div>
    )
  }
}

Pageinit.contextTypes = {
  router: React.PropTypes.object
}

