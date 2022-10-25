import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import ApiCart from "../../apis/cart";
import { useEffect, useState } from "react";
import { Slider as SliderImage } from "../../components";
import CartItem from "../../components/CartItem";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import ApiAddress from "../../apis/ApiAddress";
import { Upload } from "../../components/UploadStatus";
function numFormatter(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num); // if value < 1000, nothing to do
}
function AddAddress() {
  const [status, setStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [infoUser, setInfoUser] = useState({ name: "", phone: "" });
  const [province, setProvince] = useState([]);
  const [provinceCur, setProvinceCur] = useState("DEFAULT");
  const [district, setDistrict] = useState([]);
  const [districtCur, setDistrictCur] = useState("DEFAULT");
  const [ward, setWard] = useState([]);
  const [wardCur, setWardCur] = useState("DEFAULT");

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await ApiAddress.Province();
      const city = [];
      res.data.data.map((province) => city.push(province));
      setProvince(city);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await ApiAddress.District(provinceCur);
      const district = [];
      res.data.data.map((province) => district.push(province));
      setDistrict(district);
      setDistrictCur("DEFAULT");
      setWardCur("DEFAULT");
    };

    provinceCur !== "DEFAULT" && fetchDistricts();
  }, [provinceCur]);
  useEffect(() => {
    const fetchWarn = async () => {
      const res = await ApiAddress.Ward(districtCur);
      const wards = [];
      res.data.data.map((province) => wards.push(province));
      setWard(wards);
      setWardCur("DEFAULT");
    };
    districtCur !== "DEFAULT" && fetchWarn();
  }, [districtCur]);

  return (
    <>
      {/* Mobile */}

      <div
        className="md:hidden h-screen relative"
        onClick={() => setShowPopup(false)}
      >
        <AppBar title="Thêm địa chỉ" />

        <div
          className={`relative translate-y-[-70px] ${
            showPopup ? " animate-top-popup" : ""
          }`}
          onAnimationEnd={() => {
            setShowPopup(false);
          }}
        >
          <Upload
            status={status}
            content={
              status ? "Them dia chi thanh cong" : `Có lỗi xảy ra thử lại sau`
            }
          />
        </div>

        <hr />
        <div className="w-full pt-[56px] p-3 h-[40%]">
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
        <div className="w-full p-3 h-[60%] flex flex-col justify-between">
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
          </div>
          <div
            className=""
            onClick={() => {
              const data = {
                address: JSON.stringify({
                  province: provinceCur.ProvinceName,
                  provinceId: provinceCur.ProvinceID,
                  district: districtCur.DistrictName,
                  districtId: districtCur.DistrictID,
                  ward: wardCur.WardName,
                  wardId: wardCur.WardCode,
                }),
                name: infoUser.name,
                phone: infoUser.phone,
              };
              const add = async (data) => {
                try {
                  const res = await ApiAddress.Add(data);
                  if (res.status === 0) {
                    setStatus(true);
                    setShowPopup(true);
                  }
                } catch (err) {
                  setStatus(false);
                  setShowPopup(true);
                }
              };
              add(data);
            }}
          >
            <Button2 text="Xác nhận đơn hàng" />
          </div>
        </div>
      </div>

      {/* Desktop */}
      {/* <div className="md:block hidden w-full "></div> */}
    </>
  );
}

export default AddAddress;
