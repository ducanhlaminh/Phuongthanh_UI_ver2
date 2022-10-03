import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { generatePath } from '../ultils/fn'
import { Search } from './'

const HeaderLaptop = () => {

    const { categories } = useSelector(state => state.app)
    return (
        <div className='w-full h-full flex items-center justify-between px-5 py-[18px]'>
            <div className='flex items-center gap-8 flex-auto'>
                <span className='font-lemonada font-semibold text-[#17494D] text-[25px] leading-8'>PHƯƠNGTHANH</span>
                <div className='flex items-center gap-5'>
                    {categories?.map(item => (
                        <NavLink
                            key={item.code}
                            to={`/${generatePath(item.valueVi)}`}
                            className='font-medium'
                        >
                            {item.valueVi}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-2/5 flex-none'>
                <Search />
            </div>
        </div>
    )
}

export default memo(HeaderLaptop)