import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import vnd from '../assets/vnd.png'
import icons from '../ultils/icons'


const { MdNavigateNext } = icons

const OrderItem = ({ oid, createAt, total, status }) => {
    return (
        <div className='w-full cursor-pointer rounded-md relative bg-[#f1f1f1] text-black flex items-center px-6 py-5'>
            <span className='flex gap-2 flex-1 items-center justify-center'>
                <input type="checkbox" className='w-6 h-6' />
                <span>{`#${oid?.replace(/\D/g, "")?.slice(0, 9)}`}</span>
            </span>
            <span className='flex-1 flex justify-center items-center'>{moment(createAt).format('DD/MM/YYYY')}</span>
            <span className='flex-1 flex justify-center items-center gap-1'>
                <img src={vnd} alt="vnd" className='w-[14px] h-[14px] object-cover' />
                <span>{Number(total.toFixed(1)).toLocaleString()}</span>
            </span>
            <span className='flex-1 flex justify-center items-center'>{status === 'in progress' ? 'Đang chờ' : status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}</span>
            <span className='absolute top-0 bottom-0 right-2 flex items-center'>
                <MdNavigateNext size={24} />
            </span>

        </div>
    )
}

export default memo(OrderItem)