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
  CheckOut,
  Search,
  AddAddress,
  ChangePassword,
  ItemOrder,

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
import { Contact, BoxChat } from "./components";
import { path } from "./ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { useEffect, useState } from "react";

import { generatePath } from "../src/ultils/fn";
import ListProducts from "./containers/public/ListProduct";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);
  const [isStartChatBot, setIsStartChatBot] = useState(false)
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
      navigate("/ho-so/doi-mat-khau");
    }
  }, []);

  return (
    <div className="bg-purple-100 m-auto overflow-y-auto h-screen relative">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERMOBILENAV} element={<UserMobileNav />} />
          <Route path={path.DETAIL__PRODUCTID} element={<DetailProduct />} />
          <Route path={path.CATEGORY} element={<Category/>}></Route>
          <Route path={path.SEARCH} element={<Search/>}></Route>
          <Route path={path.ITEM_ORDERS} element={<ItemOrder/>}></Route>
          <Route path={path.ITEM_ORDERS_ID} element={<ItemOrder/>}></Route>

          <Route path={path.PROFILE} element={<Profile />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.ORDERS} element={<Orders />} />
            <Route path={path.CHANGE_PASSWORD} element={<ChangePassword></ChangePassword>}></Route>
            <Route path="*" element={<Personal />} />
          </Route>
          <Route path={path.CART} element={<Mycart />}></Route>
          <Route path={path.ADD_ADDRESS} element={<AddAddress />} />
          {categories?.map((item) => (
            <Route
              key={item.id}
              path={generatePath(item.valueVi)}
              element={<ListProducts categoryData={item} />}
            />
          ))}

          <Route path={path.SEARCH__KEYWORD} element={<ListProducts categoryData='' />}></Route>
        </Route>



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
      <div className="fixed top-1/2 right-[32px] bg-red-500">
        <Contact setIsStartChatBot={setIsStartChatBot} />
      </div>

      
      {isStartChatBot && <div className="fixed bottom-0 z-70 right-[100px] bg-red-500">
        <BoxChat setIsStartChatBot={setIsStartChatBot} />
      </div>}
    </div>
  );
}

export default App;
