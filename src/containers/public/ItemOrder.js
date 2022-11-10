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
        <div className="w-screen h-screen md:hidden">
          <div className="text-primary ">
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

          <div className="px-[16px] bg-white pb-[16px] ">
            <div className="bg-lightGrey p-[16px] rounded-[8px] flex flex-col gap-[18px] ">
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
          <div className="px-[16px] bg-white mt-[8px] py-[24px] ">
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
          <div className="px-[16px] bg-white mt-[8px] py-[24px] ">
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

      {detailBill && (
        <div className="hidden md:block mt-[36px]">
          <div className="text-[26px] font-semibold text-primary pl-[24px]">
            <p>
              Đơn hàng{" "}
              <span className="">{`#${detailBill.id
                ?.replace(/\D/g, "")
                ?.slice(0, 9)}`}</span>
            </p>
          </div>

          <div className="flex items-center py-2 border-b border-gray-200 md:text-[14px] text-darkGrey lg:text-[16px] px-6 hidden md:flex mt-[24px] mb-[16px]">
            <span className="flex-1 flex justify-start items-center">
              Tên sản phẩm
            </span>
            <span className="flex-2 flex justify-start ml-[10px] items-center">
              Giá mỗi sản phẩm
            </span>
            <span className="flex-3 flex justify-start ml-[10px] items-center">
              Số lượng
            </span>
            <span className="flex-2 flex justify-start ml-[10px] items-center">
              Giá tạm tính
            </span>
          </div>

          <div className="">
            {productBill?.map((product, i) => (
              <div className="flex items-center py-2 md:text-[14px] text-darkGrey lg:text-[16px] px-6 hidden md:flex [&:not(:last-child)]:mb-[16px]">
                <span className="flex-1 flex justify-start items-start">
                  <div>
                    <img
                      src={product?.products?.mainImage}
                      className="lg:w-[75px] lg:h-[80px] md:w-[60px] md:h-[63px] object-fit rounded-[8px] mr-[16px]"
                    ></img>
                  </div>
                  <div>
                    <p className="font-medium md:text-[14px] lg:text-[16px] text-black leading-4">
                      {product?.products?.name}
                    </p>
                    <p className="font-light md:text-[14px] lg:text-[16px] text-black">
                      {product?.products?.name}
                    </p>
                  </div>
                </span>
                <span className="flex-2 flex justify-start ml-[10px] items-center">
                  {product?.cost}
                </span>
                <span className="flex-3 flex justify-start ml-[10px] items-center">
                  {product?.qty}
                </span>
                <span className="flex-2 flex justify-start ml-[10px] items-center">
                  {product?.qty * product?.cost}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center py-2 border-b border-gray-200 md:text-[16px] font-semibold text-black lg:text-[20px] px-6 hidden md:flex mt-[40px] mb-[13px]">
            <span className="flex-1 flex justify-start items-center ">
              Thông tin đơn hàng
            </span>
          </div>
          <div className="flex pl-[24px] mb-[24px]">
            <div className="flex flex-1 flex-col gap-[12px]">
              <div>
                <p className="md:text-[14px] lg:text-[16px] font-medium text-darkGrey">Chi tiết đơn hàng</p>
              </div>
              <div className="flex justify-between items-center ">
                <p className="text-black font-medium text-[14px]">
                  Giá tạm tính
                </p>
                <p className="text-medium text-[14px] text-black ">
                  đ{Number(detailBill?.totalCost.toFixed(1)).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <p className="text-black font-medium text-[14px]">
                  Phí vận chuyển
                </p>
                <p className="text-medium text-[14px] text-black">
                  đ{Number(detailBill?.shipPrice.toFixed(1)).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-black font-medium text-[14px]">
                  Giảm giá
                </p>
                <p className="text-medium text-[14px] text-black">đ0</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-black font-semibold text-[16px]">Tổng giá</p>
                <p className="text-semibold text-[16px] text-black">
                  đ
                  {Number(
                    (detailBill?.totalCost + detailBill?.shipPrice).toFixed(1)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
            <></>
            <div className=" flex-1 bg-white ml-[16px]">
              <p className="text-[14px] lg:text-[16px] text-darkGrey font-semibold mb-[10px]">
                Địa chỉ
              </p>
              <div className="flex flex-col gap-[8px]">
                <div>
                  <p className="text-black font-medium md:text-[14px] lg:text-[16px]">
                    {detailBill?.addressData?.name}
                  </p>
                </div>
                <div>
                  <p className="text-black font-medium md:text-[14px] lg:text-[16px]">
                    {detailBill?.addressData?.address}
                  </p>
                </div>
                <div>
                  <p className="text-black font-medium md:text-[14px] lg:text-[16px]">
                    {detailBill?.addressData?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ItemOrder;
