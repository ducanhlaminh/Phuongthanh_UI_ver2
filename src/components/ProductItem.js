import React, { memo } from 'react'
import vnd from '../assets/vnd.png'

const ProductItem = ({ image, title, description, cost, v2 }) => {

    return (
        <div className={`w-[286px] flex flex-col gap-2 ${v2 ? 'rounded-xl' : 'pb-[41px] rounded-md'} relative bg-white`}>
            <img className={`w-full h-[286px] object-cover ${v2 ? 'rounded-xl' : 'rounded-md border border-gray-200'}`} src={image} alt="product" />
            {v2 && <div className='bg-gradient-to-t from-[rgba(255,255,255,0.5)] rounded-xl to-transparent absolute top-0 w-full h-[286px] z-40'></div>}
            <span className={`font-bold text-black  ${v2 ? 'absolute top-[246px] z-50 text-[24px] left-4' : ''}`}>{title}</span>
            {!v2 && <div className='flex flex-col gap-2'>
                <span className='text-gray-700'>{description}</span>
                <span className='font-bold flex items-center gap-1'>
                    <img src={vnd} alt="vnd" className='w-4 h-4 object-cover' />
                    <span>{Number((cost).toFixed(1)).toLocaleString()}</span>
                </span>
            </div>}
        </div>
    )
}

export default memo(ProductItem)