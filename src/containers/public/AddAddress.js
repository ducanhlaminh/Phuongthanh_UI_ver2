import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import ApiCart from "../../apis/cart";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { useEffect, useState } from "react";
import { Slider as SliderImage } from "../../components";
import CartItem from "../../components/CartItem";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import ApiAddress from "../../apis/ApiAddress";
import { Upload } from "../../components/UploadStatus";
import { Slider } from "../../components";
import DownPopup from "../../components/DownPopup";
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
  const [selected, setSelected] = useState(true);
  const [showPopupCart, setShowPopupCart] = useState(true);
  const [address, setAddress] = useState();
  const [selectAddress, setSelectAddress] = useState("");
  const dispatch = useDispatch();
  const { productsCart } = useSelector((state) => state.cart);
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await ApiAddress.Get();
      setAddress(res);
    };
    fetchAddress();
    dispatch(actions.addToCart());
  }, []);

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
        <DownPopup setShowPopup={setShowPopupCart} showPopup={showPopupCart}>
          <div className="">
            <div className="flex justify-between">
              <span className="font-bold text-gray-400 pb-2 border-b-2 mb-3">
                Vui lòng chọn địa chỉ giao hàng
              </span>
              <span className="font-bold text-primary cursor-pointer">
                Thêm địa chỉ
              </span>
            </div>

            <div className="h-[250px] overflow-auto">
              {address &&
                address.yourAddress?.map((addres, index) => {
                  const data = JSON.parse(addres.address);

                  return (
                    <div className="flex pb-3" key={addres.name + addres.id}>
                      <input
                        type="radio"
                        className="mr-4"
                        value={addres.id}
                        checked={
                          selectAddress
                            ? selectAddress === addres.id
                            : index === 0
                        }
                        onChange={() => setSelectAddress(addres.id)}
                      />
                      <div
                        className=""
                        onClick={() => setSelectAddress(addres.id)}
                      >
                        <div className="flex">
                          <span>Địa chỉ :</span>
                          <p className="font-bold">{` ${data.ward} - ${data.district} - ${data.province}`}</p>
                        </div>
                        <div className="flex">
                          <span>Tên người nhận : </span>
                          <p>{addres.name}</p>
                        </div>
                        <div className="flex">
                          <span>Số điện thoại : </span>
                          <p>{addres.phone}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="p-3">
              <Button2 text="Giao hàng tới đây" />
            </div>
          </div>
        </DownPopup>
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
      <div className="md:block hidden w-full ">
        <Slider />
        <h2 className=" text-3xl font-extrabold">Địa chỉ giao hàng</h2>
        <div className="flex min-h-[600px]">
          <div className="w-[60%] min-h-[200px] flex flex-col p-5">
            <div className="flex h-fit bg-gray-300 rounded-t-md">
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === true ? "bg-primary text-white" : ""
                }`}
                onClick={() => setSelected(true)}
              >
                Thêm địa chỉ
              </div>
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === false ? "bg-primary text-white" : ""
                }`}
                onClick={() => setSelected(false)}
              >
                Chọn địa chỉ
              </div>
            </div>
            <div className="border-2 h-full flex-auto p-3">
              {selected ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-400 pb-2 border-b-2 mb-3">
                        Vui lòng chọn địa chỉ giao hàng
                      </span>
                      <span className="font-bold text-primary cursor-pointer">
                        Thêm địa chỉ
                      </span>
                    </div>

                    <div className="h-[250px] overflow-auto">
                      {address &&
                        address.yourAddress?.map((addres, index) => {
                          const data = JSON.parse(addres.address);

                          return (
                            <div className="flex pb-3" key={addres.id}>
                              <input
                                type="radio"
                                className="mr-4"
                                value={addres.id}
                                checked={
                                  selectAddress
                                    ? selectAddress === addres.id
                                    : index === 0
                                }
                                onClick={() => setSelectAddress(addres.id)}
                                onChange={() => console.log(selectAddress)}
                              />
                              <div
                                className=""
                                onClick={() => setSelectAddress(addres.id)}
                              >
                                <div className="flex">
                                  <span>Địa chỉ :</span>
                                  <p className="font-bold">{` ${data.ward} - ${data.district} - ${data.province}`}</p>
                                </div>
                                <div className="flex">
                                  <span>Tên người nhận : </span>
                                  <p>{addres.name}</p>
                                </div>
                                <div className="flex">
                                  <span>Số điện thoại : </span>
                                  <p>{addres.phone}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="p-3">
                      <Button2 text="Giao hàng tới đây" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[40%] flex flex-col justify-evenly">
            <div className="">
              <div className="flex font-bold text-gray-500 border-b-2 items-center p-2">
                <p className="w-[50%]">Tên sản phẩm</p>
                <p className="w-[20%] text-center">Giá</p>
                <p className="w-[15%] text-center">Số lượng</p>
                <p className="w-[15%] text-center">Tổng</p>
              </div>
              <div className=" overflow-auto h-[300px] scroll-smooth">
                {/* product */}
                {productsCart?.map((product) => (
                  <CartItem
                    product={product?.productData}
                    variants={product?.variant}
                    quanity={product?.quanity}
                  />
                ))}
              </div>
            </div>
            <div className="">
              <p className="text-base font-bold p-2 border-b-2">
                Thông tin hóa đơn
              </p>

              <div className="flex justify-between font-bold text-gray-500 p-3 border-b-2">
                <div className="w-1/2 ">
                  <p>Sub total : </p>
                  <p>Delivery Fee : </p>
                  {/* <p className="font-bold text-black">Grand Total : </p> */}
                </div>
                <div className="w-1/3  text-black text-center">
                  <p>{numFormatter(100000)}</p>
                  <p>{numFormatter(100000)}</p>

                  {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                </div>
              </div>
              <div className="flex justify-between font-bold text-gray-500 p-3">
                <div className="w-1/2 ">
                  <p className="font-bold text-black">Grand Total : </p>
                </div>
                <div className="w-1/3  text-black text-center">
                  <p className="font-extrabold">{numFormatter(100000)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
