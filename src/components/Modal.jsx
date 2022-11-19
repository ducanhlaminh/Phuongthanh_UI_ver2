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
import { filters } from "../ultils/constant";
import { Slider } from "@mui/material";
import { apiGetProductsOfBill2 } from "../apis/bill2";
import StatusBill from "./StatusBill";
import StepperBill from "./StepperBill";
import { NotiStatus } from "./UploadStatus";
import React from "react";
import FormCreateProduct from "./FormCreateProduct";
export const ModalEditCate = ({
  setIsShowEdit,
  selectCate,
  setShowUpload,
  showUpload,
  setContentUpload,
}) => {
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
    try {
      const res = await ApiCategory.update(bodyFormData);
      if (res.status === 0) {
        setIsShowEdit(false);
        setShowUpload(!showUpload);
        setContentUpload(res);
        dispatch(actions.getCategory());
      } else {
        setIsShowEdit(false);
        setShowUpload(!showUpload);
        setContentUpload(res);
      }
    } catch (error) {
      setIsShowEdit(false);
      setShowUpload(!showUpload);
    }
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
          text="SỬA GIAN HÀNG"
          bgColor="#4ed14b"
          textColor="#fff"
          width="100%"
          height="3"
          onClick={Submit}
        ></Button>
      </div>
    </div>
  );
};
export const ModalCreateCate = ({
  setIsShowCreate,
  setShowUpload,
  showUpload,
  setContentUpload,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState({});
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("valueVi", newCategory);
    bodyFormData.append("color", color);
    bodyFormData.append("image", image);

    try {
      const res = await ApiCategory.create(bodyFormData);
      if (res.status === 0) {
        setIsShowCreate(false);
        setShowUpload(!showUpload);
        setContentUpload(res);
        dispatch(actions.getCategory());
      } else {
        setIsShowCreate(false);
        setShowUpload(!showUpload);
        setContentUpload(res);
      }
    } catch (error) {
      setIsShowCreate(false);
      setShowUpload(!showUpload);
    }
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
            text="THÊM GIAN HÀNG"
            bgColor="#4ed14b"
            textColor="#fff"
            width="full"
            height="3"
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

export const PopupDeleteCate = ({
  setIsDelete,
  selectCate,
  setShowUpload,
  showUpload,
  setContentUpload,
}) => {
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
          text="XÓA GIAN HÀNG"
          bgColor="#4ed14b"
          textColor="#fff"
          width="100%"
          height="3"
          onClick={async () => {
            try {
              const res = await ApiCategory.delete({ id: [selectCate.id] });
              if (res.status === 0) {
                setIsDelete(false);
                setShowUpload(!showUpload);
                setContentUpload(res);
                dispatch(actions.getCategory());
              } else {
                setIsDelete(false);
                setShowUpload(!showUpload);
                setContentUpload(res);
              }
            } catch (error) {
              setIsDelete(false);
              setShowUpload(!showUpload);
            }
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
  products,
  setAddDeletes,
  product,
  setProduct,
  contentUpload,
  showUpload,
  setShowUpload,
  setContentUpload,
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
            try {
              if (product) {
                const res = await ApiProduct.delete({ id: [product] });
                if (res.status === 0) {
                  setProduct();
                  setAddDeletes((prev) =>
                    ![...prev].some((item) => item === product)
                      ? [...prev]
                      : [...prev].filter((item) => item !== product)
                  );
                  setIsDelete(!isDelete);
                  setShowUpload(true);
                  setContentUpload(res);
                  setIsLoading(!isLoading);
                }
              } else {
                const res = await ApiProduct.delete({ id: [...products] });
                if (res.status === 0) {
                  setAddDeletes([]);
                  setIsDelete(!isDelete);
                  setShowUpload(true);
                  setContentUpload(res);
                  setIsLoading(!isLoading);
                }
              }
            } catch (error) {
              setAddDeletes([]);
              setIsDelete(!isDelete);
              setShowUpload(true);
              setIsLoading(!isLoading);
            }
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
  const [productName, setProductName] = useState(product.name);
  const [selectValue, setSelectValue] = useState("");
  const [price, setPrice] = useState(product.costPerUnit);
  const [tags, setTags] = useState([]);
  const [shortDes, setShortDes] = useState(product.description);
  const [image, setImage] = useState({
    imageMain: product.mainImage,
    image1: product.image1,
    image2: product.image2,
    image3: product.image3,
  });
  const [variants, setVariants] = useState(product.variants);
  const [variantValue, setVariantValue] = useState({ name: "", value: [] });
  const [variantChild, setVariantChild] = useState({ type: "", price: "" });
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
          className=" w-[1000px]  rounded  flex flex-col  items-center z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FormCreateProduct
            productName={productName}
            setProductName={setProductName}
            categories={categories}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            price={price}
            setPrice={setPrice}
            tags={tags}
            setTags={setTags}
            setVariantChild={setVariantChild}
            variantChild={variantChild}
            setVariants={setVariants}
            variants={variants}
            image={image}
            shortDes={shortDes}
            setImage={setImage}
          />
        </div>
      </div>
    </>
  );
};
export const Profile = ({
  billCurrent,
  setIsShow,
  setShowUpload,
  showUpload,
  setContentUpload,
  contentUpload,
}) => {
  const steps = ["pending", "shipping", "completed", "cancel"];
  const [productsBill, setProductBill] = useState([]);
  const numActive = steps.findIndex((item) => billCurrent.status === item);
  const [activeStep, setActiveStep] = useState(numActive);
  useEffect(() => {
    const fetchProductsBill = async () => {
      const res = await apiGetProductsOfBill2(billCurrent.id);
      setProductBill(res.billData);
    };
    fetchProductsBill();
  }, [contentUpload]);
  const addressBill = JSON.parse(billCurrent.addressData.address);
  const address = `${addressBill.province}`;
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
          <div className="w-1/2 items-center bg-white rounded justify-center flex p-5 h-[680px] ">
            <div className="rounded bg-gray-200 w-[90%] h-1/2 p-3">
              <h1 className="text-xl bold text-center mb-5">
                THÔNG TIN ĐƠN HÀNG
              </h1>
              <div className="mb-5 h-1/2 flex items-center">
                <div className="h-[100px]">
                  <img
                    src={avatar}
                    alt=""
                    className="h-full rounded-full pr-3"
                  />
                </div>

                <div className="w-fit px-5`">
                  {/* <div className="">
                    <b className="">Tên người dùng : </b>
                    {billCurrent?.name ? billCurrent?.name : ""}
                  </div> */}
                  <div className="flex">
                    <p className="">
                      <b>Tên người mua : </b>
                      {billCurrent?.addressData?.name
                        ? billCurrent?.addressData?.name
                        : ""}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="">
                      <b>Số điện thoại : </b>
                      {billCurrent?.addressData?.phone
                        ? billCurrent?.addressData?.phone
                        : ""}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="">
                      <b>Địa chỉ : </b>
                      {address}
                    </p>
                  </div>
                </div>
              </div>
              <StepperBill
                active={activeStep}
                setActive={setActiveStep}
                billCur={billCurrent}
                showUpload={showUpload}
                setShowUpload={setShowUpload}
                setContentUpload={setContentUpload}
                setIsShow={setIsShow}
              />
            </div>
          </div>
          <div className="w-1/2 items-center bg-[#d9d9d9] rounded  flex-col flex p-5 h-[680px] ">
            <div className="w-4/5 bg-white h-full rounded">
              <div className="h-[15%] flex items-center justify-center">
                <b>ĐƠN HÀNG</b>
              </div>
              <hr />

              <div className="h-[85%] overflow-auto relative">
                {productsBill?.map((product) => {
                  return (
                    <div className="h-[25%] flex m-3 border-b-2">
                      <div className="w-[80%] flex h-full ">
                        <div className="w-1/3 ">
                          <img
                            src={product.products?.mainImage}
                            alt=""
                            className="object-cover h-full w-full rounded-xl"
                          />
                        </div>

                        <div className="flex flex-auto flex-col justify-between pl-5">
                          <b className="text-sm">{product?.products?.name}</b>
                          <p className="text-xs">Ngày đặt: 12/08/2022</p>
                        </div>
                      </div>
                      <div className="w-[20%] flex flex-col justify-between">
                        <div className="flex justify-end">
                          <div className="border rounded px-3 py-1 text-center text">
                            {product?.qty}
                          </div>
                        </div>

                        <div className="text-sm">
                          <b>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.cost)}
                          </b>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="absolute bottom-0 h-[70px] z-200 bg-gray-200 w-full flex  justify-between p-3">
                  {/* Trang thai don hang */}

                  <StatusBill status={billCurrent.status} />
                  {/* Gia ship , Total */}
                  <div className="">
                    <div className="flex flex-col items-end justify-between">
                      <div className="border-2 border-b-gray-400 ">
                        <div className=" text-right">
                          <span>Giá vận chuyển :</span>
                          <span>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(billCurrent?.shipPrice)}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <div className="font-bold">
                          <span>Tổng hóa đơn : </span>
                          <span>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(billCurrent?.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const FilterProductsMobile = ({
  setSelectedFilter,
  selectedFilter,
  setIsShow,
  handleChange2,
  value,
  numFormatter,
  handleChange,
  setSelectedFilterSider,
  filtersSider,
  selectedFilterSider,
}) => {
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 bg-gray-500/[.09] drop-shadow-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div
          className="h-[40%] w-full absolute bottom-0 bg-white rounded-t-3xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="h-[15%] text-base flex justify-center items-center
          "
          >
            <span>Lọc theo</span>
          </div>
          <hr />
          <div className="flex flex-col justify-around h-[85%] px-5">
            {filters.map((filter) => {
              const value = JSON.stringify(filter);
              return (
                <div className="" key={filter.valueVi}>
                  <input
                    type="radio"
                    value={value}
                    onChange={(e) => {
                      setSelectedFilter(JSON.parse(e.target?.value));
                    }}
                    checked={JSON.stringify(selectedFilter) === value}
                  />
                  <label className="ml-5" htmlFor="">
                    {filter.valueVi}
                  </label>
                </div>
              );
            })}
            {filtersSider?.map((filter) => (
              <div className="flex">
                <input
                  type="checkbox"
                  checked={
                    selectedFilterSider.some((item) => item.valueVi) ? 1 : 0
                  }
                  value={JSON.stringify(filter)}
                  className=""
                  onClick={() => {
                    setSelectedFilterSider((prev) => {
                      return prev.some(
                        (item) => item.valueVi === filter.valueVi
                      )
                        ? prev.filter((item) => item.valueVi !== filter.valueVi)
                        : [...prev, filter];
                    });
                  }}
                />
                <label htmlFor="" className="ml-5">
                  {filter.valueVi}
                </label>
              </div>
            ))}
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleChange2}
              valueLabelDisplay="on"
              step={10000000}
              marks
              disableSwap
              max={100000000}
              valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
            />
          </div>
        </div>
      </div>
    </>
  );
};
