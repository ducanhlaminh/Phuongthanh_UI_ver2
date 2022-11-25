import actionTypes from "./actionTypes";
import wishlist from "../../apis/wishlish";

export const addToWishlist = (payload) => async (dispatch) => {
  try {
    const response = await wishlist.createWishlish(payload);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.ADD_TO_WISHLIST,
        data: response.response,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_TO_WISHLIST,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_WISHLIST,
      data: null,
    });
  }
};
export const deleteFromWishlist = (payload) => async (dispatch) => {
    try {
      const response = await wishlist.delete(payload);
      if (response?.status === 0) {
        dispatch({
          type: actionTypes.DELELTE_FROM_WISHLIST,
          data: response.response,
        });
      } else {
        dispatch({
          type: actionTypes.DELELTE_FROM_WISHLIST,
          data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELELTE_FROM_WISHLIST,
        data: null,
      });
    }
  };