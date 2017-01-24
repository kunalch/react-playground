'use strict';

import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import jQuery from 'jquery';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileName: 'Buddy',
      displayPicture: ''
    }
  }

  componentWillMount() {
    this._fetchprofile();
  }

   componentDidMount() {
     clearInterval(this.timer);
     clearInterval(this.timer1);
   }
//http://localhost:8000/public/productCode.json
//http://54.169.189.83:8080/productCode
 _checkForProductCode() {
    var self = this;
    jQuery.ajax({
        url : 'http://localhost:8000/public/productCode.json',
        type : 'GET',
        success: function(data) {
            if(typeof data === "string") {
                data = JSON.parse(data);
            }
             if(data["result"] != "99") {
                self.context.actions.productCode(""+data["result"]);
                location.href="/#/lookbook";
                clearInterval(self.timer1);
              }
       },
      error: function(request, error) {
           console.log("Request: "+ JSON.stringify(request));
       }
      })
 }
//http://localhost:8000/public/logout.json
//http://54.169.189.83:8080/logout?machineName=raspi-1
  _checkUserHasLoggedOutOrNot() {
     jQuery.ajax({
        url : 'http://localhost:8000/public/logout.json',
        type : 'GET',
        success: function(data) {
                if(data == "true")
                   location.href = "/";
        },
        error: function(request, error)
        {
          console.log("Request: "+ JSON.stringify(request));
        }
    });
  }
//http://localhost:8000/public/lookbook.json
//http://54.169.189.83:8080/user?machineName=raspi-1
  _fetchprofile() {
    var self = this;
    jQuery.ajax({
      url : 'http://localhost:8000/public/profile.json',
      type : 'GET',
      success: function(data) {
        if(typeof data === "string") {
          data = JSON.parse(data);
                  }
        self.setState({
          profileName: data.firstName,
          displayPicture:  data.displayPicture
        });
        self.timer = setInterval(() => self._checkUserHasLoggedOutOrNot(), 3000);
        self.timer1 = setInterval(() => self._checkForProductCode(),3000);
      },
      error: function(request, error)
      {
          console.log("Request: "+ JSON.stringify(request));
      }
  });
  }

  render() {
   return (
     <div className="wrapper">
       <div className="profile" ref="profilecomponent">
         	<div className="profileBlockFirst"></div>
         	<div className="profileBlockSecond">
         	<div className="profileName">Hey {this.state.profileName}</div>
       		<div className="profileIcon"><img src={this.state.displayPicture} /></div>
       </div>

       <div className="profileBlockThird">
        	   <div className="welcomeMessage">Welcome to TW store!</div>
        	   <div className="messageForUser">Please scan the product!</div>
        </div>
       </div>
     </div>
   );
  }
}

Profile.contextTypes = {
  actions: React.PropTypes.object
}
