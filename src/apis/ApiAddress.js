import axios from "axios";

const ApiAddress = {
  Province: () => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
    });
  },
  District: (province) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
      params: { province_id: province.ProvinceID },
    });
  },
  Ward: (district) => {
    return axios({
      method: "get",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      headers: { token: "47678ca2-68a7-11ed-b190-ea4934f9883e" },
      params: { district_id: district.DistrictID },
    });
  },
<<<<<<< Updated upstream
=======
  Add: (address) => {
    const url = "/api/v1/address/";
    return axiosClients.post(url, address);
  },
  Get: () => {
    const url = "/api/v1/address/";
    return axiosClients.get(url);
  },
>>>>>>> Stashed changes
};

export default ApiAddress;
