import axiosClients from "../axiosClients";

export const apiGetBills = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClients({
        method: "get",
        url: "/api/v1/bill2/",
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetProductsOfBill2 = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClients({
        method: "get",
        url: "/api/v1/bill2/products",
        params: { bid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
})

const ApiCheckout = {
  create: (data) => {
    const url = "/api/v1/bill2";
    try {
        return axiosClients.post(url,data);
    } catch (error) {
        console.log(error);
    }
  },
};

export default ApiCheckout;

export const apiCreateBill2 = (payload) => {
  const url = "/api/v1/bill2";
  return axiosClients.post(url, payload);
};


