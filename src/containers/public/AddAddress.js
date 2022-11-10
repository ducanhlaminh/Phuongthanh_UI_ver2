import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiAddress from "../../apis/ApiAddress";
import { Button2, Slider,LongButton } from "../../components";
import AppBar from "../../components/AppBar";
import DownPopup from "../../components/DownPopup";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import { Upload } from "../../components/UploadStatus";
import * as actions from "../../store/actions";
import { numFormatter } from "../../ultils/fn";
import CartItemCombined from "../../components/CartItemCombined";
import AddAddressPopup from "../../triggercompoents/AddAddressPopup";

const data = [
  {
    id:'02843323-0fda-4482-9061-b2e671e5fcca',
    mainImage: 'https://cdn.nguyenkimmall.com/images/detailed/757/10050188-laptop-hp-240-g8-i5-1135g7-518w3pa.jpg',
    name: 'This is demo data1',
    variant: 'Màu: đen,Chất liệu: thép',
    price: 280000,
    quanity: 4,
  },
  {
    id:'02843323-0fda-4482-9061-b2e671e5fccb',
    mainImage: 'https://cdn.nguyenkimmall.com/images/detailed/757/10050188-laptop-hp-240-g8-i5-1135g7-518w3pa.jpg',
    name: 'This is demo data2',
    variant: 'Màu: đen,Chất liệu: thép',
    price: 380000,
    quanity: 1,
  },
  {
    id:'02843323-0fda-4482-9061-b2e671e5fccc',
    mainImage: 'https://cdn.nguyenkimmall.com/images/detailed/757/10050188-laptop-hp-240-g8-i5-1135g7-518w3pa.jpg',
    name: 'This is demo data3',
    variant: 'Màu: đen,Chất liệu: thép',
    price: 480000,
    quanity: 10,
  },
  {
    id:'02843323-0fda-4482-9061-b2e671e5fccd',
    mainImage: 'https://cdn.nguyenkimmall.com/images/detailed/757/10050188-laptop-hp-240-g8-i5-1135g7-518w3pa.jpg',
    name: 'This is demo data4',
    variant: 'Màu: đen,Chất liệu: thép',
    price: 580000,
    quanity: 8,
  },
  {
    id:'02843323-0fda-4482-9061-b2e671e5fcca',
    mainImage: 'https://cdn.nguyenkimmall.com/images/detailed/757/10050188-laptop-hp-240-g8-i5-1135g7-518w3pa.jpg',
    name: 'This is demo data5',
    variant: 'Màu: đen,Chất liệu: thép',
    price: 680000,
    quanity: 7,
  },
]

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
  const [detailAddress, setDetailAddress] = useState('')
  const [selected, setSelected] = useState(true);
  const [showPopupAddress, setShowPopupAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPriceProducts, setTotalPriceProducts] = useState(0)
  const [shipFee, setShipFee] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [canCheckOut, setCanCheckOut] = useState(false)
  const dispatch = useDispatch();

  //GET ADDRESS
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await ApiAddress.Get();
      if(res.status === 0) setAddress(res?.yourAddress);
    };
    fetchAddress();
    dispatch(actions.addToCart());
  }, [selected]);

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

  //Add new address
  const handleAddAdress =  () => {
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
      detail: detailAddress
    };
    const add = async (data) => {
      try {
        const res = await ApiAddress.Add(data);
        if (res.status === 0) {
          setStatus(true);
          setShowPopup(true);
          setSelected(true)
          setShowPopupAddress(false)
        }
      } catch (err) {
        setShowPopupAddress(false)
        setStatus(false);
        setShowPopup(true);
      }
    };
    add(data);
  }

  useEffect(() => {
    data?.map(product => setTotalPriceProducts(prev => prev+product?.price*product.quanity))
  },[])

  return (
    <>
      {/* Mobile */}

      <div
        className="md:hidden h-full relative"
        onClick={() => setShowPopup(false)}
      >
        <AppBar title="Thanh toán" />
        <div className="mt-[60px]">
          <div>
            <div className="flex font-bold text-gray-500 border-b-2 p-[4px] items-center h-[64px]">
                  <p className="w-[55%]">Sản phẩm</p>
                  <p className="w-[20%] text-center">Số lượng</p>
                  <p className="w-[25%] text-center">Giá</p>
                </div>
            <div className="px-[8px] overflow-auto h-[270px] scroll-smooth border-b-2">
                  {/* product */}
                  {data.map((product) => {
                    return <CartItemCombined data={product}/>
                  }
                  )}
            </div>
          </div>
          <div>
            <div className="flex justify-between mx-[12px] mt-[24px]">
              <span className="font-bold text-gray-400 pb-2 border-b-2 mb-3">
              {address.length > 0 ? 'Vui lòng chọn địa chỉ giao hàng' :  'Chưa có địa chỉ được lưu trước đây' }
              </span>
              <span onClick={() => setShowPopupAddress(true)} className="font-bold text-primary cursor-pointer">
                Thêm địa chỉ mới
              </span>
            </div>
            <div className="h-[224px] overflow-auto px-[12px]">
              {address.length > 0 &&
                address?.map((addres, index) => {
                  const data = JSON.parse(addres.address);
                  return (
                    <div className="flex pb-3 cursor-pointer" key={addres.id}>
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
            <div className="relative">
              <LongButton
                width="200px"
                height="40px"
                backgroundColor="#1B4B66"
                size="14px"
                color="white"
                position="absolute  right-2"
              >
                <p>Xác nhận địa chỉ</p>
              </LongButton>
            </div>
          </div>
          <div className="mt-[38px]">
              <p className="text-base font-bold p-2 border-b-2">
                Thông tin hóa đơn
              </p>
              <div className="flex justify-between font-bold text-gray-500 p-3 border-b-2">
                <div className="w-1/2 ">
                  <p>Tổng đơn hàng : </p>
                  <p>Phí vận chuyển : </p>
                  <p>Giảm giá : </p>
                  {/* <p className="font-bold text-black">Grand Total : </p> */}
                </div>
                <div className="w-1/3  text-black text-right">
                  <p>{numFormatter(totalPriceProducts)}</p>
                  <p>{numFormatter(shipFee)}</p>
                  <p>{numFormatter(discountPrice)}</p>
                  {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                </div>
              </div>
              <div className="flex justify-between font-bold text-gray-500 p-3 mb-[16px]">
                <div className="w-1/2 ">
                  <p className="font-bold text-black">Tổng hóa đơn : </p>
                </div>
                <div className="w-1/3  text-black text-center">
                  <p className="font-extrabold">{numFormatter(100000)}</p>
                </div>
              </div>
          </div>
          <div className="mx-[12px] pb-[24px]">
            <Button2 disable={canCheckOut? false : true} text={"xác nhận đặt đơn"} />
          </div>
        </div>
        <AddAddressPopup 
          infoUser={infoUser}
          setInfoUser={setInfoUser}
          province={province}
          setProvinceCur={setProvinceCur}
          provinceCur={provinceCur}
          district={district}
          setDistrictCur={setDistrictCur}
          districtCur={districtCur}
          ward={ward}
          setWardCur={setWardCur}
          wardCur={wardCur}
          detailAddress={detailAddress}
          setDetailAddress={setDetailAddress}
          setShowPopupAddress={setShowPopupAddress}
          showPopupAddress={showPopupAddress}
          handleAddAdress={handleAddAdress}
          />
      </div>

      {/* Desktop */}
      <div className="md:block hidden w-full "> 
        <Slider />
        <h2 className=" text-3xl m-5 font-extrabold">Địa chỉ giao hàng</h2>
        <div className="flex min-h-[650px]">
          <div className="w-[60%] flex flex-col p-5">
            <div className="flex h-fit bg-gray-300 rounded-t-md">
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === true ? "bg-primary text-white" : ""
                } cursor-pointer`}
                onClick={() => setSelected(true)}
              >
                Chọn địa chỉ
              </div>
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === false ? "bg-primary text-white" : ""
                } cursor-pointer`}
                onClick={() => setSelected(false)}
              >
                Thêm địa chỉ
              </div>
            </div>
            <div className="border-2 h-full flex-auto p-3">
              {!selected ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-400 pb-2 border-b-2 mb-3">
                        {address.length > 0 ? 'Vui lòng chọn địa chỉ giao hàng' :  'Chưa có địa chỉ được lưu trước đây' }
                      </span>
                    </div>

                    <div className="h-[408px] overflow-auto">
                      {address.length > 0 &&
                        address?.map((addres, index) => {
                          const data = JSON.parse(addres.address);

                          return (
                            <div className="flex pb-3 cursor-pointer" key={addres.id}>
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
                      <Button2 text="Xác nhận địa chỉ nhận hàng" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[38%] pt-0 justify-evenly">
              <div className="flex font-bold text-gray-500 border-b-2 py-[13px] items-center h-[64px] mt-[20px]">
                <p className="w-[55%]">Sản phẩm</p>
                <p className="w-[20%] text-center">Số lượng</p>
                <p className="w-[25%] text-center">Giá</p>
              </div>
              <div className=" overflow-auto h-[275px] scroll-smooth">
                {/* product */}
                {data.map((product) => {
                  return <CartItemCombined data={product}/>
                }
                )}
              </div>
            <div>
              <p className="text-base font-bold p-2 border-b-2">
                Thông tin hóa đơn
              </p>

              <div className="flex justify-between font-bold text-gray-500 p-3 border-b-2">
                <div className="w-1/2 ">
                  <p>Tổng đơn hàng : </p>
                  <p>Phí vận chuyển : </p>
                  <p>Giảm giá : </p>
                  {/* <p className="font-bold text-black">Grand Total : </p> */}
                </div>
                <div className="w-1/3  text-black text-right">
                  <p>{numFormatter(totalPriceProducts)}</p>
                  <p>{numFormatter(shipFee)}</p>
                  <p>{numFormatter(discountPrice)}</p>
                  {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                </div>
              </div>
              <div className="flex justify-between font-bold text-gray-500 p-3 mb-[16px]">
                <div className="w-1/2 ">
                  <p className="font-bold text-black">Tổng hóa đơn : </p>
                </div>
                <div className="w-1/3  text-black text-center">
                  <p className="font-extrabold">{numFormatter(100000)}</p>
                </div>
              </div>
              <Button2 disable={canCheckOut? false : true} text={"xác nhận đặt đơn"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
