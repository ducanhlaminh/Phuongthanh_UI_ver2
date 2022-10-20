function numFormatter(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num); // if value < 1000, nothing to do
}
const CartItem = ({
  name = "Dior Bag",
  image,
  shortDes = "Chistian Dior",
  price = 100000,
  quantity = 2,
}) => {
  return (
    <>
      <div className="mb-3 border-b-2">
        <div className="w-full flex h-[80px]">
          <div className=" w-[50%]">
            <div className="flex h-full ">
              <img
                src="https://centimet.vn/wp-content/uploads/1-7.jpg"
                alt=""
                className="object-cover h-full"
              />
              <div className="p-2 flex flex-col justify-evenly">
                <p className=" font-bold">{name}</p>
                <p className="text-xs">{shortDes}</p>
                <div className="flex bg-slate-300 p-1 rounded-sm">
                  <div className="flex justify-center items-center">
                    <div className="text-xs flex justify-center items-center">
                      <span>Số lượng :</span>
                    </div>
                  </div>
                  <select
                    name=""
                    id=""
                    className="bg-slate-300 text-xs h-[20px]"
                  >
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] text-center">{numFormatter(price)}</div>
          <div className="w-[15%] text-center">3</div>
          <div className="w-[15%] text-center">
            {numFormatter(price * quantity)}
          </div>
        </div>
        <div className="flex justify-end h-[20px] mb-2 font-bold">
          <div className="w-fit flex justify-between">
            <p className=" text-primary border-b-4 border-b-primary pb-5 w-fit cursor-pointer mr-2">
              Add to Wishlist
            </p>
            <p className=" text-red-700 border-b-4 border-b-red-700 pb-5 w-fit cursor-pointer">
              Remove
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
