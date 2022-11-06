import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { apiGetProductsOfBill2, apiGetBills } from "../../apis/bill2";
import moment from "moment";
import "moment/locale/vi";
import BillItem from "../../components/BillItem";

const ItemOrder = () => {
  const [productBill, setProductBill] = useState();
  const [detailBill, setDetailBill] = useState();
  const [status, setStatus] = useState("");
  console.log(productBill);
  const id = useParams().id;
  useEffect(() => {
    const fetchDetailBill = async () => {
      const res = await apiGetBills();
      setDetailBill(
        ...res?.billData?.rows?.filter((row) => {
          return row?.id === id;
        })
      );
    };
    const fetchProductBill = async () => {
      const res = await apiGetProductsOfBill2(id);
      setProductBill(res.billData);
    };
    fetchDetailBill();
    fetchProductBill();
  }, []);
  useEffect(() => {
    if (detailBill?.status === "pending") {
      setStatus("Đang gói hàng");
    } else if (detailBill?.status === "shipping") {
      setStatus("Đang vận chuyển");
    } else if (detailBill?.status === "completed") {
      setStatus("Giao thành công");
    } else setStatus("Đã hủy");
  }, [detailBill?.status]);
  return (
    <>
      {detailBill && (
        <div className="w-screen h-screen">
          <div className="text-primary">
            <Header>
              <div className="flex justify-between w-[100%]">
                <div className="flex items-center">
                  <MdOutlineArrowBackIosNew size="24" />
                  <span className="font-semibold text-[20px] text-primary pl-[20px]">
                    Chi tiết đơn hàng
                  </span>
                </div>
              </div>
            </Header>
          </div>

          <div className="px-[16px] bg-white pb-[16px]">
            <div className="bg-lightGrey p-[16px] rounded-[8px] flex flex-col gap-[18px]">
              <p className="text-black font-medium text-[16px]">
                Đơn hàng{" "}
                <span>{`#${detailBill?.id
                  ?.replace(/\D/g, "")
                  ?.slice(0, 9)}`}</span>{" "}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-darkGrey font-medium text-[12px]">
                    Ngày đặt
                  </p>
                  <p className="text-black font-medium text-[14px]">
                    {moment(detailBill?.createAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <p className="text-white font-medium text-[12px] bg-primary px-[12px] py-[8px] rounded-[8px]">
                  {status}
                </p>
              </div>
            </div>
            <div>
              <p className="mt-[24px] mb-[16px]">
                {productBill?.length} sản phẩm
              </p>
              <div>
                {productBill?.map((product, i) => (
                  <BillItem
                    key={i}
                    name={product?.products?.name}
                    image={product?.products?.mainImage}
                    qty={product?.qty}
                    cost={product?.cost}
                  ></BillItem>
                ))}
              </div>
            </div>
          </div>
          <div className="px-[16px] bg-white mt-[8px] py-[24px]">
            <p className="text-[14px] text-darkGrey font-semibold mb-[10px]">
              Chi tiết đơn hàng
            </p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between items-center">
                <p className="text-darkGrey font-medium text-[14px]">
                  Giá tạm tính
                </p>
                <p className="text-medium text-[14px] text-black">
                  đ{Number(detailBill?.totalCost.toFixed(1)).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-darkGrey font-medium text-[14px]">
                  Phí vận chuyển
                </p>
                <p className="text-medium text-[14px] text-black">
                  đ{Number(detailBill?.shipPrice.toFixed(1)).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-darkGrey font-medium text-[14px]">
                  Giảm giá
                </p>
                <p className="text-medium text-[14px] text-black">đ0</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-black font-medium text-[16px]">Tổng giá</p>
                <p className="text-semibold text-[16px] text-black">
                  đ
                  {Number(
                    (detailBill?.totalCost + detailBill?.shipPrice).toFixed(1)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="px-[16px] bg-white mt-[8px] py-[24px]">
            <p className="text-[14px] text-darkGrey font-semibold mb-[10px]">
              Địa chỉ
            </p>
            <div className="flex flex-col gap-[8px]">
              <div>
                <p className="text-black font-semibold text-[14px]">
                  {detailBill?.addressData?.name} 
                </p>
              </div>
              <div>
                <p className="text-darkGrey font-medium text-[14px]">
                  {detailBill?.addressData?.address}
                </p>
              </div>
              <div>
                <p className="text-darkGrey font-medium text-[14px]">
                  {detailBill?.addressData?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ItemOrder;
