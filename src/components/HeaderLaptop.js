import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { generatePath } from '../ultils/fn'
import { Search } from './'
import icons from '../ultils/icons'
import { path } from '../ultils/constant'

const { RiUser6Line, AiOutlineShoppingCart, BsDot } = icons

const HeaderLaptop = () => {

    const { categories } = useSelector(state => state.app)
    return (
        <div className='w-full h-full flex items-center justify-between px-5 py-[18px]'>
            <div className='flex items-center gap-8 flex-auto'>
                <Link to={'/' + path.HOME} className='font-lemonada font-semibold text-[#17494D] text-[25px] leading-8'>PHƯƠNGTHANH</Link>
                <div className='lg:flex hidden items-center gap-5'>
                    {categories?.map(item => (
                        <NavLink
                            key={item.code}
                            to={`/${generatePath(item.valueVi)}`}
                            className='font-bold'
                        >
                            {item.valueVi}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-[45%] flex-none flex justify-between items-center gap-5'>
                <Search />
                <div className='w-[120px] flex items-center justify-end gap-5 flex-none'>
                    <span>
                        <RiUser6Line size={24} />
                    </span>
                    <span className='relative'>
                        <AiOutlineShoppingCart size={26} />
                        <span className='absolute top-0 right-0 w-[10px] h-[10px] bg-orange-600 rounded-full'></span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(HeaderLaptop)