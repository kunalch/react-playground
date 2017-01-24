import { PROFILE_FETCHED, PRODUCT_CODE, LOOKBOOK_SELECTED, PRODUCTS_SELECTED} from '../constants/ActionTypes'

const initialState =  {
        text: 'Use Redux',
        completed: false,
        id: 0
      }


export default function todos(state = initialState, action) { 
  switch (action.type) {
    case PROFILE_FETCHED:
      return Object.assign({},state, {text: action.text});

    case PRODUCT_CODE:
      return addTaskReducer(state,action);

    case LOOKBOOK_SELECTED:
      return addLookBookReducer(state,action);

    case PRODUCTS_SELECTED:
      return addProductsReducer(state,action);
    
    default:
      return state
  }
}

function addTaskReducer(state,action){  
  return Object.assign({}, state, {productCode: action.id});
}

function addLookBookReducer(state,action){ 
  return Object.assign({}, state, {lookbookselected: action.id});
}

function addProductsReducer(state,action){ 
  return Object.assign({}, state, {productsSelected: action.arr});
}