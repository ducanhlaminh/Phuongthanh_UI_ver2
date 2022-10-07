import React from 'react'

const Category = ({ categoryData }) => {
    return (
        <div className='h-[500px] flex justify-center items-center'>{categoryData.valueVi}</div>
    )
}

export default Category