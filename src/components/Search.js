import React, { memo } from 'react'

const Search = () => {
    return (
        <div className='w-[60%] flex items-center h-[55%]'>
            <input
                type="text"
                id="search"
                className='w-full px-8 py-[13px] bg-[#F1F1F1]'
            />
            <label htmlFor="search">se</label>
        </div>
    )
}

export default memo(Search)