const StatusTag = ({ status }) => {
  let content;
  if (status === "pending") {
    content = { colorBg: "", text: "ĐANG CHỜ", textColor: "" };
  } else if (status === "shipping") {
    content = {
      colorBorder: "bg-primary",
      text: "VẬN CHUYỂN",
      textColor: "text-primary",
    };
  } else if (status === "completed") {
    content = {
      colorBorder: "bg-green-200",
      text: "THÀNH CÔNG",
      textColor: "text-green-500",
    };
  } else if (status === true) {
    content = {
      colorBorder: "bg-green-200",
      text: "Còn hàng",
      textColor: "text-green-500",
    };
  } else if (status === false) {
    content = {
      colorBorder: "bg-rose-200",
      text: "Hết hàng",
      textColor: "text-rose-600",
    };
  } else {
    content = {
      colorBorder: "bg-rose-200",
      text: "ĐÃ HỦY",
      textColor: "text-rose-600",
    };
  }
  return (
    <div
      className={`border-2 ${content.colorBorder} ${content.textColor} w-fit h-full rounded-xl bg-slate-50 flex justify-center items-center px-5`}
    >
      <span>{content.text}</span>
    </div>
  );
};
export default StatusTag;
