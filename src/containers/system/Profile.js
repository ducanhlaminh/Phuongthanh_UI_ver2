import React from 'react'
import { Button2, SidebarProfile } from '../../components'
import icons from '../../ultils/icons'
import { Outlet, useLocation } from 'react-router-dom'
import { menuProfile } from '../../ultils/menu'


const { FiLogOut } = icons

const Profile = () => {
    const location = useLocation()
    return (
        <div className='px-5 py-6'>
            <div className='pb-6 flex items-center justify-between pr-[76px]'>
                <h3 className='text-[34px] font-bold text-[#1B4B66]'>{menuProfile.find(item => item.path === location.pathname)?.text}</h3>
                <Button2
                    text='Đăng xuất'
                    icBefore={<FiLogOut />}
                    style='bg-white text-[#1B4B66] border border-[#1B4B66] px-4'
                />
            </div>
            <div className='flex gap-[22px]'>
                <div className='w-[286px] flex-none'>
                    <SidebarProfile />
                </div>
                <div className='flex-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Profile