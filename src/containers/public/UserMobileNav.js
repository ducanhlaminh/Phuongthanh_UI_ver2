import SideNavigateMenu from "../../components/SideNavigateMenu";
import { IoIosArrowForward } from "react-icons/io";
import image from "../../assets/anonAvatar.png";
import { Link } from "react-router-dom";
import LongButton from "../../components/LongButton";
const UserMobileNav = () => {
  return (
    <div>
      <div className="flex h-[56px] items-center pl-[16px]">
        <p className="text-primary font-semibold text-[20px]">Hồ sơ</p>
      </div>
      <Link
        to="/ho-so"
        className="w-[90%] h-[112px] bg-lightGrey rounded-[8px] flex p-[16px] gap-[16px] ml-[16px]"
      >
        <div className="h-[80x] w-[80px]">
          <img src={image} className=" h-full w-full rounded-[50%]" />
        </div>
        <div>
          <p className="font-semibold text-[20px] text-black">
            Nguyen Thanh Long
          </p>
          <p className="font-medium text-[14px] text-lightGrey2 mt-[4px]">
            0134567
          </p>
        </div>
        <div className="flex items-center justify-center">
          <IoIosArrowForward size="24" className="text-darkGrey" />
        </div>
      </Link>
      <div className="h-[60px] flex items-center">
        <Link to="/ho-so" className="w-full">
          <SideNavigateMenu title="Thông tin cá nhân"></SideNavigateMenu>
        </Link>
      </div>
      <div className="h-[60px] flex items-center">
        <Link to="/" className="w-full">
          <SideNavigateMenu title="Đơn hàng của tôi"></SideNavigateMenu>
        </Link>
      </div>
      <div className="h-[60px] flex items-center">
        <Link to="/" className="w-full">
          <SideNavigateMenu title="Yêu thích"></SideNavigateMenu>
        </Link>
      </div>
      <div className="h-[60px] flex items-center">
        <Link to="/" className="w-full">
          <SideNavigateMenu title="Danh sách địa chỉ"></SideNavigateMenu>
        </Link>
      </div>

      <div>
        <LongButton>
          <p></p>
        </LongButton>
      </div>
    </div>
  );
};

export default UserMobileNav;
