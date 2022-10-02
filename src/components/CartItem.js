import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {useEffect } from "react"
const CartItem = ({id, image, name, cost, quantity, setTotalPayment, isChecked, addQuantity, minusQuantity, i }) => {
    let newCost = quantity * cost;
    useEffect(() => {
        isChecked ? setTotalPayment((prev) => { return prev + newCost }) : setTotalPayment((prev) => { return prev - newCost });
    }, [isChecked])
    const adjustQuantity = (<div className="flex text-[#8c8c8c] border-[1px] border-[#8c8c8c] rounded-[6px] p-[4px] text-[12px] items-center justify-between lg:justify-around">
        <div onClick={() => {
            minusQuantity(i,id);
            if (isChecked) setTotalPayment((prev) => { return prev - cost })
        }}>
            <AiOutlineMinus></AiOutlineMinus>
        </div>
        <p className="lg:text-[15px]">{quantity}</p>
        <div onClick={() => {
            addQuantity(i,id);
            if (isChecked) setTotalPayment((prev) => { return prev + cost })
        }}>
            <AiOutlinePlus></AiOutlinePlus>
        </div>
    </div>)
    return (
        <div className='flex items-center justify-around [&:not(:last-child)]:mb-[10px]'>
            <div className='w-[15%]'>
                <img src={image} alt='hi' className='h-[58px] w-[50px] rounded-[3px] lg:h-[80px] lg:w-[72px]'></img>
            </div>
            <div className='w-[50%]'>
                <p className='font-medium text-[10px] lg:text-[18px] text-[#404040]'>{name}</p>
            </div>
            <div className='w-[15%]'>
                {adjustQuantity}
            </div>
            <div className='text-center '>
                <p className='font-extrabold text-[12px] text-[#404040] lg:text-[20px]'>{`${newCost} đ`}</p>
            </div>
        </div>
    );
}

export const PaymentItem = ({ image, name, cost, quantity, setTotalPayment }) => {
    const adjustQuantity = (<div className="flex text-[#8c8c8c] border-[1px] border-[#8c8c8c] rounded-[6px] p-[4px] text-[12px] items-center justify-center">
        <p className='lg:text-[15px]'>{quantity}</p>
    </div>)
    return (
        <div className='flex items-center justify-around [&:not(:last-child)]:mb-[10px]'>
            <div className='w-[15%]'>
                <img src={image} alt='hi' className='h-[58px] w-[50px] rounded-[3px] lg:h-[80px] lg:w-[72px]'></img>
            </div>
            <div className='w-[50%]'>
                <p className='font-medium text-[10px] lg:text-[18px] text-[#404040]'>{name}</p>
            </div>
            <div className='w-[15%]'>
                {adjustQuantity}
            </div>
            <div className='text-center '>
                <p className='font-extrabold text-[12px] text-[#404040] lg:text-[20px]'>{`${cost} đ`}</p>
            </div>
        </div>
    );
}
export default CartItem;