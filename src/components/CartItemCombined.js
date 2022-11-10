import { numFormatter } from '../ultils/fn';

const CartItemCombined = ({data}) => {
    const {mainImage,name,quanity,price,variant} = data

  return (
    <div className="w-full flex h-[68px]">
      <div className="h-full flex w-[55%] ">
        <div>
        <img src={mainImage} alt="mainImage" className="object-cover h-full" />
        </div>
        <div>
        <p className=" font-bold">{name}</p>
        <p className="text-sm font-bold">{variant}</p>
        </div>
      </div>
      <div className='text-center w-[15%]'>{quanity}</div>
      <div className='text-right w-[25%]'>{numFormatter(price*quanity)}</div>
    </div>
  );
};
export default CartItemCombined;
