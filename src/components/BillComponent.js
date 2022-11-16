import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Profile } from "../components/Modal";
export function BillComponnets({
  bill,
  i,
  addressData,
  setShowUpload,
  showUpload,
  setContentUpload,
  contentUpload,
}) {
  const [selectedBill, setSelectedBill] = useState({});
  const [isShow, setIsShow] = useState(false);
  const address = JSON.parse(addressData);
  console.log(bill);
  return (
    <>
      {isShow && (
        <Profile
          isShow={isShow}
          setIsShow={setIsShow}
          billCurrent={selectedBill}
          address={`${address.province} - ${address.district} - ${address.ward} `}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          contentUpload={contentUpload}
        />
      )}

      <div
        key={bill?.id}
        className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px]  text-xl "
      >
        <div className="w-[5%] flex justify-center">{i + 1}</div>

        <div className="w-[20%] flex justify-center">
          <p>{bill?.addressData?.name}</p>
        </div>
        <div className="w-[20%] flex justify-center">
          <p>{`${address?.province} - ${address?.district} - ${address?.ward}`}</p>
        </div>
        <div className="w-[15%] flex justify-center">
          <p>{bill?.addressData?.phone}</p>
        </div>
        <div className="flex w-[20%] justify-around ">
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(bill?.totalCost)}
        </div>
        <div className="w-[20%] flex justify-center">
          <Button
            text="Xem chi tiet"
            bgColor="#4ed14b"
            textColor="#fff"
            width="80%"
            height="3"
            onClick={() => {
              setSelectedBill(bill);
              setIsShow(true);
            }}
          ></Button>
        </div>
      </div>
    </>
  );
}
