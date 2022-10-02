import NameCategory from "./NameCategories";
import { vi_uf8 } from "../ultils/constant";
import icons from "../ultils/icons";

const Footer = ({ color, category }) => {
    const { adress, phone1, phone2, email, facebook, zalo, instagram } = vi_uf8
    const { AiOutlineFacebook, SiZalo, AiOutlineInstagram, TiLocationOutline } = icons
    return (
        <div className='w-full p-[20px] relative' style={{ backgroundColor: '#721016' }}>
            <div className="w-[160px] h-[100px]">
                <NameCategory
                    category={category}
                    color={color}
                    index={1}
                />
            </div>
            <div className='w-[80%] text-[10px] lg:text-base mx-auto text-white mb-[24px] relative '>
                <p>Địa chỉ:
                    <a className="ml-[20px]" href="#"> {adress}</a>
                </p>
                <p>Số điện thoại: +84  {phone1}  |  {phone2}
                </p>
                <p>Email:
                    <a className="ml-[32px]" href="#">{email}</a>
                </p>
                <div className="lg:hidden mt-[16px]">
                    <p>facebook:
                        <a className="ml-[20px]" href="#"> {facebook}</a>
                    </p>
                    <p>Zalo:  <a className="ml-[20px]" href="#"> {zalo}</a>
                    </p>
                    <p>Instagram:
                        <a className="ml-[32px]" href="#">{instagram}</a>
                    </p>
                </div>
                <div className="hidden lg:flex absolute z-50 top-[-90px] left-[100px]" >
                    <AiOutlineFacebook className="mx-[12px] my-auto" size={45} />
                    <SiZalo className="mx-[12px] my-auto" size={40} />
                    <AiOutlineInstagram className="mx-[12px] my-auto" size={45} />
                    <TiLocationOutline className="mx-[12px] my-auto" size={40} />
                    <div className="mx-[12px] text-[24px] my-auto">24/7</div>
                </div>
            </div>

            <p className="text-white text-[10px] lg:text-base text-center lg:text-left ml-[70px] lg:max-w-[40%] lg:text-center"
            >Copyright ©2022 All rights reserved | This website was developed by MOTIONTECH team </p>
            <div className="opacity-[0] lg:opacity-[1] w-[50%] h-full absolute top-0 right-0 z-0 overflow-hidden bg-[#fff]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2926380379063!2d105.78524921485358!3d20.98090348602431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1663307156841!5m2!1svi!2s"
                    width="950" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
}

export default Footer;