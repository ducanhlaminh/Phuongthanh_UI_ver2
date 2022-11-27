import { Button } from "../../components/Button";
import image from "../../assets/temp.png";
import { FiSearch } from "react-icons/fi";
import { InputCustomWidth } from "../../components/InputCtWidth";
import { useEffect, useState } from "react";
import apiUser from "../../apis/user";
import { Pagination } from "@mui/material";
import { bufferToBase64 } from "../../ultils/common";
import avatar from "../../assets/avatar-anon.png";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import { PopupDeleteUser } from "../../components/Modal";
import { NotiStatus } from "../../components/UploadStatus";
const User = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [userSelected, setUserSelected] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await apiUser.getAll({ limit: 7, page: page });
      setCount(res.response.count);
      setUsers(res.response.rows);
    };
    !isLoading && fetchCategory();
  }, [isLoading, page]);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const renderUser = users?.map((user, i) => {
    return (
      <div
        key={i}
        className="flex rounded w-full bg-white items-center h-[90px] [&:not(:first-child)]:mt-2"
      >
        <div className="w-[5%] text-center">
          <span>{i + 1}</span>
        </div>

        <div className="w-[15%] flex justify-center h-[90%]">
          <img
            src={bufferToBase64(user?.avatar) || user?.avatarUrl || avatar}
            alt="avatar "
            className="h-[90%] rounded-sm w-[100px] object-cover"
          ></img>
        </div>
        <div className="w-[10%] text-center">
          <p>{user.name}</p>
        </div>
        <div className="w-[20%] text-center">
          <p>{user.phone ? user.phone : "Trống"}</p>
        </div>

        <div className="w-[20%] text-center">
          <p>{user.email ? user.email : "Trống"}</p>
        </div>
        <div className="w-[30%] flex justify-around">
          <Button
            text="Đi tới trang cá nhân"
            bgColor="#4ed14b"
            textColor="#fff"
            width="40%"
          ></Button>
          <Button
            text="Xóa"
            bgColor="#cf2b2b"
            textColor="#fff"
            width="40%"
            height="2"
            onClick={() => {
              setIsDelete(true);
              setUserSelected(user);
            }}
          ></Button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-3xl">Quản lí người dùng</h1>
      {showUpload && (
        <NotiStatus
          active={contentUpload?.status === 0 ? "success" : "error"}
          setActive={setShowUpload}
          content={
            contentUpload?.status === 0
              ? "Xóa sản phẩm thành công"
              : "Có lỗi xảy ra trong quá trình xử lí"
          }
        />
      )}
      <div className="bg-[#d9d9d9] h-[64px] flex items-center justify-end rounded-xl py-3 px-5">
        <InputCustomWidth widthP={"full"} />

        <FiSearch className="ml-2 cursor-pointer text-2xl hover:text-gray-500 " />
      </div>

      <div className="bg-[#d9d9d9] pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl  h-[525px] flex flex-col">
        <div className="flex h-[50px]">
          <div className="w-[5%]  font-bold text-center">ID</div>
          <div className="w-[15%] font-bold text-center">Ảnh đại diện</div>
          <div className="w-[10%]  font-bold text-center">Tên người dùng</div>
          <div className="w-[20%]  font-bold text-center">Số điện thoại</div>
          <div className="w-[20%]  font-bold text-center">Email</div>
        </div>
        <div className="h-5/6 overflow-auto relative">
          {isLoading ? <LoadingPageDesktop /> : renderUser}
        </div>
        <div className="flex justify-center w-full flex-auto items-end p-2">
          <Pagination
            count={Math.ceil(count / 7)}
            color="primary"
            size="large"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
      {isDelete ? (
        <PopupDeleteUser
          setIsDelete={setIsDelete}
          isDelete={isDelete}
          user={userSelected}
          contentUpload={contentUpload}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
