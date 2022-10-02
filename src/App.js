import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import takeParamsVerifyToken from "./ultils/takeParamsVerifyToken";
import Login from "./containers/public/Login";
import {
  System,
  General,
  EditProduct,
  ManageProduct,
  ManageCategory,
  User,
  Bill,
  UpdateProfile,
} from "./containers/system";
import { path } from "./ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { useEffect } from "react";
import ApiBill from "./apis/bill";


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Khi reload page get userdata again
  useEffect(() => {
    isLoggedIn && dispatch(actions.getCurrent());
    // isLoggedIn && ApiBill({
    //   email: 'ducanh9x@gmail.com',
    //   address: 'hanoi',
    //   phone: '0326770098',
    //   products: JSON.stringify({ productId: "069c8827-8f72-4ad8-adda-a48cd584270e", cost: " ", quantity: 1 })
    // })
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getCategory());
    if (window.location.href.includes('verify-token')) {
      const params = takeParamsVerifyToken(window.location.href);
      dispatch(actions.saveUseridToken({ userId: params[params.length - 2], tokenChangePassword: params[params.length - 1] }))
      navigate('/changePassword');
    }
  }, []);

  return (
    <div className="w-full h-full max-w-[1560px] mx-auto">
      <Routes>
        {/*Public routes */}
        {/* <Route path="/" element={<Navigate to="/home/Households"></Navigate>} />
        <Route path="/changePassword" element={<UserChangePassword></UserChangePassword>}></Route>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.FEED} element={<Feed />} />
        <Route path={path.PAYMENT} element={<Payment />} />
        <Route path={path.CART} element={<Cart />} />
        <Route path={path.DETAIL} element={<Detail />} />
        <Route path={path.USERCLIENT} element={<UserClient />} /> */}

        {/*Login route */}
        <Route path={path.LOGIN} element={<Login />} />

        {/*Private routes */}
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
