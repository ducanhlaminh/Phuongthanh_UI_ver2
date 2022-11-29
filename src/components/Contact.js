import React from "react";
import { memo, useState } from "react";
import { BsMessenger } from "react-icons/bs";
import zalo from "../assets/zalo.png";
import chatbot from "../assets/chatbot.png";

const Contact = ({ setIsStartChatBot, show }) => {
  return (
    <div className="flex flex-col items-end justify-center gap-12 relative md:static">
      <div
        className={`absolute ${
          show ? "left-[50px]" : ""
        } md:static transition-all`}
      >
        <a
          href="https://zalo.me/0839819860"
          target="_blank"
          className="relative flex justify-center items-center"
        >
          <div
            className={`w-[80px] h-[80px] border-2 cursor-pointer rounded-full top-[-25px] animate-bounce-2 absolute border-blue-600 bg-transparent ${
              show ? "hidden" : ""
            }`}
          ></div>
          <div className="w-[30px] h-[30px] object-cover rounded-full">
            <img
              src={zalo}
              alt="zalo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </a>
      </div>

      <div
        className={`absolute ${
          show ? "left-[100px]" : ""
        } md:static transition-all`}
      >
        <a
          href="https://m.me/paunchyboy06"
          target="_blank"
          className="relative flex justify-center items-center"
        >
          <div
            className={`w-[80px] h-[80px] border-2 cursor-pointer rounded-full top-[-25px] animate-bounce absolute border-blue-600 bg-transparent ${
              show ? "hidden" : ""
            }`}
          ></div>
          <BsMessenger size={30} color="blue" />
        </a>
      </div>

      <div>
        <div
          onClick={() => {
            // if (window.innerWidth < 768) {
            //   setIsStartChatBot((prev) => !prev);
            // } else {
            //   setIsStartChatBot((prev) => !prev);
            // }
          }}
          className="relative flex justify-center items-center transition-all"
        >
          <div
            className={`w-[80px] h-[80px] border-2 cursor-pointer rounded-full top-[-25px] animate-bounce-2 absolute border-blue-600 bg-transparent ${
              show ? "hidden" : ""
            }`}
          ></div>
          <img
            src={chatbot}
            alt="zalo"
            className="w-[30px] h-[30px] object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
