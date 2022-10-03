import React from 'react'
import { memo } from 'react'
import icons from '../ultils/icons'
import { ProductItem } from './'

const { GrFormNext } = icons

const HomeItem = ({ products, v2, title }) => {
    return (
        <div className={`w-full flex flex-col gap-6 px-5 pt-8 ${v2 ? 'bg-[#1B4B66] h-[454px] text-white' : ''}`}>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-[34px]'>{title}</h2>
                <span className='text-[#17494D] font-semibold flex items-center gap-2'>
                    <span>Xem tất cả</span>
                    <GrFormNext size={20} />
                </span>
            </div>
            <div className='flex gap-10'>
                {products?.map(item => (
                    <ProductItem
                        key={item.id}
                        image={item?.mainImage}
                        title={item?.name}
                        description={item?.description}
                        cost={item?.costPerUnit}
                        v2={v2}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(HomeItem)