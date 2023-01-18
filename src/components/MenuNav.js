import { Link } from "react-router-dom";
import image from "../assets/anonAvatar.png";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import SideNavigateMenu from "../components/SideNavigateMenu";
import { bufferToBase64 } from "../ultils/common";
import { generatePath } from "../ultils/fn";
import { contact } from "../ultils/constant";

const MenuNav = ({setShowMenuNav,showMenuNav}) => {
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  const {categories} = useSelector((state) => state.app);
  return (
    <div className={`fixed w-screen h-screen bg-[rgba(0,0,0,.25)] z-60 ${!showMenuNav?'translate-x-[-100%]' :'translate-x-[0]'} transition-all md:hidden`} onClick={()=>{setShowMenuNav(false)}}>
      <div className="w-[82%] h-full bg-lightGrey flex flex-col gap-[8px]" onClick={(e)=>{e.stopPropagation()}}>
        <div className="flex items-center p-[16px] bg-white">
          <Link
            to="/ho-so"
            className="w-full h-[74px] bg-lightGrey rounded-[8px] flex items-center p-[16px] gap-[16px]"
          >
            <div className="h-[42px] w-[42px]">
              <img src={bufferToBase64(userCurrent?.avatar) ||
                userCurrent?.avatarUrl ||
                image} className=" h-full w-full object-fit rounded-[50%]" alt="avatar"/>
            </div>
            <div className="w-[55%]">
              <p className="font-semibold text-[20px] text-black">
                {!isLoggedIn ? "Bạn chưa đăng nhập" : `Xin chào, ${userCurrent?.name}`}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <IoIosArrowForward size="24" className="text-darkGrey" />
            </div>
          </Link>
        </div>
        <div className="bg-white py-[12px]">
            <p className="text-darkGrey font-medium text-sm pl-[16px] mb-[5px]">Gian hàng</p>
            {categories?.map((category,i)=>{
                return  <Link
                to={`/${generatePath(category.valueVi)}`}
              >
                <SideNavigateMenu key={i} title={category.valueVi} ></SideNavigateMenu>
              </Link>
            })}
        </div>

        <div className="bg-white py-[12px]">
            <p className="text-darkGrey font-medium text-sm pl-[16px] mb-[5px]">Liên hệ</p>
            <a href={`https://zalo.me/${contact.zalo}`}
              target="_blank">
              <SideNavigateMenu title='Liên hệ Zalo'/>
            </a>
            <a href={`https://m.me/${contact.message}`}
               target="_blank">
              <SideNavigateMenu title='Liên hệ Message'/>
            </a>
            <a href={contact.email}
              target="_blank">
              <SideNavigateMenu title='Liên hệ Gmail'/>
            </a>
        </div>

      </div>
    </div>
  );
};

export default MenuNav;
