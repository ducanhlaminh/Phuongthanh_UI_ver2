import React, { useState, useEffect } from 'react'
import { menuStatus } from '../../ultils/menu'
import { apiGetBills } from '../../apis/bill2'
import { OrderItem, DetailOrder } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
const Orders = () => {
    const [status, setStatus] = useState('in progress')
    const [bills, setBills] = useState([])
    const dispatch = useDispatch()
    const { detailOrder } = useSelector(state => state.app)
    useEffect(() => {
        const fetchBills = async () => {
            const response = await apiGetBills({ status })
            if (response.status === 0) {
                setBills(response.billData?.rows)
            }
        }
        fetchBills()

        return () => {
            dispatch(actions.detailOrder(null))
        }
    }, [status])

    return (
        <div className='w-full relative'>
            {detailOrder && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white z-50 animate-slide-left'>
                <DetailOrder />
            </div>}
            <div className='h-[68px] bg-[#f1f1f1] rounded-md flex items-center gap-4 px-4'>
                {menuStatus.map(item => (
                    <div
                        key={item.keyname}
                        onClick={() => setStatus(item.value)}
                        className={`px-4 py-2 cursor-pointer rounded-md ${item.value === status ? 'bg-[#1B4B66]  text-white' : ''}`}
                    >
                        {item.text}
                    </div>
                ))}
            </div>
            <div className='w-full mt-8'>
                <div className='flex items-center py-2 border-b border-gray-200 px-6'>
                    <span className='flex-1 flex justify-center items-center'>ID hóa đơn</span>
                    <span className='flex-1 flex justify-center items-center'>Ngày tạo</span>
                    <span className='flex-1 flex justify-center items-center'>Tổng tiền</span>
                    <span className='flex-1 flex justify-center items-center'>Trạng thái</span>
                </div>
                <div className='flex flex-col py-6 gap-[17px]'>
                    {bills?.map(item => (
                        <div
                            onClick={() => dispatch(actions.detailOrder(item))}
                            className='w-full'
                            key={item.id}
                        >
                            <OrderItem
                                oid={item.id}
                                createAt={item.createAt}
                                total={item.totalCost}
                                status={item.status}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='h-[269px]'></div>
        </div>
    )
}

export default Orders