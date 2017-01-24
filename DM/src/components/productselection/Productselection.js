'use strict';
import React from 'react';
import Slider from 'react-slick';
import jQuery from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';
import ReactDOM from 'react-dom';
import configureStore from '../../store/configureStore';
import CheckboxComponent from '../checkbox/Checkbox';

const store = configureStore();

export default class ProductSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lookbookimage: '',
      productslist:[],
      allproducts:{},
      selectedCategory: '',
      selectedCategoryindex:'',
      productschosen: []
    }
  }

  componentWillMount() {
    this._fetchLookBookDetails();
    this.arrayOfObjects = this.arrayOfObjects || [];
    let productsbasket =  this.context.productsbasket;

    if(productsbasket){
        this._initializeArrayOfObjects(productsbasket);
    }
  }


  componentDidMount() {
    var el = this.refs;
    let tm = setTimeout(function(){
      let offtop = el.active.offsetTop; 
      el.mainslider.scrollTop = offtop - 150;
    },100);
 }

 componentWillUpdate(){
    var el = this.refs;
    let tm = setTimeout(function(){ 
      let offtop = el.active.offsetTop;
      el.mainslider.scrollTop = offtop - 150;
    },100);
 }

 _initializeArrayOfObjects(productsbasket) {
  let self = this;
  productsbasket.map(function(productsbasketcategory){
    productsbasketcategory.map(function(product){
        self.arrayOfObjects.push(product.images[0]);
    })
  })
 }

  _extractImages(dataObject) {
    var imgs = [];
    Object.keys(dataObject).forEach(function(k,i){
      imgs.push(dataObject[k].images[0]);
    });
    return imgs;
  }

 _fetchLookBookDetails() { 
  //http://localhost:8000/public/lookbookproducts.json
  //url : 'http://54.169.189.83:8080/lookProducts?name=' + lookbookname,
   var self = this;
   let lookbookname = self.context.lookbookname;
   jQuery.ajax({
    url : 'http://localhost:8000/public/lookbookproducts.json',
    type : 'GET',
    success: function(data) {             
        if(typeof data === "string") {
          data = JSON.parse(data);
        }

        self.setState({allproducts : data});
        //let productid = self.context.productid;
        let productid = "2";
        let selectedProductImage;
        let selectedCategory;
        let selectedCategoryindex;
        let products = [];

        Object.keys(data).forEach(function(key,index){
          data[key].map(function(Obj,ind){
            if(Obj.productCode === productid) {
              data[key].splice(ind,1);
              data[key].unshift(Obj);   
              selectedProductImage = Obj.images[0];
              selectedCategory =  key;
              selectedCategoryindex = index;
            }
          });
        });

        Object.keys(data).forEach(function (key,index) {
            products.push(self._extractImages(data[key])); 
        });

        self.setState({
            productslist: products,
            lookbookimage: selectedProductImage,
            selectedCategory: selectedCategory,
            selectedCategoryindex: selectedCategoryindex
        })
    },
    error: function(request, error)
    {
        console.log("Request: "+ JSON.stringify(request));
    }
    });
  }

  _itemArray(e) {
    var self= this;

    let ps = self.arrayOfObjects;
    let imglink = e.target.getAttribute('data-value');
    if(e.target.tagName.toUpperCase() === 'INPUT'){
      if(e.target.checked) {
        self.arrayOfObjects.push(imglink); 
      }
      else {
        self.arrayOfObjects = ps.filter(function(imgvalue){ return imgvalue != imglink});
      }
     }
  }

  _getLookBookList(products){ 
    let self= this;
    
    return products.map((product,index) => { 
       return (<span><label onClick={this._itemArray.bind(this)}>
        <CheckboxComponent data-value={product} />
        <img src={product} /></label></span>)
    });
  }


  _getClassName(products, selectedimage) {
    var str = "category";
    products.map((product) => {
      if(product === selectedimage){
        str = "active";
      }
    });
    return str;
  }

  _selectSliderSetting(products, selectedimage){
    let flag = false;
    products.map((product) => {
      if(product === selectedimage){
        flag = true;
      }
    });

    return flag;
  }

  _formatproductschosen(prodarr) { 
    let data = this.state.allproducts;
    let currentselection = prodarr;
    let finaldata = []; 
    Object.keys(data).forEach(function(category,index){
      let selection = [];
        data[category].map(function(Obj,ind){ 
          currentselection.map(function(imagevalue){
            if(Obj.images[0] === imagevalue) { 
              selection.push(Obj); 
            }

          })        
        })
        if(selection.length > 0){
          finaldata.push(selection);
        }
    });
    return finaldata;
  }

  _storeProductSelected(){ 
      let finalitems = this._formatproductschosen(this.arrayOfObjects);
      this.context.actions.productsSelected(finalitems);
      //console.log(this.context.router);
     // this.context.router.push('ensemble');
     location.href="/#/ensemble";
  }

   render() {
    var settings = {
        dots: false,
        speed: 1000,
        arrows: true,
        autoplay: false,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        infinite: false
    }

    var settingssecondary = {
        dots: false,
        speed: 1000,
        arrows: true,
        autoplay: false,
        slidesToShow: 2,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        infinite: false
    }
    var slider;
    var self= this;

    var scrollUp = function(){
      let category=[];
      Object.keys(self.state.allproducts).forEach(function(k,i){
        category.push(k);
      });
      let prevIndex = self.state.selectedCategoryindex - 1;
      let prevcategory = category[prevIndex];


      var prevImage = self.state.allproducts[prevcategory][0].images[0];
      self.setState({
        selectedCategoryindex: prevIndex,
        lookbookimage: prevImage,
        selectedCategory: prevcategory,
      });
    }

    var scrollDown = function() { 
      let category=[];
      Object.keys(self.state.allproducts).forEach(function(k,i){
        category.push(k);
      });
      let nextIndex = self.state.selectedCategoryindex + 1;
      let nextcategory = category[nextIndex];

      var nextImage = self.state.allproducts[nextcategory][0].images[0];
      self.setState({
        selectedCategoryindex: nextIndex,
        lookbookimage: nextImage,
        selectedCategory: nextcategory,
      });
    }

    

    return (
      <div className="product-selection-page">
      <div className="scroll-overlay"></div>
        <div className="product-selection-header">
          <div className="tagline">Awesome</div>
          <div className="tagline-info">Now thats some classic</div>
        </div>
        <div className="floating-container-top"><button className="scroll-button up" onClick={scrollUp}>
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button></div>

  
        <ul className="main-slider" ref="mainslider">
          {this.state.productslist.map((value) => { 
          return <li ref={this._getClassName(value,this.state.lookbookimage)} className={this._getClassName(value,this.state.lookbookimage)}>
            <div className="slider-container product-primary">
              {this._selectSliderSetting(value,this.state.lookbookimage)?(
                <Slider {... settings}>
                  {this._getLookBookList(value)}
                </Slider>
              ):<Slider {... settingssecondary}>
                  {this._getLookBookList(value)}
                </Slider>}
              
            </div>
          </li>
        })}
        </ul>
        <div className="floating-container-bottom"><button className="scroll-button down" onClick={scrollDown}><i className="fa fa-angle-down" aria-hidden="true"></i></button></div>
        <button className="pd" onClick={self._storeProductSelected.bind(this)}>Click</button>
      </div>
    );
  }
}


ProductSelection.contextTypes = {
  actions: React.PropTypes.object,
  productid: React.PropTypes.string,
  lookbookname: React.PropTypes.string,
  productschosen: React.PropTypes.array,
  productsbasket: React.PropTypes.array
}

