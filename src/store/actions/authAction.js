import actionTypes from "./actionTypes";
import { apiRegister, apiLogin } from "../../apis/auth";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister.post(payload);

    if (response.status === 0) {
      
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        token: response.token,
        userCurrent: response.dataCurrent,
      });
    } else {
      
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        message: response.message,
      });
    }
  } catch (error) {
    
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      message: "Vui lòng kiểm tra đường truyền mạng.",
    });
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin.post(payload);

    if (response?.status === 0) {
     
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        token: response.token,
        userCurrent: response.dataCurrent,
      });
    } else
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        message: response.message,
      });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      message: "Vui lòng kiểm tra đường truyền mạng.",
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
