import { Routes, Route, useNavigate } from "react-router-dom";
import takeParamsVerifyToken from "./ultils/takeParamsVerifyToken";
import {
  Public,
  Login,
  Home,
  DetailProduct,
  Category,
  ProfileClient,
  UserMobileNav,
  Personal,
  Mycart,
} from "./containers/public";
import {
  System,
  General,
  EditProduct,
  ManageProduct,
  ManageCategory,
  User,
  Bill,
  UpdateProfile,
  Profile,
  Orders,
  PersonalInformation,
} from "./containers/system";
import { path } from "./ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { useEffect } from "react";

import { generatePath } from "../src/ultils/fn";
import ListProducts from "./containers/public/ListProduct";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Khi reload page get userdata again
  useEffect(() => {
    isLoggedIn && dispatch(actions.getCurrent());
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getCategory());
    if (window.location.href.includes("verify-token")) {
      const params = takeParamsVerifyToken(window.location.href);
      dispatch(
        actions.saveUseridToken({
          userId: params[params.length - 2],
          tokenChangePassword: params[params.length - 1],
        })
      );
      navigate("/changePassword");
    }
  }, []);

  return (
    <div className="bg-white m-auto overflow-y-auto h-screen">
      <Routes>
        {/*Public routes */}
        {/* <Route path="/" element={<Navigate to="/home/Households"></Navigate>} />
        <Route path="/changePassword" element={<UserChangePassword></UserChangePassword>}></Route>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.FEED} element={<Feed />} />
        <Route path={path.PAYMENT} element={<Payment />} />
        <Route path={path.CART} element={<Cart />} />
      <Route path={path.USERCLIENT} element={<UserClient />} /> */}
        {/*Login route */}


        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.DETAIL} element={<DetailProduct />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERMOBILENAV} element={<UserMobileNav/>} />

          <Route path={path.DETAIL__PRODUCTID} element={<DetailProduct />} />
          <Route path={path.PROFILE} element={<Profile />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.ORDERS} element={<Orders />} />

            <Route path="*" element={<Personal />} />
          </Route>
          
          {categories?.map((item) => (
            <Route
              key={item.id}
              path={generatePath(item.valueVi)}

              element={<ListProducts categoryData={item} />}

            />
          ))}
        </Route>
        {/* <Route path={path.CART} element={<Mycart />} /> */}
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.GENERAL} element={<General />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.EDIT_PRODUCT} element={<EditProduct />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
          <Route path={path.USER} element={<User />} />
          <Route path={path.BILL} element={<Bill />} />
          <Route path={path.UPDATE_PROFILE} element={<UpdateProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
