import axios from "axios";
import axiosClients from "../axiosClients";
const ApiAddress = {
  Province: () => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      headers: { token: "6dca80a5-3584-11ed-ad26-3a4226f77ff0" },
    });
  },
  District: (province) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      headers: { token: "6dca80a5-3584-11ed-ad26-3a4226f77ff0" },
      params: { province_id: province.ProvinceID },
    });
  },
  Ward: (district) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      headers: { token: "6dca80a5-3584-11ed-ad26-3a4226f77ff0" },
      params: { district_id: district.DistrictID },
    });
  },
  Add: (address) => {
    const url = "/api/v1/address/";
    return axiosClients.post(url, address);
  },
  Get: () => {
    const url = "/api/v1/address/";
    return axiosClients.get(url);
  },
};

export default ApiAddress;
