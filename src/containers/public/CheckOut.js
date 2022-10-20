import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import ApiCart from "../../apis/cart";
import { useEffect, useState } from "react";
import { Slider as SliderImage } from "../../components";
import CartItem from "../../components/CartItem";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import ApiAddress from "../../apis/ApiAddress";

function numFormatter(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num); // if value < 1000, nothing to do
}
function CheckOut() {
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
      <div className="md:hidden h-screen">
        <AppBar title="Checkout" />

        <hr />
        <div className="w-full pt-[56px] p-3 h-[40%]">
          <p>Thông tin liên lạc</p>
          <hr />
          <div className="w-full h-[42px] my-3">
            <InputCustomWidth placeholder="Họ và tên" />
          </div>
          <div className="">
            <div className="w-full h-[42px]">
              <InputCustomWidth placeholder="Số điện thoại" />
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
            onClick={() => console.log(provinceCur, districtCur, wardCur)}
          >
            <Button2 text="Xác nhận đơn hàng" onC />
          </div>
        </div>
      </div>

      {/* Desktop */}
      {/* <div className="md:block hidden w-full "></div> */}
    </>
  );
}

export default CheckOut;
