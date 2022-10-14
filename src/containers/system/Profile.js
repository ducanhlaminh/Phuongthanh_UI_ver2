import React from 'react'
import { Button2, SidebarProfile } from '../../components'
import icons from '../../ultils/icons'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { menuProfile } from '../../ultils/menu'
import { useSelector, useDispatch } from 'react-redux'
import { path } from '../../ultils/constant'
import * as actions from '../../store/actions'


const { FiLogOut, MdOutlineArrowBackIosNew } = icons

const Profile = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { detailOrder } = useSelector(state => state.app)

    if (!isLoggedIn) return <Navigate to={path.LOGIN} />
    return (
        <div className='px-5 py-6 h-full'>
            <div className='pb-6 flex items-center justify-between pr-[76px]'>
                {!detailOrder && <h3 className='text-[34px] font-bold text-[#1B4B66]'>{menuProfile.find(item => item.path === location.pathname)?.text}</h3>}
                {detailOrder && <div className='flex items-center gap-4 text-[#1B4B66]'>
                    <span title='Quay lại' onClick={() => dispatch(actions.detailOrder(null))} className='cursor-pointer'><MdOutlineArrowBackIosNew size={24} /></span>
                    <h3 className='text-[34px] font-bold'>{`Hoá đơn #${detailOrder?.id?.replace(/\D/g, "")?.slice(0, 9)}`}</h3>
                </div>}
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