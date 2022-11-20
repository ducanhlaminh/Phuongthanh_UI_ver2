<<<<<<< Updated upstream
function numFormatter(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num); // if value < 1000, nothing to do
}
=======
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceCaculator } from "../ultils/caculator";
import { numFormatter } from "../ultils/fn";
import { BiPlus, BiMinus } from "react-icons/bi";

>>>>>>> Stashed changes
const CartItem = ({
  name,
  image,
  shortDes = "Chistian Dior",
  price = 100000,
  quantity = 5,
}) => {
  return (
    <>
      <div className="my-3 border-b-2 px-3">
        <div className="w-full flex h-[80px]">
          <div className=" w-[50%]">
            <div className="flex h-full ">
              <div className="w-[80px]">
                <img src={image} alt="" className="object-cover h-full" />
              </div>

<<<<<<< Updated upstream
              <div className="p-2 flex flex-col justify-evenly">
                <p className=" font-bold">{name}</p>
                <p className="text-xs">{shortDes}</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <div className="text-xs flex justify-center items-center">
                      <span>Số lượng :</span>
                    </div>
                  </div>
                  <select
                    name=""
                    id=""
                    className="bg-slate-300 text-xs h-[20px]"
                    defaultValue={quantity.toString()}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
=======
                <div className="p-2 flex flex-col justify-around gap-[8px]">
                  <Link
                    to={`/chi-tiet-san-pham/${id}`}
                    className=" font-semibold lg:text-[16px]  md:text-[14px] text-black"
                  >
                    {name}
                  </Link>
                  {/* <p className="text-xs">Đã bán: {soldCounter}</p> */}
                  <div className="inline">
                    {variants.map((variant, i) => {
                      let variantLength = variants.length;
                      return (
                        <div className="text-light text-darkGrey lg:text-[16px] md:text-[12px]">
                          <span>
                            {variant.variant}: {variant.value}
                          </span>
                          <span>{i < variantLength - 1 ? ", " : ""}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-around md:w-[73px] border-[1px] border-primary rounded-[8px] items-center lg:text-[14px] font-normal md:text-[12px] text-black">
                    <BiMinus
                      onClick={() => {
                        if (quanityProduct > 1) {
                          setQuanityProduct((prev) => prev - 1);
                        }
                      }}
                    ></BiMinus>
                    <p>{quanityProduct}</p>
                    <BiPlus
                      onClick={() => {
                        setQuanityProduct((prev) => prev + 1);
                      }}
                    ></BiPlus>
                  </div>
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] text-center">{numFormatter(price)}</div>
          <div className="w-[15%] text-center">{quantity}</div>
          <div className="w-[15%] text-center">
            {numFormatter(price * quantity)}
          </div>
<<<<<<< Updated upstream
        </div>
        <div className="flex justify-end h-[20px] mb-2 font-bold">
          <div className="w-fit flex justify-between">
            <p className=" text-primary border-b-4 border-b-primary pb-5 w-fit cursor-pointer mr-2">
              Add to Wishlist
            </p>
            <p className=" text-red-700 border-b-4 border-b-red-700 pb-5 w-fit cursor-pointer">
              Remove
            </p>
=======
          <div className="flex justify-end h-[20px] mb-2 font-bold">
            <div className="w-fit flex justify-between">
              <p className="text-primary border-b-[1px] font-semibold lg:text-[14px] md:text-[12px] border-b-primary pb-5 w-fit mr-2">
                <input
                  id={idUnique}
                  className="cursor-pointer"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="cursor-pointer" htmlFor={idUnique}>
                  Chọn
                </label>
              </p>
              <p className="text-primary border-b-[1px] border-b-primary font-semibold lg:text-[14px] md:text-[12px] ml-[24px] pb-5 w-fit mr-2 cursor-pointer">
                Yêu thích
              </p>
              <p
                onClick={() => {
                  setIdDelete(cartID);
                  setOpenAlertPopup(true);
                  setIsChecked(false)
                }}
                className=" text-red border-b-[1px] ml-[24px] font-semibold lg:text-[14px] md:text-[12px] border-red pb-5 w-fit cursor-pointer"
              >
                Xóa
              </p>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
