import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
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
  WishList,
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
  const [isStartChatBot, setIsStartChatBot] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Khi reload page get userdata again
  useEffect(() => {
    isLoggedIn &&
      setTimeout(() => {
        dispatch(actions.getCurrent());
      }, 100);
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
          <Route path={path.CATEGORY} element={<Category />}></Route>
          <Route path={path.SEARCH} element={<Search />}></Route>
          <Route path={path.ITEM_ORDERS} element={<ItemOrder />}></Route>
          <Route path={path.ITEM_ORDERS_ID} element={<ItemOrder />}></Route>
          <Route
            path={path.BEST_SELLER}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm bán chạy" />
            }
          ></Route>
          <Route
            path={path.TOP_FAVOURITE}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm yêu thích" />
            }
          ></Route>
          <Route
            path={path.NEW_PRODUCTS}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm mới nhất" />
            }
          ></Route>

          <Route path={path.PROFILE} element={<Profile />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.ORDERS} element={<Orders />} />
            <Route
              path={path.WISH_LISH}
              element={<WishList></WishList>}
            ></Route>
            <Route
              path={path.CHANGE_PASSWORD}
              element={<ChangePassword></ChangePassword>}
            ></Route>
            <Route path="*" element={<Personal />} />
          </Route>
          <Route path={path.CART} element={<Mycart />}></Route>
          <Route path={path.ADD_ADDRESS} element={<AddAddress />} />
          {categories?.map((item) => (
            <Route
              key={item.id}
              path={generatePath(item.valueVi)}
              element={<ListProducts categoryData={item} otherData="" />}
            />
          ))}

          <Route
            path={path.SEARCH__KEYWORD}
            element={<ListProducts categoryData="" otherData="Tìm kiếm" />}
          ></Route>
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

      <div
        className={`fixed z-10 md:right-[32px] md:top-1/2 ${window.innerWidth < 768?(
          !show
            ? "left-[80%] top-1/2 "
            : " top-[0] left-[0] pt-[50px] pl-[20px] bg-[rgba(0,0,0,.25)] w-screen h-screen"):''
        } `}
        onClick={() => {
          if (window.innerWidth < 768) {
            setShow((prev) => !prev);
            setIsStartChatBot((prev) => !prev)
          }
        }}
      >
        <Contact setIsStartChatBot={setIsStartChatBot} show={show} />
      </div>

      {isStartChatBot && (
        <div className="fixed top-[12%] md:bottom-0 md:top-auto z-10 md:right-[100px] w-full h-full md:w-auto bg-red-500">
          <BoxChat setIsStartChatBot={setIsStartChatBot} />
        </div>
      )}
    </div>
  );
}

export default App;
