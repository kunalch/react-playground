import * as types from '../constants/ActionTypes'

export function profileFetched(text) { 
  return { type: types.PROFILE_FETCHED, text }
}

export function productCode(id) { 
  return { type: types.PRODUCT_CODE, id }
}

export function lookbookSelected(id) { 
  return { type: types.LOOKBOOK_SELECTED, id }
}

export function productsSelected(arr) { 
  return { type: types.PRODUCTS_SELECTED, arr }
}


