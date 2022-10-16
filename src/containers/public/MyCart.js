import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import ApiCart from "../../apis/cart";
import { useEffect } from "react";
import { Slider as SliderImage } from "../../components";
import CartItem from "../../components/CartItem";
function numFormatter(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num); // if value < 1000, nothing to do
}
const data = {
  pids: [
    "017a880b-c9b8-4f67-b22a-e63b9cfaa81a",
    "0751bc12-2430-4a43-be71-67fc738f5215",
  ],
};
function MyCart() {
  useEffect(() => {
    ApiCart.get();
  }, []);

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden h-screen">
        <AppBar title="My Cart" />
        <div className="w-full pt-[56px] flex flex-col px-2  bg-[#eeeeeefc] h-[70%] overflow-auto">
          <div className="w-full bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
            <div className="flex h-[120px]">
              <img
                src="https://centimet.vn/wp-content/uploads/1-7.jpg"
                alt=""
                className="object-cover"
              />
              <div className="p-2 flex flex-col justify-around">
                <b className="text-base">Dior Bag</b>
                <p>Chiisrtan Dior</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <span className="text-xs">Số lượng :</span>
                  </div>
                  <select name="" id="" className="bg-slate-300 font-bold">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">120.000đ</span>
                </div>
              </div>
            </div>
            <div className="flex h-[40px] border-t-2 font-bold text-primary">
              <div className="border-r-2 w-1/2 flex justify-center items-center ">
                <span>Thêm</span>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <span>Xóa</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
            <div className="flex h-[120px]">
              <img
                src="https://centimet.vn/wp-content/uploads/1-7.jpg"
                alt=""
                className="object-cover"
              />
              <div className="p-2 flex flex-col justify-around">
                <b className="text-base">Dior Bag</b>
                <p>Chiisrtan Dior</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <span className="text-xs">Số lượng :</span>
                  </div>
                  <select name="" id="" className="bg-slate-300 font-bold">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">120.000đ</span>
                </div>
              </div>
            </div>
            <div className="flex h-[40px] border-t-2 font-bold text-primary">
              <div className="border-r-2 w-1/2 flex justify-center items-center ">
                <span>Thêm vào yêu thích</span>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <span>Xóa</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
            <div className="flex h-[120px]">
              <img
                src="https://centimet.vn/wp-content/uploads/1-7.jpg"
                alt=""
                className="object-cover"
              />
              <div className="p-2 flex flex-col justify-around">
                <b className="text-base">Dior Bag</b>
                <p>Chiisrtan Dior</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <span className="text-xs">Số lượng :</span>
                  </div>
                  <select name="" id="" className="bg-slate-300 font-bold">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">120.000đ</span>
                </div>
              </div>
            </div>
            <div className="flex h-[40px] border-t-2 font-bold text-primary">
              <div className="border-r-2 w-1/2 flex justify-center items-center ">
                <span>Thêm vào yêu thích</span>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <span>Xóa</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
            <div className="flex h-[120px]">
              <img
                src="https://centimet.vn/wp-content/uploads/1-7.jpg"
                alt=""
                className="object-cover"
              />
              <div className="p-2 flex flex-col justify-around">
                <b className="text-base">Dior Bag</b>
                <p>Chiisrtan Dior</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <span className="text-xs">Số lượng :</span>
                  </div>
                  <select name="" id="" className="bg-slate-300 font-bold">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">120.000đ</span>
                </div>
              </div>
            </div>
            <div className="flex h-[40px] border-t-2 font-bold text-primary">
              <div className="border-r-2 w-1/2 flex justify-center items-center ">
                <span>Thêm vào yêu thích</span>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <span>Xóa</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" px-8 py-6 h-1/5">
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
        <div className="h-[10%] bg-[#eeeeeefc] flex items-center p-3 justify-between ">
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
          <SliderImage />

          <div className=" w-full lg:block px-6 ">
            <h2 className=" text-3xl font-extrabold">My Cart</h2>
            <div className="flex justify-between">
              <div className="w-[60%] ">
                <div className="flex font-bold text-gray-500 border-b-2 items-center p-2">
                  <p className="w-[50%]">Tên sản phẩm</p>
                  <p className="w-[20%] text-center">Giá</p>
                  <p className="w-[15%] text-center">Số lượng</p>
                  <p className="w-[15%] text-center">Tổng</p>
                </div>
                <div className=" overflow-auto h-[300px] scroll-smooth">
                  {/* product */}
                  <CartItem />
                </div>
              </div>
              <div className="w-1/3">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
