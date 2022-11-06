import React, { useState, useEffect } from "react";
import { menuStatus } from "../../ultils/menu";
import { apiGetBills } from "../../apis/bill2";
import { OrderItem, DetailOrder } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import {Link} from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai";
const Orders = () => {
  const [status, setStatus] = useState("pending");
  const [bills, setBills] = useState([]);
  const dispatch = useDispatch();
  const { detailOrder } = useSelector((state) => state.app);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  //   const handleATC = async (id, variantTypes) => {
  //     try {
  //       let data = {
  //         pid: id,
  //         variant: variantTypes,
  //       };
  //       let res = await ApiCart.create(data);
  //       if (res.status === 0) {
  //         setVariantTypes(new Array(product?.variants.length).fill(null));
  //         setCanAtc(false);
  //         setActiveNotiStatus("success");
  //         setShowPopupCart(false);
  //         setAddToCartSuccess(true);
  //         dispatch(actions.fetchCartQuantity("success"));
  //       } else if (res.status === 1) {
  //         setActiveNotiStatus("warning");
  //         setShowPopupCart(false);
  //         setAddToCartSuccess(true);
  //         dispatch(actions.fetchCartQuantity("warning"));
  //       }
  //     } catch (error) {
  //       setActiveNotiStatus("error");
  //     }
  //   };
  useEffect(() => {
    const fetchBills = async () => {
      const response = await apiGetBills({ status });
      if (response.status === 0) {
        setBills(response.billData?.rows);
      }
    };
    fetchBills();

    return () => {
      dispatch(actions.detailOrder(null));
    };
  }, [status]);

  return (
    <div className="w-full relative h-screen">
      {detailOrder && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white z-50 animate-slide-left">
          <DetailOrder />
        </div>
      )}
      <div className="translate-x-[-16px] text-primary md:hidden">
        <Header>
          <div className="flex justify-between w-[100%]">
            <div className="flex items-center">
              <MdOutlineArrowBackIosNew size="24" />
              <span className="font-semibold text-[20px] text-primary pl-[20px]">
                Hóa đơn của tôi
              </span>
            </div>
            <Link to="/cart"
              className={`relative ${
                addToCartSuccess ? "animate-bounce2" : ""
              }`}
              onAnimationEnd={() => {
                setAddToCartSuccess(false);
              }}
              style={{ "animation-iteration-count": "5" }}
            >
              <AiOutlineShoppingCart size={26} />
              <span className="absolute top-0 right-0 w-[10px] h-[10px] bg-orange-600 rounded-full"></span>
            </Link>
          </div>
        </Header>
      </div>
      <div className="h-[68px] bg-[#f1f1f1] overflow-x-auto rounded-md flex items-center gap-4 px-4">
        {menuStatus.map((item) => (
          <div
            key={item.keyname}
            onClick={() => setStatus(item.value)}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              item.value === status ? "bg-[#1B4B66]  text-white" : ""
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div className="w-full mt-8 ">
        <div className="flex items-center py-2 border-b border-gray-200 px-6 hidden md:flex">
          <span className="flex-1 flex justify-center items-center">
            ID hóa đơn
          </span>
          <span className="flex-1 flex justify-center items-center">
            Ngày tạo
          </span>
          <span className="flex-1 flex justify-center items-center">
            Tổng tiền
          </span>
          <span className="flex-1 flex justify-center items-center">
            Trạng thái
          </span>
        </div>
        <div>
          <p className="font-semibold text-darkGrey text-[14px] mb-[16px]">{bills.length} đơn hàng</p>
        </div>
        <div className="flex flex-col md:py-6 gap-[17px]">
          {bills?.map((item) => (
            <div
              onClick={() => dispatch(actions.detailOrder(item))}
              className="w-full"
              key={item.id}
            >
              <OrderItem
                oid={item.id}
                createAt={item.createAt}
                total={item.totalCost}
                status={item.status}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="md:h-[269px]"></div>
    </div>
  );
};

export default Orders;
