import SidebarMenu from "../../components/SidebarProfile";
import image from "../../assets/anonAvatar.png"
const ProfileClient = () => {
  return (
    <div className="flex">
      <div className="w-[23%] hidden md:block">
        <SidebarMenu />
      </div>
      <div className="flex-auto">

      </div>
    </div>
  );
};

export default ProfileClient;
