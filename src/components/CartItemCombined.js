import { numFormatter } from '../ultils/fn';

const CartItemCombined = ({data}) => {
    const {mainImage,name,quanity,price} = data

  return (
      <div className="my-3 hidden md:block border-b-2 px-3">
        <div className="w-full flex h-[80px]">
          <div className=" w-[50%]">
            <div className="flex h-full ">
              <div className="w-[80px]">
                <img src={mainImage} alt="" className="object-cover h-full" />
              </div>

              <div className="p-2 flex flex-col justify-evenly">
                <p className=" font-bold">{name}</p>
                <div className="flex bg-slate-300 p-1 rounded-sm w-fit">
                  <div className="flex justify-center items-center">
                    <div className="text-xs flex justify-center items-center">
                      <span>Số lượng :</span>
                    </div>
                  </div>
                <span>{quanity}</span>
              </div>
            </div>
          </div>

          <div className="w-[20%] text-center">{numFormatter(price)}</div>
          <div className="w-[15%] text-center">{quanity}</div>
          <div className="w-[15%] text-center">
            {numFormatter(price*quanity)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItemCombined;
