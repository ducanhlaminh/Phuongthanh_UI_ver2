const Voucher = ({ Vouchers }) => {
  if (Vouchers.length > 0) {
    Vouchers.map((voucher, i) => (
      <div
        className="w-[328px] h-[75px] border-[1px] border-primary rounded-[8px]"
        key={i}
      >
        <div>
          <p></p>
        </div>
        <div></div>
      </div>
    ));
  } else {
    return (
      <div className="w-[328px] h-[75px] border-[1px] border-primary rounded-[8px] flex items-center justify-center">
        <p className="text-[14px] font-medium text-black">Hiện tại chưa có voucher cho sản phẩm này</p>
      </div>
    );
  }
};

export default Voucher;
