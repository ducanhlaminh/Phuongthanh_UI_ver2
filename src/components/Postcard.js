import React from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const Postcard = ({ isBot, image, title, subtitle, btns, className, id }) => {
    const dispatch = useDispatch()
    const handleSubmit = (i) => {
        dispatch(actions.addTextUser(i))
        // dispatch(actions.loadingBot(true))
        dispatch(actions.getResponseBot({ type: 'postcard', content: i.code }))
    }
    return (
        <div className={`w-[200px] ${className}`}>
            <img
                src={image}
                alt="shop"
                className='w-full h-[100px] object-cover'
            />
            <div className={`w-full ${isBot ? 'bg-gray-600' : 'bg-blue-600'} rounded-br-md rounded-bl-md p-4`} >
                <h4 className='font-medium leading-snug whitespace-nowrap overflow-hidden text-ellipsis w-full'>{title}</h4>
                <p className='text-gray-300 text-xs' >{subtitle}</p>
                <div className='w-full flex flex-col items-center gap-2 my-4'>
                    {btns?.length > 0 && btns.map(i => {
                        return (
                            <button
                                key={id}
                                type='button'
                                className='p-2 w-full font-medium outline-none rounded-md bg-gray-500 whitespace-nowrap overflow-hidden text-ellipsis'
                                onClick={() => i.code === 'BUY' ? dispatch(actions.buy({ isBuy: true, data: { id, image, title, price: subtitle, quantity: 1 } })) : handleSubmit(i)}
                            >
                                {i.value}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Postcard