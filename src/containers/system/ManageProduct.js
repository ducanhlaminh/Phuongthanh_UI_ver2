import { Button } from "../../components/Button";
import image from "../../assets/temp.png";
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

const ManageProduct = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.app);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addAll, setAddAll] = useState(false);
  const [addDelete, setAddDelete] = useState([]);

  const [selectProduct, setSelectProduct] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectFilter, setSelectFilter] = useState(filters[0]);

  // reload products theo category
  useEffect(() => {
    categories.length > 0 && setSelectValue(categories[0].code);
  }, [categories]);

  // console.log(selectFilter);


  useEffect(() => {
    const filter = Object.values(selectFilter.sort);
    selectValue &&
      dispatch(
        actions.getProduct({
          categoryCode: selectValue,
          order: [...filter],
        })
      );

  }, [selectValue, isLoading, selectFilter]);

  if (addAll) {
    const checkboxs = [...document.querySelectorAll(".checkbox")];
    checkboxs.map((checkbox) => {
      checkbox.checked = "checked";
    });
  } else {
    const checkboxs = [...document.querySelectorAll(".checkbox")];
    checkboxs.map((checkbox) => {
      checkbox.checked = false;
    });
  }

  // Compontent products

  const renderProductList = products?.map((product, i) => {
    return (
      <div
        key={product.id}
        className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px]  text-xl "
      >
        <div className="w-[10%] flex justify-center">
          <input
            type="checkbox"
            className="h-[17.5px] w-[17.5px] checkbox"

          ></input>
        </div>
        <div className=" w-[10%] flex justify-center h-4/5">
          <img
            src={product.mainImage}
            alt=""
            className="object-cover w-full"
          ></img>
        </div>
        <div className="w-[20%] flex justify-center ">
          <div className="w-full">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {product.name}
            </p>
          </div>
        </div>
        <div className="w-[20%] flex justify-center">
          <p>{product?.category?.value}</p>
        </div>
        <div className="w-[15%] flex justify-center">
          <p>
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(product?.costPerUnit)}
          </p>
        </div>
        <div className="flex w-[20%] justify-around ">
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
              setAddDelete((prev) => ([...prev, product.id]));
            }}
          ></Button>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full">
      <h1 className="text-3xl">Quản lí sản phẩm</h1>

      <div className="flex items-center bg-[#d9d9d9] rounded p-3 justify-between p-5">
        <div className="w-[30%] pl-[30px] flex items-center justify-around text-xl ">
          <input
            type="checkbox"
            className="h-[17.5px] w-[17.5px]"
            onClick={() => {
              setAddAll(!addAll);
            }}
          ></input>
          <div className="font-bold ">
            <p> Đã chọn: {addDelete.length}</p>
          </div>
          <Button
            text="Xóa"
            bgColor="#cf2b2b"
            textColor="#fff"
            width="40%"
            height="2"
          ></Button>
        </div>
        <div className="flex justify-between w-[50%] h-[40px]">
          <div className="flex items-center w-[50%] ">
            {/* <InputCustomWidth />

            <FiSearch className="ml-2 cursor-pointer text-2xl hover:text-gray-500" /> */}

            <SelectCustomWidth
              label="Loc"
              widthP="full"
              options={filters}
              selectValue={selectFilter}
              setSelectValue={setSelectFilter}
            />
          </div>
          <div className="flex items-center w-[40%] ">
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

      <div className="bg-[#d9d9d9] p-5 rounded-[10px] mt-5 h-[525px] ">
        <div className="flex pb-5 h-1/8">
          <div className="w-[5%] flex justify-center font-bold text-2xl"></div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Hình ảnh
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Tên sản phẩm
          </div>
          <div className="w-[30%] flex justify-center font-bold text-xl">
            Loại hàng
          </div>
          <div className="w-[5%] flex justify-center font-bold text-xl">
            Giá
          </div>
        </div>
        <div className="h-4/5 overflow-auto">{renderProductList}</div>
      </div>
      {isDelete ? (
        <PopupDeleteProduct
          setIsDelete={setIsDelete}
          isDelete={isDelete}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          product={addDelete}
          selectValue={selectValue}
          setAddDelete={setAddDelete}
        // cate={cateProdcut}
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
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageProduct;
