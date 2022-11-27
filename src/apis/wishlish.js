import axiosClients from "../axiosClients";

const wishlist = {
  createWishlish: (data) => {
    const url = "/api/v1/wishlist/";
    return axiosClients.post(url, data);
  },
  getAllWish: () => {
    const url ="/api/v1/wishlist/";
    return axiosClients.get(url);
  },
  delete: (params) => {
    const url = "/api/v1/wishlist/";
    return axiosClients.delete(url, { params });
  }
};
export default wishlist;
