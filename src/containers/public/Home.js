import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Slider, HomeItem } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getLastestProducts, getTopProducts } from '../../store/actions'

const Home = () => {

    const dispatch = useDispatch()
    const { lastestProducts, topProducts } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getLastestProducts({ limitProduct: 4, order: ['createdAt', 'DESC'] }))
        dispatch(getTopProducts({ limitProduct: 4, order: ['soldCounter', 'DESC'] }))
    }, [])


    return (
        <div className='w-full'>
            <div className='w-full flex items-center gap-1 justify-center h-[50px] bg-[#E5E5E5] text-sm'>
                <span>Chào mừng quý khách đến với cửa hàng tạp hóa Phương Thanh. Chúng tôi đang có rất nhiều deal hot dành riêng cho bạn</span>
                <Link
                    to={path.DISCOUNT}
                    className='text-blue-500 underline hover:text-orange-500'
                >
                    ở đây
                </Link>
            </div>
            <div className='py-6 flex flex-col gap-8'>
                <Slider />
                <HomeItem products={lastestProducts && lastestProducts} title='Sản phẩm mới về' />
                <HomeItem products={topProducts && topProducts} v2={true} title='#topbanchay' />
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home