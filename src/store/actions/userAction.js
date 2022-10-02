import actionTypes from "./actionTypes";
import apiUser from "../../apis/user";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apiUser.getCurrent();
    if (response?.status === 0)
      dispatch({
        type: actionTypes.GET_CURRENT,
        data: response.user,
      });
  } catch (error) {}
};

export const addToCartAction = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    data: product,
  };
};

export const removeAllCartAction = () => {
  return {
    type: actionTypes.DETELE_ALL,
  };
};

export const addToPaymentAction = (product) => {
  return {
    type: actionTypes.ADD_TO_PAYMENT,
    data: product,
  };
};
export const deleteFromPaymentAction = (product) => {
  return {
    type: actionTypes.DELETE_FROM_PAYMENT,
    data: product,
  };
};
export const updatePaymentAction = (product) => {
  return {
    type: actionTypes.UPDATE_PAYMENT,
    data: product,
  };
};

export const deleteAllPaymentsAction = () => {
  return {
    type: actionTypes.DELETE_ALL_PAYMENTS,
  };
};
export const updateProfile = (data) => async (dispatch) => {
  await apiUser.update({ avatar: data });
  const response = await apiUser.getCurrent();
  if (response?.status === 0)
    dispatch({
      type: actionTypes.GET_CURRENT,
      data: response.user,
    });
};
