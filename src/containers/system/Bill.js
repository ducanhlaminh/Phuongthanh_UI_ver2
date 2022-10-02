import React from "react";
import { Button } from "../../components/Button";
import image from "../../assets/temp.png";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import ApiBill from "../../apis/bill";
import {
  InputCustomWidth,
  SelectCustomWidth,
} from "../../components/InputCtWidth";
import { BillComponnets } from "../../components/BillComponent";
import { Profile } from "../../components/Modal"

const Bill = () => {
  const [addAll, setAddAll] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ApiBill.getAll();
      const bills = res.data.bills;

      setBills(bills);
    };
    fetchProducts();
  }, []);
  if (addAll) {
    const checkboxs = [...document.querySelectorAll(".checkbox")];
    checkboxs?.map((checkbox) => {
      checkbox.checked = "checked";
    });
  } else {
    const checkboxs = [...document.querySelectorAll(".checkbox")];
    checkboxs?.map((checkbox) => {
      checkbox.checked = false;
    });
  }

  const renderBillsList = bills?.map((bill, i) => {
    return (
      <BillComponnets bill={bill} i={i} setIsShow={setIsShow} isShow={isShow} />
    );
  });
  return (
    <>
      <h1 className="text-3xl">Hóa Đơn</h1>

      <div className="flex items-center bg-[#d9d9d9] rounded justify-between p-5">
        <div className="flex justify-between w-[80%] h-[40px]">
          <div className="flex items-center w-[50%] ">
            <InputCustomWidth widthP="full" />
          </div>
          <div className="w-[10%] h-full flex items-center">
            <FiSearch className="ml-2 cursor-pointer text-2xl hover:text-gray-500" />
          </div>
          <div className="w-[40%] ">
            <SelectCustomWidth
              widthP="full"

              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#d9d9d9] p-5 rounded-[10px] mt-5">
        <div className="flex pb-5">
          <div className="w-[5%] flex justify-center font-bold text-2xl">
            Id
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Email
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Địa chỉ
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Sđt
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tổng hóa đơn
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Trang thai
          </div>
        </div>
        {renderBillsList}

      </div>
    </>
  );
};

export default Bill;


