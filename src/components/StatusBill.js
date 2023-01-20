const StatusBill = ({ status }) => {
  let content;
  if (status === "pending") {
    content = { colorBorder: "", text: "ĐANG CHỜ", textColor: "" };
  } else if (status === "shipping") {
    content = {
      colorBorder: "border-primary",
      text: "VẬN CHUYỂN",
      textColor: "text-primary",
    };
  } else if (status === "completed") {
    content = {
      colorBorder: "border-green-500",
      text: "THÀNH CÔNG",
      textColor: "text-green-500",
    };
  } else {
    content = {
      colorBorder: "border-rose-600",
      text: "ĐÃ HỦY",
      textColor: "text-rose-600",
    };
  }
  return (
    <div
      className={`border-2 ${content.colorBorder} ${content.textColor} w-fit h-full rounded-md bg-slate-50  font-bold flex justify-center items-center px-2`}
    >
      <span>{content.text}</span>
    </div>
  );
};
export default StatusBill;
