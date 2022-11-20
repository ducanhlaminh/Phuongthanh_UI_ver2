import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiAddress from "../../apis/ApiAddress";
import { Button2, LongButton } from "../../components";
import AppBar from "../../components/AppBar";
import BreadCrumb from "../../components/BreadCrumb";
import CartItemCombined from "../../components/CartItemCombined";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import * as actions from "../../store/actions";
import AddAddressPopup from "../../triggercompoents/AddAddressPopup";
import { numFormatter } from "../../ultils/fn";
import ApiCheckout from "../../apis/bill2";


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
  const [detailAddress, setDetailAddress] = useState("");
  const [selected, setSelected] = useState(true);
  const [showPopupAddress, setShowPopupAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState({id:"",code:{}});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [shipFee, setShipFee] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [canCheckOut, setCanCheckOut] = useState(false);
  const [dataBill, setDataBill] = useState([])
  const dispatch = useDispatch();

  //GET BILL
  useEffect(() => {
    const getBillInfo =  async () => {
      const res = await ApiCheckout.get();
      if(res.status === 0){
        const billsDetail =  res?.products || []
        billsDetail.map((billDetail) => {
          let data = {
            id: billDetail?.pid,
            mainImage: billDetail?.product?.mainImage,
            name: billDetail?.product?.name,
            variant: billDetail?.variant,
            price: billDetail?.cost,
            quanity: billDetail?.qty,
          }
          setDataBill(prve => [...prve,data])
        })
      }
    }
    getBillInfo();
  },[])

  //GET ADDRESS
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await ApiAddress.Get();
      if (res.status === 0) setAddress(res?.yourAddress);
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
  const handleAddAdress = () => {
    if(!detailAddress||!provinceCur.ProvinceName||!districtCur.DistrictName||
      !wardCur.WardName||!infoUser.name||!infoUser.phone){
        return;
      }
    const data = {
      address: JSON.stringify({
        detail: detailAddress,
        province: provinceCur.ProvinceName,
        district: districtCur.DistrictName,
        ward: wardCur.WardName,
        code: {
          "to_province_id": provinceCur.ProvinceID,
          "to_district_id":districtCur.DistrictID,
          "to_ward_code":wardCur.WardCode,
        }
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
          setSelected(true);
          setShowPopupAddress(false);
        }
      } catch (err) {
        setShowPopupAddress(false);
        setStatus(false);
        setShowPopup(true);
      }
    };
    add(data);
  };

  //GET FEE SHIP
  const handleGetFeeShip = async () => {
    if(selectAddress.id === "") return
    const res = await ApiCheckout.getFeeShip(selectAddress.code)
    if( res.status === 200 ) setShipFee(res?.data?.data?.total)
  }

  //GET Free ship 
  useEffect(() => {
    if(totalPriceProducts > 500000) {
      setDiscountPrice(shipFee)
      setTotalPrice(totalPriceProducts)
    }
    else {
      setDiscountPrice(0)}
      setTotalPrice(totalPriceProducts+shipFee)
  },[shipFee])

  //GET total products price
  useEffect(() => {
    dataBill?.map((product) =>
      setTotalPriceProducts((prev) => prev + product?.price * product.quanity)
    );
  }, [dataBill]);

  //Checkout Bill
  const handleCheckoutBill = async () => {

  }

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
              {dataBill.map((product) => {
                return <CartItemCombined data={product} />;
              })}
            </div>
          </div>
          <div>
            <div className="flex justify-center mx-[12px] mt-[24px]">
              <span className="font-semibold text-darkGrey pb-2 lg:text-[16px] md:text-[14px] mb-3">
                {address.length > 0
                  ? "Vui lòng chọn địa chỉ giao hàng"
                  : "Chưa có địa chỉ được lưu trước đây"}
              </span>
              <span
                onClick={() => setShowPopupAddress(true)}
                className="font-bold text-primary cursor-pointer"
              >
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
                          selectAddress.id
                            ? selectAddress.id === addres.id
                            : index === 0
                        }
                        onClick={() => setSelectAddress({id:addres.id,code:data.code})}
                        onChange={() => console.log(selectAddress)}
                      />
                      <div
                        className=""
                        onClick={() => setSelectAddress({id:addres.id,code:data.code})}
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
                <p className="font-extrabold">{numFormatter(totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className="mx-[12px] pb-[24px]">
            <Button2
              disable={canCheckOut ? false : true}
              text={"xác nhận đặt đơn"}
            />
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
        <div className="md:ml-[24px] lg:ml-[16px] hidden md:block">
          <BreadCrumb parent={[{name:'Trang chủ',link:"/"}]} current='Thanh toán'></BreadCrumb>
        </div>
        <h2 className=" md:text-[28px] lg:text-[34px] m-5 font-semibold text-primary">
          Địa chỉ giao hàng
        </h2>
        <div className="flex min-h-[650px] bg-white">
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
                    <p className="md:text-[14px] lg:text-[16px] font-medium text-black">
                      Thông tin liên lạc
                    </p>
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
                      <p className="md:text-[14px] lg:text-[16px] font-medium text-black">
                        Địa chỉ giao hàng
                      </p>
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
                    <div className="" onClick={() => handleAddAdress()}>
                      <Button2 text="Xác nhận thêm đại chỉ" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <div className="flex justify-center">
                      <span className="font-semibold text-darkGrey pb-2 lg:text-[16px] md:text-[14px] mb-3">
                        {address.length > 0
                          ? "Vui lòng chọn địa chỉ giao hàng"
                          : "Chưa có địa chỉ được lưu trước đây"}
                      </span>
                    </div>

                    <div className="h-[410px] overflow-auto">
                      {address.length > 0 &&
                        address?.map((addres, index) => {
                          const data = JSON.parse(addres.address);

                          return (
                            <div
                              className="flex pb-3 cursor-pointer w-full"
                              key={addres.id}
                            >
                              <input
                                type="radio"
                                className="mr-4"
                                value={addres.id}
                                checked={
                                  selectAddress.id
                                    ? selectAddress.id === addres.id
                                    : index === 0
                                }
                                onClick={() => setSelectAddress({id:addres.id,code:data.code})}
                                onChange={() => console.log(selectAddress)}
                              />
                              <div
                                className="w-full"
                                onClick={() => setSelectAddress({id:addres.id,code:data.code})}
                              >
                                <div className="flex w-full">
                                  <span>Tên người nhận : </span>
                                  <p>{addres.name}</p>
                                </div>
                                <div className="flex w-full">
                                  <span>Số điện thoại : </span>
                                  <p>{addres.phone}</p>
                                </div>
                                <div className="flex w-full">
                                  <span className="w-[12%]">Địa chỉ :</span>
                                  <p className="font-bold w-[85%]">{`${data.detail}-${data.ward} - ${data.district} - ${data.province}`}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="p-3">
                      <Button2 
                        handleClick={() => handleGetFeeShip()}
                        text="Xác nhận địa chỉ nhận hàng" />
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
              {dataBill.map((product) => {
                return <CartItemCombined data={product} />;
              })}
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
                  <p className="font-extrabold">{numFormatter(totalPrice)}</p>
                </div>
              </div>
              <Button2
                handleClick={() => handleCheckoutBill()}
                disable={canCheckOut ? false||totalPrice === 0 : true}
                text={"xác nhận đặt đơn"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
