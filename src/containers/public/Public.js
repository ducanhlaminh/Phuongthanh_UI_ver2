import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderLaptop } from '../../components'

const Public = () => {
    return (
        <div className='flex flex-col w-full max-w-[1280px] h-screen overflow-y-auto m-auto bg-white text-black'>
            <div className='hidden md:block w-full h-[80px]'>
                <HeaderLaptop />
            </div>
            <div className='flex-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default Public