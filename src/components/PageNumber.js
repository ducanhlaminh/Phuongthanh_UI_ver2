import React, { memo } from 'react'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-[#FFA3A9] rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#ff424e] text-white hover:opacity-90 rounded-md'

const PageNumber = ({ text, currentPage, setCurrentPage}) => {

    /*
        @important: consider that it maybe can help your guys
        handle situation conflic frams with search and sort
    */

    // const append = (entries) => {
    //     let params = []
    //     paramsSeach.append('page', +text)
    //     for (let entry of entries) {
    //         params.push(entry);
    //     }
    //     let searchParamsObject = {}
    //     params?.forEach(i => {
    //         if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
    //             searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
    //         } else {
    //             searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    //         }
    //     })
    //     return searchParamsObject
    // }

    const handleChangePage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
        }
    }
    return (
        <div
            className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {text}
        </div>
    )
}

export default memo(PageNumber)