import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route, browserHistory, Link } from 'react-router';
import { createStore, combineReducers , bindActionCreators} from 'redux';
import Redux, { connect } from 'react-redux';
import * as TodoActions from '../../actions'
import configureStore from '../../store/configureStore'
import Slider from 'react-slick';



const store = configureStore();

export default class Ensemble extends React.Component {
  constructor(props) {
    super(props);
  }
    

  render() { 
    var self= this;
    const { todos, actions } = this.props;
    var settings = {
        dots: false,
        speed: 1000,
        arrows: true,
        autoplay: false,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        infinite: false
    };

    return (
      <div className="ensemble">           
      <Link to="/productselection"> click</Link>
      <ul className={"ensamble-rows"+self.context.productsbasket.length}>
        {self.context.productsbasket.map((category,index) => { 
          return <li className={"categories-row c" + category.length}> <ul>
            {
              category.map((product) => {
                return <li className="productcolumn">< img src={product.images[0]} /></li>;
              })
            }
            </ul>
          </li>
        })}
        
      </ul>
     </div>
    )
  }
}

Ensemble.contextTypes = {
  actions: React.PropTypes.object,
  productsbasket: React.PropTypes.array
}


