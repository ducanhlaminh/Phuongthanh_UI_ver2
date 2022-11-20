import { Button } from "../../components/Button";
import ApiCategory from "../../apis/category";
import { useEffect, useState } from "react";
import { InputCustomWidth } from "../../components/InputCtWidth";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import FormData from "form-data";
import {
  ModalEditCate,
  PopupDeleteCate,
  ModalCreateCate,
} from "../../components/Modal";
import { NotiStatus } from "../../components/UploadStatus";

const ManageCategory = () => {
  const [selectCate, setSelectCate] = useState({});
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const categories = useSelector((state) => {
    return state.app.categories;
  });

  const renderCateList = categories.map((cate, i) => {
    return (
      <div key={cate.id} className="">
        <div className=" flex rounded w-full  bg-white items-center max-h-[90px] [&:not(:first-child)]:mt-2">
          <div className="w-[28%] p-10">
            <p className=" text-xl font-bold ">{cate.valueVi}</p>
          </div>

          <div className="w-[28%]">
            <p className=" text-xl font-bold ">{cate.products}</p>
          </div>

          <div className="w-[28%]">
            <p className=" text-xl font-bold ">20/12/2022</p>
          </div>
          <div className="w-[30%] flex justify-around">
            <Button
              text="Sửa"
              bgColor="#4ed14b"
              textColor="#fff"
              width="40%"
              onClick={() => {
                setIsShowEdit(!isShowEdit);
                setSelectCate(cate);
              }}
            ></Button>
            <Button
              text="Xóa"
              bgColor="#cf2b2b"
              textColor="#fff"
              width="40%"
              height="2"
              onClick={() => {
                setIsDelete(!isDelete);
                setSelectCate(cate);
              }}
            ></Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 className="text-2xl mb-2">ManageCategory</h1>
<<<<<<< Updated upstream
      <div className="bg-gray-300 rounded p-5 h-[525px]">
        <div className="h-[10%]">
=======
      <div className="bg-gray-300 rounded p-5 ">
        {showUpload && (
          <NotiStatus
            active={contentUpload?.status === 0 ? "success" : "error"}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Thao tác xử lí thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        )}
        <div className="">
>>>>>>> Stashed changes
          <div className="flex">
            <Button
              text="THÊM GIAN HÀNG"
              bgColor="#4ed14b"
              textColor="#fff"
              width="40%"
              height="3"
              onClick={() => {
                setIsShowCreate(!isDelete);
              }}
            ></Button>
          </div>
          <h2>{`Tổng số gian hàng hiện có : ${categories.length}`}</h2>
        </div>

        <div className="overflow-auto bg-white h-[90%]">{renderCateList}</div>
      </div>
      {isShowEdit ? (
        <ModalEditCate
          setIsShowEdit={setIsShowEdit}
          selectCate={selectCate}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          showUpload={showUpload}
        />
      ) : (
        ""
      )}
      {isDelete ? (
        <PopupDeleteCate
          setIsDelete={setIsDelete}
          selectCate={selectCate}
          isDelete={isDelete}
          setShowUpload={setShowUpload}
          showUpload={showUpload}
          setContentUpload={setContentUpload}
        />
      ) : (
        ""
      )}
      {isShowCreate ? (
        <ModalCreateCate
          setIsShowCreate={setIsShowCreate}
          setShowUpload={setShowUpload}
          showUpload={showUpload}
          setContentUpload={setContentUpload}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ManageCategory;
