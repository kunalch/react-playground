'use strict';
import React from 'react';
import jQuery from 'jquery';
import Slider from 'react-slick';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class LookBook extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      lookbookname: '',
      lookbookimage: ''
  }
  }
  componentWillMount() {
    this._fetchProductCode();
  }
//'http://localhost:8000/public/productCode.json'
//http://54.169.189.83:8080/productCode
//http://localhost:8000/public/lookbook.json
//'http://54.169.189.83:8080/look?productCode='+data["result"]
 _fetchProductCode() {
  var self= this;
  jQuery.ajax({
    url : 'http://localhost:8000/public/productCode.json',
    type : 'GET',
    success: function(data) { 
       if(typeof data === "string") {
          data = JSON.parse(data);
        }

       jQuery.ajax({
        url : 'http://localhost:8000/public/lookbook.json',
        type : 'GET',
        success: function(lookdata) {  
          if(typeof lookdata === "string") {
            lookdata = JSON.parse(lookdata);
         }

         self.context.actions.lookbookSelected(lookdata.name);
         self.setState({
            lookbookname: lookdata.name,
            lookbookimage: lookdata.imageURL
          });
        },
        error: function(request, error)
        {
                console.log("Request: "+ JSON.stringify(request));
        }
        });
    },
    error: function(request, error)
    { 
        console.log("Request: "+ JSON.stringify(request));
    }
    });
  }
  render() {
        var settings = {
        dots: true,
        speed: 1000,
        arrows: true,
        autoplay: true,
        focusOnSelect: true
    }
    return (
      <div className="lookbook">
        <div className="tagline">Trending Now!</div>
        <div className="tagline-info">Outfits designed for you</div>
        <div className="lookbook-carousel">
                 <div className='container'>
           <Link to="/productselection"> <img src={this.state.lookbookimage} /></Link>
          </div>
        </div>
      </div>
    );
  }
}

LookBook.contextTypes = {
  actions: React.PropTypes.object
}