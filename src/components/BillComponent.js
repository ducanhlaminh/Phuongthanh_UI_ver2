import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Profile } from "../components/Modal";
export function BillComponnets({ bill, i }) {
  const [selectedBill, setSelectedBill] = useState({});
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      {isShow && (
        <Profile
          isShow={isShow}
          setIsShow={setIsShow}
          billCurrent={selectedBill}
        />
      )}
      <div
        key={bill?.id}
        className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px]  text-xl "
      >
        <div className="w-[5%] flex justify-center">{i + 1}</div>

        <div className="w-[20%] flex justify-center">
          <p>{bill?.customer_email}</p>
        </div>
        <div className="w-[20%] flex justify-center">
          <p>{bill?.customer_address}</p>
        </div>
        <div className="w-[15%] flex justify-center">
          <p>{bill?.customer_phone}</p>
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
