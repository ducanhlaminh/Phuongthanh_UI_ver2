import React, { memo, useState, useEffect } from "react";
import ApiProduct from "../apis/product";
import icons from "../ultils/icons";
import SearchingPopup from "./SearchingPopup";

const { RiSearchLine } = icons;
const Search = () => {
  return (
    <div className="relative">
      <div className="flex-auto flex items-center h-[48px]">
        <span className="pl-2 bg-[#F1F1F1] h-full flex items-center rounded-l-md">
          <RiSearchLine size={24} />
        </span>
        <input
          type="text"
          className="w-full px-5 py-[13px] bg-[#F1F1F1] placeholder:text-gray-800 rounded-r-md outline-none"
          placeholder="Tìm sản phẩm....."
        />
      </div>

      
    </div>
  );
};

export default memo(Search);
