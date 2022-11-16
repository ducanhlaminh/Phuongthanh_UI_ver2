import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import ApiBill from "../../apis/bill";
import {
  InputCustomWidth,
  SelectCustomWidth,
} from "../../components/InputCtWidth";
import { BillComponnets } from "../../components/BillComponent";
import { Profile } from "../../components/Modal";
import Button from "../../components/Button";
import { NotiStatus } from "../../components/UploadStatus";

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [options, setOptions] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [isShow, setIsShow] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ApiBill.getAll();
      const bills = res.billData.rows;
      setBills(bills);
    };
    fetchProducts();
  }, []);
  const renderBillsList = bills?.map((bill, i) => {
    const address = JSON.parse(bill.addressData.address);
    return (
      <>
        <div
          key={bill?.id}
          className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px]  text-xl "
        >
          <div className="w-[5%] flex justify-center">{i + 1}</div>

          <div className="w-[20%] flex justify-center">
            <p>{bill?.addressData?.name}</p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p>{`${address?.province} - ${address?.district} - ${address?.ward}`}</p>
          </div>
          <div className="w-[15%] flex justify-center">
            <p>{bill?.addressData?.phone}</p>
          </div>
          <div className="flex w-[20%] justify-around ">
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(bill?.totalCost)}
          </div>
          <div className="w-[20%] flex justify-center">
            <Button
              text="Xem chi tiet"
              bgColor="#4ed14b"
              textColor="#fff"
              width="80%"
              height="3"
              onClick={() => {
                setSelectedBill(bill);
                setIsShow(true);
              }}
            ></Button>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {isShow && (
        <Profile
          isShow={isShow}
          setIsShow={setIsShow}
          billCurrent={selectedBill}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          contentUpload={contentUpload}
        />
      )}
      {showUpload && (
        <div className="absolute self-start w-full flex justify-center">
          <NotiStatus
            active={showUpload}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Xóa sản phẩm thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        </div>
      )}
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
            ID
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tên người nhận
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Địa chỉ
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Số điện thoại
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tổng hóa đơn
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Trạng thái
          </div>
        </div>
        {renderBillsList}
      </div>
    </>
  );
};

export default Bill;
