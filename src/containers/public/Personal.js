import image from "../../assets/anonAvatar.png";
import LongButton from "../../components/LongButton";
import { RiDeleteBinLine } from "react-icons/ri";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import ApiChangePassword from "../../apis/changePassword";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Personal = () => {
  const { userCurrent } = useSelector((state) => state.auth);
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (email, password) => {
    try {
      const res = await ApiChangePassword.verifyAccount({
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (res.status === 0) Swal.fire("Thành công", res.message, "success");
      else Swal.fire("Thất bại", res.message, "error");
    } catch (err) {
      setIsLoading(false);
      Swal.fire("Thất bại", err.message, "error");
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <div className="md:hidden">
        <Header>
          <MdOutlineArrowBackIosNew size="24" />
        </Header>
      </div>
      <div className="md:pr-[76px]">


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
            <input
              className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] w-full md:w-[60%]"
              placeholder={userCurrent?.name}
            />
          </div>
          <div>
            <label className="block font-medium text-[16px] text-black mt-[8px]">
              {userCurrent?.email ? "Email" : "Số điện thoại"}
            </label>
            <input
              className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] w-full md:w-[60%]"
              placeholder={
                userCurrent?.email ? userCurrent?.email : userCurrent?.phone
              }
            />
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
            <input
              className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] w-full md:w-[60%]"
              ref={passwordRef}
            />
          </div>
        </div>
        <div
          className="flex justify-end mt-[24px]"
          onClick={() => {
            handleSubmit(userCurrent?.email, passwordRef?.current.value);
            passwordRef.current.value = "";
            setIsLoading(true);
          }}
        >
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
    </div>
  );
};

export default Personal;
