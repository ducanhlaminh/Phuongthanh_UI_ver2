import icons from "./icons";

const { BsSpeedometer2, RiProductHuntLine, FaUserEdit, IoIosCreate } = icons;

export const path = {
  LOGIN: "/login",
  PUBLIC: "/*",
  SYSTEM: "/system/*",
  USERCLIENT: "/user/*",
  HOME: "",
  PAYMENT: "/payment",
  FEED: "/feed",
  CART: "cart/",
  GENERAL: "*",
  EDIT_PRODUCT: "edit-product",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_CATEGORY: "manage-category",
  USERMOBILENAV: "tai-khoan",
  CATEGORY: "gian-hang",
  USER: "user",
  BILL: "bill",
  CREATE_CATEGORY: "create-category",
  UPDATE_PROFILE: "update-profile",
  DISCOUNT: "giam-gia",
  DETAIL: "chi-tiet-san-pham",
  DETAIL__PRODUCTID: "chi-tiet-san-pham/:id",
  PROFILE: "ho-so/",
  ORDERS: "hoa-don-cua-toi",
  PERSONAL: "",
  ADD_ADDRESS: "address",
};
export const vi_uf8 = {
  shopname: "PhuongThanh",
  all_categories: "Tất cả chủ để",
  phone: "813.672.409",
  support_time: "Hỗ trợ 24/7",
  adress: "102-HUB3-CT8 tập thể Thành Công",
  phone1: "0813672409",
  phone2: "01253322599",
  email: "phuongthanhshophn@gmail.com",
  facebook: "Phuong Thanh's Shop",
  zalo: "01253322599",
  instagram: "pthanh@shop102",
};
export const constant_page = {
  limit_products_outstanding: 15,
  limit_products: 25,
};
export const filters = [
  { valueVi: "Mới nhất", sort: { type: "updatedAt", code: "DESC" } },
  { valueVi: "Cũ nhất", sort: { type: "updatedAt", code: "ASC" } },
  { valueVi: "A-Z", sort: { type: "name", code: "DESC" } },
  { valueVi: "Z-A", sort: { type: "name", code: "ASC" } },
  { valueVi: "Giá cao -> thấp", sort: { type: "costPerUnit", code: "DESC" } },
  { valueVi: "Giá thấp -> cao", sort: { type: "costPerUnit", code: "ASC" } },
];
export const filtersSider = [
  {
    valueVi: "Stocking",
    code: 1,
  },
  {
    valueVi: "Stocking",
    code: 1,
  },
  {
    valueVi: "Stocking",
    code: 1,
  },
];
export const adminMenu = [
  {
    name: "Tổng sản phẩm",
    path: "/system/",
    icon: <BsSpeedometer2 size={24} />,
  },
  {
    name: "Sản phẩm",
    path: "/system/manage-product",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    name: "Người dùng",
    path: "/system/user",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    name: "Hóa đơn",
    path: "/system/bill",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    name: "Quản lý gian hàng",
    path: "/system/manage-category",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    name: "Thống kê",
    path: "/system/analytics",
    icon: <RiProductHuntLine size={24} />,
  },
  // { name: 'Quản lý thành viên', path: '/system/manage-user', icon: <FaUserEdit size={24} /> },
  {
    name: "Thêm sản phẩm",
    path: "/system/edit-product",
    icon: <IoIosCreate size={24} />,
  },
  {
    name: "Thêm gian hàng",
    path: "/system/update-profile",
    icon: <IoIosCreate size={24} />,
  },
];
