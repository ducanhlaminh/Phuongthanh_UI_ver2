import React, { useState } from "react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";

const BoxChat = () => {
    const [isStart, setIsStart] = useState(false)
    return (
        <div className="w-[328px] h-[455px] bg-gray-800 text-gray-200">
            <div className="w-full h-[48px] bg-gray-900 flex items-center px-2 font-medium">
                Bot v2
            </div>
            <div className="flex flex-col h-[407px] ">
                <div className="content flex-auto w-full h-[300px] relative">
                    <Messages isStart={isStart} setIsStart={setIsStart} />
                    <div className='absolute bottom-0 bg-gray-800 h-[25px] w-full'></div>
                </div>
                {isStart && <div className="flex-auto w-full h-[10px]" >
                    <InputMessage />
                </div>}
            </div>
        </div>
    );
};

export default BoxChat; 