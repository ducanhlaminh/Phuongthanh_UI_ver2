import axiosClients from "../axiosClients";

const ApiProduct = {
  getAll: (params) => {
    const url = "/api/v1/product/";
    return axiosClients.get(url, { params });
  },
  getProductByIdClient: (params) => {
    const url = `/api/v1/product/`;
    return axiosClients.get(url, { params });
  },
  //   params = {
  //     limitProduct: số products muốn lấy về 1 lần, nếu ko truyền sẽ lấy theo mặc định là 5,
  //     page: số trang muốn lấy, nếu ko truyền sẽ mặc định là lấy trang đầu,
  //     order: ['costPerUnit', 'ASC'],
  //     categoryCode: code category muốn filter,
  //     ... => Muốn filter theo trường nào thì cứ gửi params tên trường và value muốn filter(product.md in BE)

  //  get product by Id (
  // getAll: {id:???}
  // )

  create: ({bodyFormData,preSale}) => {
    const url = `/api/v1/product/update?sale=${preSale}&operator=plus`;
    return axiosClients.post(url, bodyFormData);
  },
  delete: (params) => {
    const url = "/api/v1/product/delete";
    return axiosClients.delete(url, { params });
  },
  update: ({bodyFormData,preSale}) => {
    const url = `/api/v1/product/update${preSale!=="" ? `?sale=${preSale}&operator=plus`:''}`;
    return axiosClients.put(url, bodyFormData);
  },
  getProductById: (params) => {
    const url = `/api/v1/admin/product/`;
    return axiosClients.get(url, { params });
  },
  voteProduct: (data) => {
    const url = "/api/v1/product/votes";
    return axiosClients.post(url, { ...data });
  },
};

export default ApiProduct;
