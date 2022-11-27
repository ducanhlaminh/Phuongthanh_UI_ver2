import { Button } from "../../components/Button";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  InputCustomWidth,
  SelectCustomWidth,
} from "../../components/InputCtWidth";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { PopupDeleteProduct, EditProduct } from "../../components/Modal";
import { filters } from "../../ultils/constant";
import Pagination from "@mui/material/Pagination";
import { NotiStatus } from "../../components/UploadStatus";
import { LoadingPageDesktop } from "../../components/LoadingPage";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => {
    return state.app;
  });
  const { products, count } = useSelector((state) => {
    return state.products;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addDeletes, setAddDeletes] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState();
  const [selectProduct, setSelectProduct] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectFilter, setSelectFilter] = useState(filters[0]);
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [search, setSearch] = useState("");
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // reload products theo category
  useEffect(() => {
    categories.length > 0 && setSelectValue(categories[0].code);
  }, [categories]);

  useEffect(() => {
    setAddDeletes([]);
  }, [selectValue]);

  useEffect(() => {
    console.log(search);
    const filter = Object.values(selectFilter.sort);
    selectValue &&
      dispatch(
        actions.getProducts({
          categoryCode: selectValue,
          order: [...filter],
          limitProduct: 7,
          page: page,
          name: search,
        })
      );
  }, [selectValue, isLoading, selectFilter, page, search]);

  // Compontent products

  const renderProductList = products?.map((product, i) => {
    return (
      <div
        key={product.id}
        className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full h-[120px]  text-xl "
      >
        <div className="w-[10%] flex justify-center">
          <input
            type="checkbox"
            className="h-[17.5px] w-[17.5px]"
            value={product.id}
            onClick={(e) => {
              setAddDeletes((prev) =>
                ![...prev].some((item) => item === e.target.value)
                  ? [...prev, e.target.value]
                  : [...prev].filter((item) => item !== e.target.value)
              );
            }}
            checked={addDeletes.some((item) => product.id === item)}
          ></input>
        </div>
        <div className=" w-[20%] flex justify-center h-4/5">
          <img
            src={product.mainImage}
            alt=""
            className="object-cover w-[70%]"
          ></img>
        </div>
        <div className="w-[20%] flex justify-center ">
          <div className="w-full ">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis p-3">
              {product.name}
            </p>
          </div>
        </div>
        <div className="w-[20%]">
          {product?.variants.map((item) => (
            <div
              key={item.name}
              className="flex justify-center outline outline-primary outline-1 p-2 rounded-xl [&:not(:last-child)]:mb-[10px]"
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="w-[15%] flex justify-center">
          <p>
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(product?.costPerUnit)}
          </p>
        </div>
        <div className="flex w-[15%] justify-around ">
          <Button
            text="Sửa"
            bgColor="#4ed14b"
            textColor="#fff"
            width="40%"
            onClick={() => {
              setIsShowEdit(true);
              setSelectProduct(product);
            }}
          ></Button>

          <Button
            text="Xóa"
            bgColor="#cf2b2b"
            textColor="#fff"
            width="40%"
            height="2"
            onClick={() => {
              setIsDelete(!isDelete);
              setSelectedDelete(product.id);
            }}
          ></Button>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full">
      <h1 className="text-3xl">Quản lý sản phẩm</h1>

      <div className="flex items-center bg-[#d9d9d9] rounded p-3 justify-between ">
        {showUpload && (
          <NotiStatus
            active={contentUpload?.status === 0 ? "success" : "error"}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Xóa sản phẩm thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        )}
        <div className="w-[30%] pl-[30px] flex items-center justify-around text-xl ">
          <div className="font-bold ">
            <p> Đã chọn: {addDeletes.length}</p>
          </div>
          <Button
            text="Xóa nhiều sản phẩm"
            bgColor="#cf2b2b"
            textColor="#fff"
            width="60%"
            height="2"
            onClick={() => {
              setIsDelete(!isDelete);
            }}
          ></Button>
        </div>
        <div className="flex justify-around w-[70%] h-[40px]">
          <div className=" w-[40%] flex items-center">
            <InputCustomWidth
              placeholder="Tìm kiếm...."
              value={search}
              setValue={setSearch}
            />
            <div className=" h-full flex items-center">
              <FiSearch className="ml-2 cursor-pointer text-2xl hover:text-gray-500" />
            </div>
          </div>
          <div className="flex items-center w-[30%] ">
            <SelectCustomWidth
              label="Loc"
              widthP="full"
              options={filters}
              selectValue={selectFilter}
              setSelectValue={setSelectFilter}
            />
          </div>
          <div className="flex items-center w-[30%] ">
            <SelectCustomWidth
              label="Loại hàng"
              widthP="full"
              options={categories}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#d9d9d9] pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl  h-[600px] flex flex-col">
        <div className="flex h-[50px] ">
          <div className="w-[10%] flex justify-center font-bold text-2xl"></div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Hình ảnh
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tên sản phẩm
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Loại hàng
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Giá
          </div>
        </div>
        <div className="h-5/6 overflow-auto relative">
          {loading ? <LoadingPageDesktop /> : renderProductList}
        </div>
        <div className="flex justify-center w-full flex-auto items-end p-2">
          <Pagination
            count={Math.ceil(count / 7)}
            color="primary"
            size="large"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
      {isDelete ? (
        <PopupDeleteProduct
          setIsDelete={setIsDelete}
          isDelete={isDelete}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          products={addDeletes}
          selectValue={selectValue}
          setAddDeletes={setAddDeletes}
          product={selectedDelete}
          setProduct={setSelectedDelete}
          contentUpload={contentUpload}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
        />
      ) : (
        ""
      )}
      {isShowEdit ? (
        <EditProduct
          isShowEdit={isShowEdit}
          setIsShowEdit={setIsShowEdit}
          product={selectProduct}
          categories={categories}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          category={selectValue}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageProduct;
