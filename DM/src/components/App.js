import React, { PropTypes, Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers , bindActionCreators} from 'redux';
import configureStore from '../store/configureStore';
import { devTools, persistState } from 'redux-devtools';
import * as TodoActions from '../actions';

export default class App extends React.Component {

  getChildContext() {
    return {
      actions: this.props.actions,
      productid: this.props.productcode,
      lookbookname: this.props.lookbookselected,
      productsbasket: this.props.productsselected
      }
  }

  render() {
    this.propTypes = {
      todos: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired
    }

    const { todos, actions } = this.props
    return (
      	<div className="stretchContainer" todos={todos} actions={actions}>
          {this.props.children} 
      	</div>
    )
  }
}

App.childContextTypes = {
  actions: React.PropTypes.object,
  productid: React.PropTypes.string,
  lookbookname: React.PropTypes.string,
  productsbasket: React.PropTypes.array
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    productcode: state.reducerdm.productCode,
    lookbookselected: state.reducerdm.lookbookselected,
    productsselected: state.reducerdm.productsSelected
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)