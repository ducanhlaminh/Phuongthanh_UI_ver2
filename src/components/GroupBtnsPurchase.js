import icons from "../ultils/icons";


const { AiOutlineShoppingCart, BiPurchaseTag } = icons
export const GroupBtnsPurchase = ({device}) => {
    return (
        <div className={`${device==='mobile'?'relative lg:hidden':'hidden lg:relative'} w-[85%] h-[30px] mx-auto my-[20px`}>
                <div className="absolute left-0 bg-sky-400 text-[#fff] rounded-[24px] cursor-pointer p-[12px] text-md  font-bold">
                    Thêm vào giỏ hàng
                    <AiOutlineShoppingCart className="inline" size={26} />
                </div>
                <div className="absolute right-0 bg-[#ff424e] text-[#fff] rounded-[24px] cursor-pointer p-[12px] text-md  font-bold">
                    Mua hàng
                    <BiPurchaseTag className="inline" size={26} />
                </div>
        </div>
    );
}
