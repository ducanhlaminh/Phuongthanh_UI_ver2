import DownPopup from "../components/DownPopup";
import LongButton from "../components/LongButton";
import icons from "../ultils/icons";

const {AiFillStar, IoIosArrowForward, RiHandbagLine} = icons 

const SelectvariantPopup = ({setShowPopupCart, showPopupCart, product, setShowPopupReview, comments}) => {
    const handlePickVariants = (variant,value) => {
        console.log(variant,value)
    }
    return(<DownPopup setShowPopup={setShowPopupCart} showPopup={showPopupCart}>
            <div className="flex gap-[16px]">
              <div>
                <img
                  src={product?.mainImage}
                  className="w-[74px] h-[74px] rounded-[8px]"
                  alt="anh san pham"
                />
              </div>
              <div className="">
                <p className="font-semibold text-xs text-black">
                  {product.name}
                </p>
                <p className="font-medium text-xs text-darkGrey mt-[2px] mb-[4px]">
                  This is short description
                </p>
                <p className="font-semibold text-sm text-black">
                  đ{Number(product.costPerUnit?.toFixed(1))?.toLocaleString()}
                </p>
              </div>
            </div>
            <div
              className="flex my-[24px]"
              onClick={() => {
                setShowPopupCart(false);
                setShowPopupReview(true);
              }}
            >
              <div className="flex items-center w-[74px] h-[38px] bg-[#f4f4f4] rounded-[4px] justify-center mr-[14px]">
                <p className="text-[#171520] text-[16px] leading-4 font-semibold mr-[4px]">
                  {product.scores}
                </p>
                <AiFillStar className="text-[#FF8C4B]" size="20px" />
              </div>
              <div>
                <p className="text-[#171520] text-[14px] font-semibold leading-5">
                  Lượt đánh giá
                </p>
                <div className="text-[#626262] text-[14px] font-medium leading-5">
                  <span>{product.votedCounter} Đánh giá và </span>
                  <span>{comments?.count} bình luận</span>
                </div>
              </div>

              <div className="ml-auto">
                <IoIosArrowForward
                  className="text-darkGrey justify-self-end"
                  size="30"
                ></IoIosArrowForward>
              </div>
            </div>

            <div>
              {product&&JSON.parse(product?.variants).map((variant) => {
                return (
                  <div>
                    <p className="text-xm font-semibold text-black">
                      {variant?.name}
                    </p>
                    <div className="flex mt-[10px] gap-[9px] font-bold text-black text-base">
                      {variant?.value.map((value) => (
                        <div 
                        onClick={(e) => console.log(e.target.className)}
                        className="p-[8px] border-[2px] border-darkGrey-tint rounded-[8px]">
                          {value.type}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-[30px] pb-[11px]">
              <LongButton width="90%" backgroundColor="#1B4B66" color="white" height='44px'>
                <RiHandbagLine />
                <p>Thêm vào giỏ</p>
              </LongButton>
            </div>
          </DownPopup>)
}

export default SelectvariantPopup