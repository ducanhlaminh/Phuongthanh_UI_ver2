import React, { memo } from "react";

const Button2 = ({ text, style, icBefore, icAfter, handleClick }) => {
  return (
    <button
      onClick={() => handleClick()}
      type="button"
      className={`outline-none flex items-center w-full justify-center gap-2 rounded-md py-2 opacity-90 hover:opacity-100 ${
        style || "px-4 text-white bg-primary"
      }`}
    >
      {icBefore}
      <span>{text}</span>
      {icAfter}
    </button>
  );
};

export default memo(Button2);
