import React from 'react'
import { memo } from 'react'
import icons from '../ultils/icons'
import { ProductItem } from './'

const { MdNavigateNext } = icons

const HomeItem = ({ products, v2, title }) => {
    return (
        <div className={`w-full flex flex-col md:gap-6 gap-4 px-5 md:pt-8 ${v2 ? 'bg-[#1B4B66] lg:h-[454px] pt-4 pb-8 text-white' : ''}`}>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-base md:text-[34px]'>{title}</h2>
                <span className={`${v2 ? 'text-white' : 'text-[#17494D]'} font-semibold flex items-center gap-2`}>
                    <span>Xem tất cả</span>
                    <MdNavigateNext size={20} />
                </span>
            </div>
            <div className='flex flex-wrap md:gap-10 gap-4 lg:justify-start lg:flex-nowrap justify-evenly'>
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