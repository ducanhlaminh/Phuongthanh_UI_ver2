import React, { memo } from "react";

export const Button = ({
  text,
  bgColor,
  textColor,
  onClick,
  width,
  height,
}) => {
  return (
    <button
      type="button"
      className={`outline-none rounded-md opacity-80 hover:opacity-100 `}
      onClick={onClick}
      style={{
        backgroundColor: `${bgColor}`,
        color: `${textColor}`,
        width: `${width}`,
        height: `${height}`,
        padding: `${height * 4}px 0`,
      }}
    >
      {text}
    </button>
  );
};

export const ButtonCtWidth = ({ content, color, width, height, onAction }) => {
  return (
    <button
      className={`text-base text-white 
        px-${width} py-${height} rounded-lg 
        hover:-translate-y-0.5 transition-all 
        ease-in-out active:translate-y-0.5 
        mr-[20px] bg-[${color}]`}
      onClick={() => onAction()}
    >
      {content}
    </button>
  );
};

export default memo(Button);
