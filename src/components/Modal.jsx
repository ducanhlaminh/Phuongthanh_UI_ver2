import {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
} from "./InputCtWidth";
import Button from "./Button";
import { useState, useEffect } from "react";
import ApiCategory from "../apis/category";
import ApiProduct from "../apis/product";
import * as actions from "../../src/store/actions";
import { useDispatch } from "react-redux";
import avatar from "../assets/avatar-anon.png";

export const ModalEditCate = ({ setIsShowEdit, selectCate }) => {
  const [newCategory, setNewCategory] = useState(`${selectCate.valueVi}`);
  const [newColor, setNewColor] = useState(`${selectCate.color}`);
  const [image, setImage] = useState({});

  const dispatch = useDispatch();
  const Submit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("valueVi", newCategory);
    bodyFormData.append("id", selectCate.id);
    bodyFormData.append("color", newColor);
    bodyFormData.append("image", image);
    await ApiCategory.update(bodyFormData);
    dispatch(actions.getCategory());
    setIsShowEdit(false);
  };

  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowEdit(false);
      }}
    >
      <div
        className=" w-[500px] h-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>SỬA THÔNG TIN GIAN HÀNG</b>
        <div className="h-[10%] w-full my-5 border rounded-lg">
          <InputCustomWidth
            value={newCategory}
            setValue={setNewCategory}
            label="Ten gian hang"
            widthP="full"
            placeholder="Ten gian hang..."
          ></InputCustomWidth>
        </div>
        <div className="h-[10%] w-full my-5 border rounded-lg">
          <InputCustomWidth
            value={newColor}
            setValue={setNewColor}
            label="Color"
            widthP="full"
            placeholder="Color..."
          ></InputCustomWidth>
        </div>
        <div className="h-[10%] w-full my-5">
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
            }}
          />
        </div>
        <Button
          text="Sửa"
          bgColor="#4ed14b"
          textColor="#fff"
          width="40%"
          height="2"
          onClick={Submit}
        ></Button>
      </div>
    </div>
  );
};
export const ModalCreateCate = ({ setIsShowCreate }) => {
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState({});
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("valueVi", newCategory);
    bodyFormData.append("color", color);
    bodyFormData.append("image", image);
    await ApiCategory.create(bodyFormData);
    dispatch(actions.getCategory());
  };
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowCreate(false);
      }}
    >
      <div
        className=" w-[500px] h-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>THÊM GIAN HÀNG</b>
        <div className="h-full flex flex-col justify-evenly">
          <div className=" h-[15%] border rounded ">
            <InputCustomWidth
              widthP="full"
              value={newCategory}
              setValue={setNewCategory}
              placeholder="New Category"
            ></InputCustomWidth>
          </div>
          <div className=" h-[15%] border rounded">
            <InputCustomWidth
              widthP="full"
              value={color}
              setValue={setColor}
              placeholder="Color"
            ></InputCustomWidth>
          </div>
          <h1>Ảnh cho gian hàng mới</h1>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />

          <Button
            text="Them"
            bgColor="#4ed14b"
            textColor="#fff"
            width="20%"
            onClick={() => {
              onSubmit();
              setIsShowCreate(false);
            }}
          ></Button>

          {/* <button
              type="button"
              onClick={() => {
                onSubmit(value);
              }}
              className="h-[50px] w-[50px]"
            >
              Submit
            </button> */}
        </div>
      </div>
    </div>
  );
};

export const PopupDeleteCate = ({ setIsDelete, selectCate }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        setIsDelete(false);
        e.stopPropagation();
      }}
    >
      <div
        className=" w-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>BẠN CHẮC MUỐN XÓA GIAN HÀNG NÀY CHỨ </b>
        <Button
          text="Sửa"
          bgColor="#4ed14b"
          textColor="#fff"
          width="40%"
          height="2"
          onClick={async () => {
            await ApiCategory.delete({ id: [selectCate.id] });
            setIsDelete(false);
            dispatch(actions.getCategory());
          }}
        ></Button>
      </div>
    </div>
  );
};

export const PopupDeleteProduct = ({
  setIsDelete,
  setIsLoading,
  isLoading,
  isDelete,
  product,
  cate,
  selectValue,
  setAddDelete,
}) => {
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        setIsDelete(false);
        e.stopPropagation();
      }}
    >
      <div
        className=" w-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>BẠN CHẮC MUỐN XÓA SẢN PHẨM NÀY CHỨ </b>
        <Button
          text="XÓA"
          bgColor="#4ed14b"
          textColor="#fff"
          width="40%"
          height="2"
          onClick={async () => {
            await ApiProduct.delete({ id: [...product] });
            setAddDelete([]);
            setIsDelete(!isDelete);
            setIsLoading(!isLoading);
            cate(selectValue);
          }}
        ></Button>
      </div>
    </div>
  );
};

export const EditProduct = ({
  setIsShowEdit,
  setIsLoading,
  isLoading,
  categories,
  product,
}) => {
  const [productName, setProductName] = useState(product ? product.name : "");
  const [selectValue, setSelectValue] = useState("");
  const [price, setPrice] = useState(product ? product.costPerUnit : "");
  const [tags, setTags] = useState([]);
  const [shortDes, setShortDes] = useState();
  const [image, setImage] = useState({
    imageMain: {},
    image1: {},
    image2: {},
    image3: {},
  });

  const handleSubmit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("mainImage", image.imageMain);
    bodyFormData.append("image1", image.image1);
    bodyFormData.append("image2", image.image2);
    bodyFormData.append("image3", image.image3);
    bodyFormData.append("name", productName);
    bodyFormData.append("costPerUnit", price);
    bodyFormData.append("id", product.id);
    bodyFormData.append("description", shortDes);
    bodyFormData.append("categoryCode", product.categoryData.code);
    const res = await ApiProduct.update(bodyFormData, product.id);
    if (res.status === 0) {
      setIsLoading(!isLoading);
      setIsShowEdit(false);
    }
  };

  // if (imageMain !== "") imageMain?.preview = URL.createObjectURL(imageMain);
  // if (image1 !== "") image1.preview = URL.createObjectURL(image1);
  // if (image2 !== "") image2.preview = URL.createObjectURL(image2);
  // if (image3 !== "") image3.preview = URL.createObjectURL(image3);
  // useEffect(() => {}, [imageMain]);
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
        onClick={(e) => {
          setIsShowEdit(false);
          e.stopPropagation();
        }}
      >
        <div
          className=" w-[600px]  rounded  flex flex-col  items-center z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full items-center bg-[#d9d9d9] rounded justify-between p-5 h-[500px]">
            <h1 className="text-3xl text-center">Nhập thông tin tại đây</h1>
            <div className="h-[20%]">
              <InputCustomWidth
                widthP={"full"}
                lable="Tên sản phẩm "
                placeholder="Tên sản phẩm..."
                PLarge={true}
                value={productName}
                setValue={setProductName}
              />
            </div>

            <div className="flex h-1/5 justify-between">
              <div className="flex w-[60%] ">
                <SelectCustomWidth
                  widthP="[30%]"
                  lable="Loại hàng"
                  options={categories}
                  selectValue={product.categoryData.valueVi}
                  setSelectValue={setSelectValue}
                />
                <InputCustomWidth
                  widthP="[30%]"
                  lable="Giá"
                  placeholder="Giá: VND"
                  PLarge={false}
                  value={price}
                  setValue={setPrice}
                />
              </div>

              <HashTagCustomWidth
                widthP="[40%]"
                lable="Hash_Tag"
                placeholder="Tag..."
                tags={tags}
                setTags={setTags}
              />
            </div>
            <div className="flex">
              <div className=" w-[46%] mr-[24px]">
                <div className="h-1/2 ">
                  <InputCustomWidth
                    widthP={"full"}
                    lable="Miêu tả ngắn gọn"
                    placeholder="Miêu tả..."
                    PLarge={true}
                    value={shortDes}
                    setValue={setShortDes}
                  />
                </div>
                <TextCustomWidth
                  widthP="full"
                  lable="Miêu tả chi tiết"
                  placeholder="Miêu tả chi tiết tại đây..."
                />
              </div>
              <div className=" w-[50%]">
                <input
                  type="file"
                  name="imageMain"
                  onChange={(e) => {
                    setImage((prev) => ({
                      ...prev,
                      mainImage: e.target.files[0],
                    }));
                  }}
                />
                <input
                  type="file"
                  name="image1"
                  onChange={(e) => {
                    setImage((prev) => ({
                      ...prev,
                      image1: e.target.files[0],
                    }));
                  }}
                />
                <input
                  type="file"
                  name="image2"
                  onChange={(e) => {
                    setImage((prev) => ({
                      ...prev,
                      image2: e.target.files[0],
                    }));
                  }}
                />
                <input
                  type="file"
                  name="image3"
                  onChange={(e) => {
                    setImage((prev) => ({
                      ...prev,
                      image3: e.target.files[0],
                    }));
                  }}
                />
                {/* <InputFileCustomWidth
                  lable="Ảnh 1"
                  widthP="[100%]"
                  valueImg={image1}
                  setValueImg={setImage1}
                />
                <InputFileCustomWidth
                  lable="Ảnh 2"
                  widthP="[100%]"
                  valueImg={image2}
                  setValueImg={setImage2}
                />
                <InputFileCustomWidth
                  lable="Ảnh 3"
                  widthP="[100%]"
                  valueImg={image3}
                  setValueImg={setImage3}
                />*/}
              </div>
              <Button text="Submit" onClick={handleSubmit}></Button>
            </div>
          </div>
          {/* <h1 className="text-3xl">Xem trước tại đây</h1>
        <div className="w-full items-center bg-[#d9d9d9] rounded p-3 justify-between p-5">
          <div className="flex">
              <div className="mr-[30px]">
                <ProductCardCtHeight
                  image={imageMain?.preview}
                  name={productName}
                  description={shortDes}
                  costPerUnit={price}
                  color={"#4ed14b"}
                />
              </div>
              <div>
                <p>Xem trước chi tiết sản phẩm trên mobile tại đây</p>
                <div className="w-[500px] ">
                  <div className="w-[375px] ml-[25%]">
                    <GroupImageCtWidth
                      widthP="full"
                      mainImage={imageMain?.preview}
                      image1={image1.preview}
                      image2={image2.preview}
                      image3={image3.preview}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[12px]">
              <p>Xem trước chi tiết sản phẩm trên desktop tại đây</p>

              <GroupImageCtWidth
                widthP="400px"
                mainImage={imageMain?.preview}
              />
            </div>
        </div> */}
        </div>
      </div>
    </>
  );
};
export const Profile = ({ userCurrent, setIsShow }) => {
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div
          className=" w-4/5 rounded flex items-center z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-1/2 items-center bg-white rounded justify-center flex p-5 h-[500px] ">
            <div className="rounded bg-gray-200 w-[90%] h-1/2 p-3">
              <h1 className="text-xl bold text-center mb-5">
                THÔNG TIN CÁ NHÂN
              </h1>
              <div className=" rounded-full mb-5 h-1/2 flex items-center">
                <img src={avatar} alt="" className="h-full rounded-full" />
                <div className="w-4/5 px-10">
                  {/* <div className="">
                    <b className="">Tên người dùng : </b>
                    {userCurrent?.name ? userCurrent?.name : ""}
                  </div> */}
                  <div className="flex">
                    <p className="">
                      <b>Email : </b>
                      {userCurrent.customer_email
                        ? userCurrent.customer_email
                        : ""}
                    </p>
                  </div>
                  <div className="">
                    <p className="">
                      <b>Số điện thoại : </b>
                    </p>
                    <b className="">Số điện thoại</b>
                    {userCurrent.customer_phone
                      ? userCurrent.customer_phone
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 items-center bg-[#d9d9d9] rounded  flex-col flex p-5 h-[500px] ">
            <div className="w-4/5 bg-white h-full rounded">
              <div className="h-[15%] flex items-center justify-center">
                <b>ĐƠN HÀNG</b>
              </div>
              <hr />

              <div className="h-[85%] overflow-auto ">
                {userCurrent.products.map((product) => {
                  console.log(product);
                  return (
                    <div className="h-[25%] flex m-3 border-b-2">
                      <div className="w-[80%] flex h-full ">
                        <img
                          src={product.product_mainImage}
                          alt=""
                          className="h-full "
                        />
                        <div className="flex flex-col justify-between">
                          <b className="text-sm">{product.product_name}</b>
                          <p className="text-xs">Ngày đặt: 12/08/2022</p>
                        </div>
                      </div>
                      <div className="w-[20%] flex flex-col justify-between">
                        <div className="flex justify-end">
                          <div className="border rounded h-[85%] w-[35%] text-center text">
                            {product.product_quantity}
                          </div>
                        </div>

                        <div className="text-sm">
                          <b>{product.product_totalCost}</b>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
