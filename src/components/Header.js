import { useNavigate } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
const Header = () => {
  const navigate = useNavigate();
  return <div className="h-[56px] w-full flex items-center pl-[16px]" onClick={()=>{navigate(-1)}}>
    <MdOutlineArrowBackIosNew size='24'/>
  </div>;
};

export default Header;
