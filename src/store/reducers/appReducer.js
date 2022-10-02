import { type } from "@testing-library/user-event/dist/type";
import actionTypes from "../actions/actionTypes";

const initState = {
  products: [],
  categories: [],
  code: "OĐAIGNUD8",
  pageLength: "",
  productsBestSeller: [],
  productsCurrentUpdate: [],
  count: 0,
  currentProduct: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT:
      // const pageLength = action.data[1].pages;
      return {
        ...state,
        products: action.data,
      };
    case actionTypes.GET_PRODUCT_BEST_SELLER:
      return {
        ...state,
        productsBestSeller: action.data
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        categories: action.data,
      };
    case actionTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        currentProduct: action.data
      };
    case actionTypes.GET_PRODUCT_CURRENT_UPDATE:
      return {
        ...state,
        productsCurrentUpdate: action.data
      };
    case actionTypes.GET_CODE_CATEGORIES:
      return {
        ...state,
        code: action.data,
      };
    default:
      return state;
  }
};

export default appReducer;
