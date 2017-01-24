'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../../store/configureStore';

const store = configureStore();

class CheckboxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked : false
    }
  }

  componentWillMount() {
    let temp = this._productImageInStore(this.props['data-value']); 
    this.setState({isChecked: temp});
  }


  componentDidMount() {

 }

 componentWillUpdate(){

 }


 _productImageInStore(productImgLink) {
    let self= this;
    let productsbasket = self.context.productsbasket; 
    let flag = false;

    if(productsbasket) {
      productsbasket.map((category,index) => { 
        category.map((product) => { 
          if(product.images[0] === productImgLink) {
            flag = true;
          }
        });
      });
    } 
    return flag;
  }

 _itemSelection(e) { 
    this.setState({
      isChecked: !this.state.isChecked
    })

    let self= this;
    let ps = self.arrayOfObjects;
    let imglink = e.target.getAttribute('data-value');
  }


   render() {
    return (
      <input type="checkbox" checked={this.state.isChecked} data-value={this.props['data-value']} onChange={this._itemSelection.bind(this)} />
    );
  }
}
export default CheckboxComponent;

CheckboxComponent.contextTypes = {
  productsbasket: React.PropTypes.array
}


