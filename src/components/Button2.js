import React, { memo } from 'react'

const Button2 = ({ text, style, icBefore, icAfter }) => {
    return (
        <button
            type='button'
            className={`outline-none flex items-center justify-center gap-2 rounded-md py-2 opacity-90 hover:opacity-100 ${style || 'px-4 text-white bg-blue-600'}`}
        >
            {icBefore}
            <span>{text}</span>
            {icAfter}
        </button>
    )
}

export default memo(Button2)