import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HeaderLaptop, Footer } from "../../components";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiHandbagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/";
import { Link, useParams, useNavigate } from "react-router-dom";

const Public = () => {
  const [activeNav, setActiveNav] = useState([1, 0, 0, 0]);
  const dispatch = useDispatch();
  const params = useParams();
  return (
    <div className="flex h-full flex-col w-full max-w-[1280px] m-auto text-sm md:text-base bg-white text-black">
      <div className="hidden md:block w-full h-[80px]">
        <HeaderLaptop />
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
      <div className="flex-none hidden md:block">
        <Footer />
      </div>
      {(params["*"] === "" ||
        params["*"] === "gian-hang" ||
        params["*"] === "tai-khoan") && (
        <div className="flex-none md:hidden z-50">
          <ButtonFooterContainer>
            <Link
              to="/"
              className={`flex flex-col justify-center items-center text-primary ${
                activeNav[0] === 1 ? "text-primary" : "text-darkGrey-tint"
              } transition-all`}
              onClick={() => {
                setActiveNav([1, 0, 0, 0]);
              }}
            >
              <BiHomeAlt size="24px" />
              {activeNav[0] === 1 && (
                <p className={`text-[12px] font-medium leading-4`}>Trang chủ</p>
              )}
            </Link>
            <Link
              to="/gian-hang"
              className={`flex flex-col justify-center items-center text-primary ${
                activeNav[1] === 1 ? "text-primary" : "text-darkGrey-tint"
              } transition-all`}
              onClick={() => {
                setActiveNav([0, 1, 0, 0]);
              }}
            >
              <HiOutlineViewGrid size="24px" />
              {activeNav[1] === 1 && (
                <p className={`text-[12px] font-medium leading-4`}>Gian hàng</p>
              )}
            </Link>
            <Link
              to="/tai-khoan"
              className={`flex flex-col justify-center items-center text-primary ${
                activeNav[2] === 1 ? "text-primary" : "text-darkGrey-tint"
              } transition-all`}
              onClick={() => {
                setActiveNav([0, 0, 1, 0]);
              }}
            >
              <MdOutlinePersonOutline size="24px" />
              {activeNav[2] === 1 && (
                <p className={`text-[12px] font-medium leading-4`}>Tài khoản</p>
              )}
            </Link>
            <Link
              to="/cart"
              className={`flex flex-col justify-center items-center text-primary ${
                activeNav[3] === 1 ? "text-primary" : "text-darkGrey-tint"
              } transition-all`}
              onClick={() => {
                setActiveNav([0, 0, 0, 1]);
              }}
            >
              <RiHandbagLine size="24px" />
              {activeNav[3] === 1 && (
                <p className={`text-[12px] font-medium leading-4`}>Giỏ hàng</p>
              )}
            </Link>
          </ButtonFooterContainer>
        </div>
      )}
    </div>
  );
};

export default Public;
