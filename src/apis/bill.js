import axiosClients from "../axiosClients";

const ApiBill = {
  getAll: (params) => {
    const url = "/api/v1/bill";
    return axiosClients.get(url, { params });
  },
  getAllForUser: () => {
    const url = "/api/v1/bill/current_user";
    return axiosClients.get(url);
  },
  create: (data) => {
    const url = "/api/v1/bill/create";
    return axiosClients.post(url, data);
  }
};

export default ApiBill;
