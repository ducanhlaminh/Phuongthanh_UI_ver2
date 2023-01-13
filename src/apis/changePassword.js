import axiosClients from "../axiosClients";
import axios from "axios";

const ApiChangePassword = {
  verifyAccount: (data) => {
    const url = "/api/v1/auth/verify-account";
    return axiosClients.post(url,{...data});  
  },
  verifyEmail: (data) => {
    const url ="/api/v1/auth/verify-email";
    return axiosClients.post(url,{...data});
  },
  updatePassword: (data) => {
    const url="/api/v1/user/update-password";
    return axiosClients.put(url,{...data});
  },
  updatePasswordNoLocalToken: (token,password,tokenVerifyEmailSuccess) => {
    return axios({
      method: "put",
      url:  process.env.REACT_APP_CLIENT+"/api/v1/user/update-password",
      headers: { authorization: token },
      data: {
        password,
        tokenVerifyEmailSuccess
      },
    });
  },
  verifyForgetAccount: (data) => {
    const url = "/api/v1/auth/verify-forget-account";
    return axiosClients.post(url,{...data});  
  },
  verifyForgetEmail: (data) => {
    const url ="/api/v1/auth/verify-forget-email";
    return axiosClients.post(url,{...data});
  },
};

export default ApiChangePassword;