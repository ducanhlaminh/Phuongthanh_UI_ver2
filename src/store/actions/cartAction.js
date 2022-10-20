import actionTypes from "./actionTypes";
import ApiCart from "../../apis/cart";

export const addToCart = () => async (dispatch) => {
  try {
    const response = await ApiCart.get();
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        data: response.yourCart,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: null,
    });
  }
};
