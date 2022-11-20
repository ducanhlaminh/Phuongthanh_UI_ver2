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
<<<<<<< Updated upstream
import { BillComponnets } from "../../components/BillComponent";
import { Profile } from "../../components/Modal"

=======
import { Profile } from "../../components/Modal";
import Button from "../../components/Button";
import { NotiStatus } from "../../components/UploadStatus";
import { filtersBill, statusFilter } from "../../ultils/constant";
import { Pagination } from "@mui/material";
import { LoadingPageDesktop } from "../../components/LoadingPage";
>>>>>>> Stashed changes
const Bill = () => {
  const [bills, setBills] = useState([]);
  const [options, setOptions] = useState([]);
<<<<<<< Updated upstream
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
=======
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [isShow, setIsShow] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const [selectFilter, setSelectFilter] = useState(filtersBill[0]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusFilter[0].code);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const filter = Object.values(selectFilter.sort);
        let payload = {
          order: [...filter],
          limit: 7,
          page: page,
        };
        if (selectedStatus === "") {
          payload = {
            order: [...filter],
            limit: 7,
            page: page,
          };
        } else {
          payload = {
            order: [...filter],
            limit: 7,
            page: page,
            status: selectedStatus,
          };
        }
        const res = await ApiBill.getAll(payload);
        const bills = res.billData.rows;
        setBills((prev) => bills);
        setCount(res.billData.count);
        setLoading(false);
      };
      fetchProducts();
    } catch (error) {
      setLoading(true);
    }
  }, [showUpload, selectFilter, selectedStatus]);

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
>>>>>>> Stashed changes
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

      <h1 className="text-3xl">Hóa Đơn</h1>

      <div className="flex items-center bg-[#d9d9d9] rounded justify-between p-5 ">
        {showUpload && (
          <NotiStatus
            active={showUpload}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Xóa sản phẩm thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        )}
        <div className="flex justify-between w-full h-[40px]">
          <div className="flex items-center w-[50%] ">
            <InputCustomWidth widthP="full" />
          </div>
          <div className="w-[10%] h-full flex items-center">
            <FiSearch className="ml-2 cursor-pointer text-2xl hover:text-gray-500" />
          </div>
          <div className="w-[30%] ">
            <SelectCustomWidth
              widthP="full"
              options={filtersBill}
              selectValue={selectFilter}
              setSelectValue={setSelectFilter}
              onChange={setBills}
            />
          </div>
          <div className="w-[30%] ">
            <SelectCustomWidth
              widthP="full"
<<<<<<< Updated upstream

              selectValue={selectValue}
              setSelectValue={setSelectValue}
=======
              options={statusFilter}
              selectValue={selectedStatus}
              setSelectValue={setSelectedStatus}
              onChange={setBills}
>>>>>>> Stashed changes
            />
          </div>
        </div>
      </div>

      <div className="bg-[#d9d9d9] p-5 rounded-[10px] mt-5 h-[525px]">
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
<<<<<<< Updated upstream
        {renderBillsList}

=======
        <div className="h-4/5 overflow-auto relative">
          {bills === null ? <LoadingPageDesktop /> : renderBillsList}
        </div>
        <div className="flex justify-center w-full">
          <Pagination
            count={Math.ceil(count / 7)}
            color="primary"
            size="large"
            page={page}
            onChange={handleChangePage}
          />
        </div>
>>>>>>> Stashed changes
      </div>
    </>
  );
};

export default Bill;


