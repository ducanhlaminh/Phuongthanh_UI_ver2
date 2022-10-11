import image from "../../assets/anonAvatar.png";
import LongButton from "../../components/LongButton";
import { RiDeleteBinLine } from "react-icons/ri";

const Personal = () => {
  return (
    <div className="pr-[76px]">
      <div>
        <p className="text-[20px] font-semibold border-b-[1px] border-darkGrey-tint pb-[6px]">
          Thông tin cá nhân
        </p>
        <div className="flex items-end gap-[16px] mt-[37px]">
          <img src={image} className="w-[80px] h-[80px] rounded-[50px]"></img>
          <LongButton
            width="136px"
            height="38px"
            backgroundColor="#1B4B66"
            color="white"
            size="14px"
          >
            <p className="font-medium text-[14px]">Tải lên</p>
          </LongButton>
          <div className="border-[2px] border-[#b00020] rounded-[8px] translate-y-[2px]">
            <LongButton
              width="136px"
              height="38px"
              backgroundColor="white"
              color="#B00020"
              size="14px"
            >
              <RiDeleteBinLine />
              <p>Xóa tài khoản</p>
            </LongButton>
          </div>
        </div>
        <div className="mt-[24px]">
          <label className="block font-medium text-[16px] text-black">
            Họ và tên
          </label>
          <input className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] min-w-[600px]" />
        </div>
        <div>
          <label className="block font-medium text-[16px] text-black mt-[8px]">
            Email
          </label>
          <input className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] min-w-[600px]" />
        </div>
        <div>
          <label className="block font-medium text-[16px] text-black mt-[8px]">
            Số điện thoại{" "}
          </label>
          <input className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] min-w-[600px]" />
        </div>
        <div className="flex justify-end mt-[24px]">
          <LongButton
            backgroundColor="#1B4B66"
            color="white"
            height="36px"
            width="136px"
          >
            <p className="text-[16px] font-medium">Lưu thay đổi</p>
          </LongButton>
        </div>
      </div>
      <div>
        <p className="text-[20px] font-semibold border-b-[1px] border-darkGrey-tint pb-[6px] mt-[56px]">
          Đổi mật khẩu
        </p>
        <div className="mt-[24px]">
          <label className="block font-medium text-[16px] text-black">
            Mật khẩu hiện tại
          </label>
          <input className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] min-w-[600px]" />
        </div>
      </div>
      <div className="flex justify-end mt-[24px]">
          <LongButton
            backgroundColor="#1B4B66"
            color="white"
            height="36px"
            width="136px"
          >
            <p className="text-[16px] font-medium">Xác nhận</p>
          </LongButton>
        </div>
    </div>
  );
};

export default Personal;
