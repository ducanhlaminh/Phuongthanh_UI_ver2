import wishlist from "../../apis/wishlish";
import actionTypes from "../actions/actionTypes";

const initState = {
  wishlist:[],
};

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      return {...state,wishlist:[...wishlist,action.data]};

    default:
      return state;
  }
};
export default searchReducer;
