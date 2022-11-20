import axiosClients from "../axiosClients";

const ApiCart = {
  delete: (params) => {
<<<<<<< Updated upstream
    const url = "/api/v1/bill";
    return axiosClients.delete(url, { params });
=======
    console.log(params)
    const url = "/api/v1/cart";
    return axiosClients.delete(url,{params});
>>>>>>> Stashed changes
  },
  get: () => {
    const url = "/api/v1/cart";
    return axiosClients.get(url);
  },
  create: (data) => {
    const url = "/api/v1/cart";
    return axiosClients.post(url, data);
  },
};

export default ApiCart;
