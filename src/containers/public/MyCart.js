import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { TotalPriceCaculator } from "../../ultils/caculator";
import AlertPopup from "../../triggercompoents/AlertPopup";
import { numFormatter } from "../../ultils/fn";

function MyCart() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkedList, setCheckedList] = useState([])
  const [quanityList, setQuanityList] = useState([])
  const [openAlertPopup, setOpenAlertPopup] = useState(false)
  const [idDelete, setIdDelete] = useState(null)

  const dispatch = useDispatch();
  const { productsCart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(actions.addToCart());
  }, []);


  useEffect(() => {
    if(checkedList.length !== 0 && quanityList.length !== 0 && productsCart){
     let tmpPrice =  TotalPriceCaculator(productsCart,checkedList,quanityList)
     setTotalPrice(tmpPrice)
    }else{
      setTotalPrice(0)
    }
  },[checkedList,quanityList])


  return (
    <>
      {/* Mobile */}
      <div className="md:hidden h-screen">
        <AppBar title="My Cart" />
        <div className="w-full pt-[56px] flex flex-col px-2  bg-[#eeeeeefc] h-[70%] overflow-auto">
          {/* product */}
          {productsCart?.map((product) => (
            <CartItem
              product={product?.productData}
              variants={product?.variant}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              setQuanityList={setQuanityList}
              quanityList={quanityList}
              setOpenAlertPopup={setOpenAlertPopup}
              setIdDelete={setIdDelete}
            />
          ))}
        </div>
        <div className="min-h-[200px] ">
          <p className="text-base font-bold p-2 border-b-2">
            Thông tin hóa đơn
          </p>

          <div className="flex justify-between font-bold text-gray-500 p-3 border-b-2">
            <div className="w-1/2 ">
              <p>Sub total : </p>
              <p>Delivery Fee : </p>
              {/* <p className="font-bold text-black">Grand Total : </p> */}
            </div>
            <div className="w-1/3  text-black text-center">
              <p>{numFormatter(100000)}</p>
              <p>{numFormatter(100000)}</p>

              {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
            </div>
          </div>
          <div className="flex justify-between font-bold text-gray-500 p-3">
            <div className="w-1/2 ">
              <p className="font-bold text-black">Grand Total : </p>
            </div>
            <div className="w-1/3  text-black text-center">
              <p className="font-extrabold">{numFormatter(100000)}</p>
            </div>
          </div>
        </div>
        <div className="max-[80px] bg-[#eeeeeefc] flex items-center p-3 justify-between ">
          <div className="flex flex-col items-center">
            <p className="font-bold">Total Bag Amount : </p>
            <p>{numFormatter(100000)}</p>
          </div>
          <div className="w-1/2">
            <Button2 text="Place Order" />
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="md:block hidden w-full ">
        <div className="py-6 mb-6 flex flex-col gap-8 ">
          {/* <SliderImage /> */}
          <div className=" w-full md:block px-6 ">
            <h2 className=" text-3xl font-extrabold">Giỏ hàng của tôi</h2>
            <div className="flex justify-between">
              <div className="w-[60%] ">
                <div className="flex font-bold text-gray-500 border-b-2 items-center p-2">
                  <p className="w-[50%]">Tên sản phẩm</p>
                  <p className="w-[20%] text-center">Giá</p>
                  <p className="w-[15%] text-center">Số lượng</p>
                  <p className="w-[15%] text-center">Tổng</p>
                </div>
                <div className=" overflow-auto h-[560px] scroll-smooth">
                  {/* product */}
                  {productsCart?.map((product) => (
                    <CartItem
                      product={product?.productData}
                      variants={product?.variant}
                      checkedList={checkedList}
                      setCheckedList={setCheckedList}
                      setQuanityList={setQuanityList}
                      quanityList={quanityList}
                      setOpenAlertPopup={setOpenAlertPopup}
                      setIdDelete={setIdDelete}
                    />
                  ))}
                </div>
              </div>
              <div className="w-1/3">
                <p className="text-base font-bold p-2 border-b-2">
                  Thông tin hóa đơn
                </p>

                <div className="flex justify-between font-bold text-gray-500 p-3 border-b-2">
                  <div className="w-1/2 ">
                    <p>Tổng hóa đơn : </p>
                    {/* <p className="font-bold text-black">Grand Total : </p> */}
                  </div>
                  <div className="w-1/3  text-black text-right">
                    <p>{numFormatter(totalPrice)}</p>
                    {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                  </div>
                </div>
                <div className="flex justify-between font-bold text-gray-500 p-3">
                  <div className="w-1/2 ">
                    <p className="font-bold text-black">Thanh toán : </p>
                  </div>
                  <div className="w-1/3  text-black text-right">
                    <p className="font-extrabold">{numFormatter(totalPrice)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertPopup 
        open={openAlertPopup}
        setOpen={setOpenAlertPopup}
        idDelete={idDelete}
      />
    </>
  );
}

export default MyCart;
