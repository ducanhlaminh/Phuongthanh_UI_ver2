import actionTypes from "../actions/actionTypes";

const initState = {
  productsCart: [],
  count: 0,
  TotalPrice: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const products = [];

      for (const product of action?.data) {
        products.push({ ...product, quanity: 1 });
      }
      return {
        ...state,

        productsCart: products,
      };

    default:
      return state;
  }
};

export default cartReducer;
