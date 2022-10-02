import { BallTriangle } from 'react-loader-spinner'

export const LoadingPageDesktop = () => {
    return (
        <div className='hidden lg:absolute top-0 bot-0 right-0 left-0 justify-center items-center bg-overlay-30 fixed z-100'>
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
