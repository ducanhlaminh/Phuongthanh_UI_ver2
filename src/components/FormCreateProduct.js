import {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
  InputVariant,
} from "../components/InputCtWidth";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import icons from "../ultils/icons";
import { NotiStatus } from "../components/UploadStatus";
import ApiProduct from "../apis/product";
const { AiFillCheckCircle, BsUpload } = icons;
const FormCreateProduct = ({
  selectProductEdit,
  productName,
  setProductName,
  inStocking,
  setInStocking,
  categories,
  selectValue,
  setSelectValue,
  price,
  setPrice,
  preSale,
  setPreSale,
  tags,
  setTags,
  setVariantChild,
  variantChild,
  setVariants,
  variants,
  image,
  setImage,
  variantValue,
  setVariantValue,
  handleSubmit,
  setShortDes,
  shortDes,
  showUpload,
  contentUpload,
  setShowUpload,
  setContentUpload,
}) => {
  const navigate = useNavigate();
  const imageMainRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const editorRef = useRef();
  const [imageUrl, setImageUrl] = useState({
    imageMain: "",
    image1: "",
    image2: "",
    image3: "",
  });
  const [validatesForm, setValidatesForm] = useState([
    { name: "name", status: false },
    { name: "price", status: false },
    { name: "variant", status: false },
    { name: "image", status: false },
  ]);
  const setContentProduct = () => {
    if (editorRef.current) {
      const des = editorRef.current.getContent();
      setShortDes(des);
    }
  };
  const handleEdit = async () => {
    const status = inStocking ? 1:0
    const bodyFormData = new FormData();
    bodyFormData.append("id", selectProductEdit?.id);
    bodyFormData.append("mainImage", image.imageMain);
    bodyFormData.append("image1", image.image1);
    bodyFormData.append("inStocking",inStocking ? true:false );
    bodyFormData.append("image2", image.image2);
    bodyFormData.append("image3", image.image3);
    bodyFormData.append("name", productName);
    bodyFormData.append("costPerUnit", price);
    bodyFormData.append("description", shortDes);
    bodyFormData.append("categoryCode", selectValue);
    bodyFormData.append("variants", JSON.stringify(variants));
    bodyFormData.append("tags", JSON.stringify(tags));
    const data = {
      bodyFormData,
      preSale,
    };
    try {
      const res = await ApiProduct.update(data);
      if (res.status === 0) {
        setShowUpload(true);
        setContentUpload(res);
        setTimeout(() => {
          navigate(-1);
        }, 5000);
      }
    } catch (error) {
      setContentUpload(true);
    }
  };
  const validateForm = () => {
    if (productName && price && image.imageMain && shortDes && selectValue) {
      return true;
    } else return false;
  };

  const handleImageMain = (e) => {
    setImageUrl((prev) => ({
      ...prev,
      imageMain: URL.createObjectURL(e.target.files[0]),
    }));
    setImage((prev) => ({
      ...prev,
      imageMain: e.target.files[0],
    }));
  };
  const handleImage1 = (e) => {
    setImageUrl((prev) => ({
      ...prev,
      image1: URL.createObjectURL(e.target.files[0]),
    }));
    setImage((prev) => ({
      ...prev,
      image1: e.target.files[0],
    }));
  };
  const handleImage2 = (e) => {
    setImageUrl((prev) => ({
      ...prev,
      image2: URL.createObjectURL(e.target.files[0]),
    }));
    setImage((prev) => ({
      ...prev,
      image2: e.target.files[0],
    }));
  };
  const handleImage3 = (e) => {
    setImageUrl((prev) => ({
      ...prev,
      image3: URL.createObjectURL(e.target.files[0]),
    }));
    setImage((prev) => ({
      ...prev,
      image3: e.target.files[0],
    }));
  };
  useEffect(() => {
    setImageUrl((prev) => ({
      imageMain: image.imageMain,
      image1: image.image1,
      image2: image.image2,
      image3: image.image3,
    }));
  }, []);
  return (
    <div className="w-full items-center bg-[#d9d9d9] rounded justify-between p-5 relative select-none">
      {showUpload && (
        <NotiStatus
          active={contentUpload.status === 0 ? "success" : "error"}
          setActive={setShowUpload}
          content={
            contentUpload.status === 0
              ? "Đã đăng ký sản phẩm thành công"
              : "Có lỗi xảy ra trong quá trình đăng ký"
          }
        />
      )}
      <h1 className="text-3xl text-center font-semibold">
        Nhập thông tin tại đây
      </h1>
      <div className="h-[15%]">
        <InputCustomWidth
          required={!productName ? true : false}
          widthP={"full"}
          lable="Tên sản phẩm "
          placeholder="Tên sản phẩm..."
          PLarge={true}
          value={productName}
          setValue={setProductName}
          setValidatesForm={setValidatesForm}
          validateType={"name"}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex w-[70%] h-full">
          <SelectCustomWidth
            widthP="[30%]"
            lable="Loại hàng"
            options={categories}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
          />
          <InputCustomWidth
            lable="Giá"
            required={!price ? true : false}
            placeholder="Giá: VND"
            value={price}
            setValue={setPrice}
            setValidatesForm={setValidatesForm}
            validateType={"price"}
          />
          <InputCustomWidth
            lable="Giảm giá (%)"
            placeholder="20"
            value={preSale}
            setValue={setPreSale}
            validateType={"price"}
          />
        </div>

        <HashTagCustomWidth
          widthP="[30%]"
          lable="Hash_Tag"
          placeholder="Tag..."
          tags={tags}
          setTags={setTags}
        />
      </div>
      <div className="mb-5 flex">
        <div
          className={`px-5 py-2 bg-[#00C292] rounded-l-md text-white ${
            !inStocking && "opacity-50"
          } cursor-pointer select-none`}
          onClick={() => {
            setInStocking(true);
          }}
        >
          Còn hàng
        </div>
        <div
          className={`px-5 py-2 text-rose-500 bg-[#FECDD3] rounded-r-md ${
            inStocking && "opacity-50"
          } cursor-pointer select-none`}
          onClick={() => {
            setInStocking(false);
          }}
        >
          Hết hàng
        </div>
      </div>
      <div className="flex ">
        <div className=" w-1/2 pr-3">
          <div className="h-[350px]">
            <b>Mô tả sản phẩm :</b>
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => {
                return (editorRef.current = editor);
              }}
              initialValue={shortDes}
              init={{
                max_height: 300,
                width: "full",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "insertdatetime",
                  "media",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | ",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <Button
              text="Thêm mô tả sản phẩm"
              bgColor="#4ed14b"
              textColor="#fff"
              width="100%"
              height={"2"}
              onClick={setContentProduct}
            ></Button>
            {shortDes && (
              <div className="border-primary border-2 mt-2 h-10 rounded-md bg-slate-50 flex justify-center items-center">
                <span className="">Đã cập nhật nội dung sản phẩm</span>
                <span className="text-[#4ed14b] ml-3">
                  <AiFillCheckCircle />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 pl-3">
          <InputVariant
            setVariantChild={setVariantChild}
            setVariants={setVariants}
            variants={variants}
            variantChild={variantChild}
            variantValue={variantValue}
            setVariantValue={setVariantValue}
          />
          <div className="w-full flex flex-wrap">
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh chính
              </label>
              <div
                className="h-[200px] w-[200px] flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => imageMainRef.current.click()}
              >
                {imageUrl.imageMain ? (
                  <img
                    src={imageUrl.imageMain}
                    alt=""
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>

              <input
                className="hidden"
                type="file"
                name="imageMain"
                accept="image/*"
                ref={imageMainRef}
                onChange={handleImageMain}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 1
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image1Ref.current.click()}
              >
                {imageUrl.image1 ? (
                  <img
                    src={imageUrl.image1}
                    alt=""
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                type="file"
                ref={image1Ref}
                name="image1"
                onChange={handleImage1}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 2
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image2Ref.current.click()}
              >
                {imageUrl.image2 ? (
                  <img
                    src={imageUrl.image2}
                    alt=""
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                ref={image2Ref}
                type="file"
                name="image2"
                onChange={handleImage2}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 3
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image3Ref.current.click()}
              >
                {imageUrl.image3 ? (
                  <img
                    src={imageUrl.image3}
                    alt=""
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                type="file"
                ref={image3Ref}
                name="image3"
                onChange={handleImage3}
              />
            </div>

            {/* <InputFileCustomWidth
                  lable="Ảnh 1"
                  widthP="[200%]"
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
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          text="TẠO SẢN PHẨM"
          bgColor="#4ed14b"
          textColor="#fff"
          width="50%"
          height="2"
          onClick={() => {
            if (validateForm()) {
              if (selectProductEdit) {
                return handleEdit();
              } else {
                handleSubmit();
              }
            } else {
              console.log(selectValue);
              setShowUpload(true);
              setContentUpload({ status: 1 });
            }
          }}
        ></Button>
      </div>
    </div>
  );
};
export default FormCreateProduct;
