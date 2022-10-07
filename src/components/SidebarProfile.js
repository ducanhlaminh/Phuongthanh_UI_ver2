import React, { memo } from 'react'
import { menuProfile } from '../ultils/menu'
import { NavLink } from 'react-router-dom'
import icons from '../ultils/icons'

const { MdNavigateNext } = icons
const notAvtiveStyle = 'w-[271px] h-[72px] flex justify-between items-center font-bold pl-2'
const avtiveStyle = 'w-[271px] h-[72px] flex justify-between items-center font-bold border-l-4 border-[#1B4B66] text-[#1B4B66] pl-1'

const SidebarProfile = () => {
    return (
        <div className='flex flex-col w-full bg-[#F1F1F1] rounded-md'>
            {menuProfile.map(item => (
                <NavLink
                    key={item.keyName}
                    to={item.path}
                    className={({ isActive }) => isActive ? avtiveStyle : notAvtiveStyle}
                >
                    <span>{item.text}</span>
                    <MdNavigateNext size={24} />
                </NavLink>
            ))}
        </div>
    )
}

export default memo(SidebarProfile)