import { memo, useState } from "react";
import { MdClose } from "react-icons/md";
import { Upload } from "../components/UploadStatus";
import { LongButton, Button2 } from "../components";
import { InputCustomWidth, SelectPayment } from "../components/InputCtWidth";

const AddAddressPopup = ({
    infoUser,
    setInfoUser,
    province,
    setProvinceCur,
    provinceCur,
    district,
    setDistrictCur,
    districtCur,
    ward,
    setWardCur,
    wardCur,
    detailAddress,
    setDetailAddress,
    setShowPopupAddress,
    showPopupAddress,
    handleAddAdress
}) => {
  const [status, setStatus] = useState();
  const [isClick, setIsClick] = useState(false);
  

  return (
    <div
      className={`fixed w-screen top-0 h-screen bg-white z-30 md:hidden ${
        !showPopupAddress ? "translate-x-[100%]" : "translate-x-[0]"
      } transition-all`}
    >
      {/* <div
        className={`relative translate-y-[-70px] ${
          isClick ? " animate-top-popup" : ""
        }`}
        onAnimationEnd={() => {
          setIsClick(false);
        }}
      >
        <Upload
          status={status}
          content={
            status ? "Đăng bình luận thành công" : `Đã có lỗi xảy ra`
          }
        />
      </div> */}
      <header className="bg-white h-[56px] pl-[16px] flex items-center text-primary">
        <div
          onClick={() => {
            setShowPopupAddress(false);
          }}
        >
          <MdClose size="35px" className="text-primary mr-[20px]" />
        </div>
        <p className="text-[20px] font-semibold">Thêm địa chỉ</p>
      </header>
      <div>
                  <div className="w-full pt-[24px] p-3 h-[34%]">
                    <p>Thông tin liên lạc</p>
                    <hr />
                    <div className="w-full h-[42px] my-3">
                      <InputCustomWidth
                        placeholder="Họ và tên"
                        value={infoUser.name}
                        setValue={setInfoUser}
                        type="name"
                      />
                    </div>
                    <div className="">
                      <div className="w-full h-[42px]">
                        <InputCustomWidth
                          placeholder="Số điện thoại"
                          value={infoUser.phone}
                          setValue={setInfoUser}
                          type="phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-3 h-[66%] flex flex-col justify-between">
                    <div className="">
                      <p>Địa chỉ giao hàng</p>
                      <hr />
                      <div className="w-full h-[42px] my-3">
                        <SelectPayment
                          options={province}
                          type="ProvinceName"
                          setSelectValue={setProvinceCur}
                          selectValue={provinceCur}
                        />
                      </div>

                      <div className="w-full mb-3 h-[42px]">
                        <SelectPayment
                          options={district}
                          type="DistrictName"
                          setSelectValue={setDistrictCur}
                          selectValue={districtCur}
                        />
                      </div>
                      <div className="w-full h-[42px]">
                        <SelectPayment
                          options={ward}
                          type="WardName"
                          setSelectValue={setWardCur}
                          selectValue={wardCur}
                        />
                      </div>
                      <div className="">
                      <div className="w-full h-[42px] m-[8px]">
                        <InputCustomWidth
                          value={detailAddress}
                          setValue={setDetailAddress}
                          placeholder="Địa chỉ chỉ chi tiết... vd: số 15 ngõ 118 đường Tôn Đức Thắng"
                        />
                      </div>
                    </div>
                    </div>
                    <div
                      className=""
                      onClick={() => handleAddAdress()}
                    >
                      <Button2 text="Xác nhận thêm đại chỉ" />
                    </div>
                  </div>
                </div>
    </div>
  );
};

export default memo(AddAddressPopup);
