import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderLaptop, Footer } from "../../components";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiHandbagLine } from "react-icons/ri";

const Public = () => {
  return (
    <div className="flex flex-col w-full max-w-[1280px] m-auto text-sm md:text-base bg-white text-black">
      <div className="hidden md:block w-full h-[80px]">
        <HeaderLaptop />
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
      <div className="flex-none hidden lg:block">
        <Footer />
      </div>
      <div className="flex-none lg:hidden">
        <ButtonFooterContainer>
          <div className="flex flex-col justify-center items-center text-primary">
            <BiHomeAlt size='24px'/>
            <p className="text-[12px] font-medium leading-4">Trang chủ</p>
          </div>
          <div className="flex flex-col justify-center items-center text-primary">
            <HiOutlineViewGrid size='24px'/>
            <p className="text-[12px] font-medium leading-4">Gian hàng</p>
          </div>
          <div className="flex flex-col justify-center items-center text-primary">
            <MdOutlinePersonOutline size='24px'/>
            <p className="text-[12px] font-medium leading-4">Tài khoản</p>
          </div>
          <div className="flex flex-col justify-center items-center text-primary">
            <RiHandbagLine size='24px'/>
            <p className="text-[12px] font-medium leading-4">Giỏ hàng</p>
          </div>
        </ButtonFooterContainer>
      </div>
    </div>
  );
};

export default Public;
