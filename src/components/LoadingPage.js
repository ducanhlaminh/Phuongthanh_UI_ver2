import { BallTriangle } from 'react-loader-spinner'

export const LoadingPageDesktop = () => {
    return (
        <div className='lg:absolute w-full h-full top-0 bot-0 right-0 left-0 flex justify-center items-center bg-slate-400/10  z-100'>
            <BallTriangle
                height={200}
                width={200}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    )
}
