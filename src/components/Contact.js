import React from 'react'
import { memo } from 'react'
import { BsMessenger } from 'react-icons/bs'
import zalo from '../assets/zalo.png'

const Contact = () => {
    return (
        <div className='flex flex-col items-end justify-center gap-12'>
            <a href='https://m.me/paunchyboy06' target='_blank' className='relative flex justify-center items-center'>
                <div className='w-[80px] h-[80px] border-2 rounded-full top-[-25px] animate-bounce absolute border-blue-600 bg-transparent'></div>
                <BsMessenger size={30} color='blue' />
            </a>
            <a href='https://zalo.me/0839819860' target='_blank' className='relative flex justify-center items-center'>
                <div className='w-[80px] h-[80px] border-2 rounded-full top-[-25px] animate-bounce absolute border-blue-600 bg-transparent'></div>
                <img src={zalo} alt="zalo" className='w-[30px] h-[30px] object-cover rounded-full' />
            </a>
        </div>
    )
}

export default memo(Contact)