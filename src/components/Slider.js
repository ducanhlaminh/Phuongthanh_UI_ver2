import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Slider = () => {

    const { categories } = useSelector(state => state.app)
    useEffect(() => {
        const sliderItems = document.getElementsByClassName('slider-item')
        let chosen = 1
        const intervalId = setInterval(() => {
            for (let i = 0; i < sliderItems.length; i++) {
                if (i === chosen) {
                    sliderItems[i].style.cssText = `display: flex`
                } else {
                    sliderItems[i].style.cssText = `display: none`
                }
            }
            chosen = chosen >= (sliderItems.length - 1) ? 0 : chosen + 1
        }, 2500)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    return (
        <div className='relative overflow-hidden bg-white h-[414px] rounded-lg px-5'>
            <div className='w-full h-full'></div>
            {categories?.map((item, index) => (
                <Link
                    key={item.id}
                    to={`/`}
                    className={`slider-item rounded-lg absolute items-start justify-center animate-slide-right ${index === 1 ? 'flex' : 'hidden'} top-0 left-0 right-0 bottom-0 h-full`}
                >
                    <img src={item.image} className='w-full h-[400px] rounded-lg object-cover' alt="slider" />
                </Link>
            ))}

        </div>
    )
}

export default memo(Slider)