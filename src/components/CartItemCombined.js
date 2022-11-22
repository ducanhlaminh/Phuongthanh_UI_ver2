import { numFormatter } from '../ultils/fn';

const CartItemCombined = ({data}) => {
    const {mainImage,name,quanity,price,variant} = data

  return (
    <div className="w-full flex my-[40px]">
      <div className="h-full flex w-[55%] ">
        <div>
        <img src={mainImage} alt="mainImage" className="object-cover h-[80px] w-[75px] rounded-[8px]" />
        </div>
        <div className='ml-[16px]'>
        <p className=" font-medium lg:text-[16px] md:text-[14px]">{name}</p>
        <p className="lg:text-[16px] md:text-[14px] font-normal">{variant}</p>
        </div>
      </div>
      <div className='text-center w-[15%]'>{quanity}</div>
      <div className='text-right w-[25%]'>{numFormatter(price*quanity)}</div>
    </div>
  );
};
export default CartItemCombined;
