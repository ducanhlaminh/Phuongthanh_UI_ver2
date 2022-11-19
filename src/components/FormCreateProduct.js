import {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
  InputVariant,
} from "../components/InputCtWidth";
import Button from "./Button";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import icons from "../ultils/icons";
import { NotiStatus } from "../components/UploadStatus";
const { AiFillCheckCircle } = icons;
const FormCreateProduct = ({
  productName,
  setProductName,
  categories,
  selectValue,
  setSelectValue,
  price,
  setPrice,
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
  const editorRef = useRef();
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

  const validateForm = () => {
    if (productName && price && image.imageMain && shortDes && selectValue) {
      return true;
    } else return false;
  };
  useEffect(() => {
    console.log(validatesForm);
  }, [validatesForm]);
  return (
    <div className="w-full items-center bg-[#d9d9d9] rounded justify-between p-5 relative">
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
      <h1 className="text-3xl text-center">Nhập thông tin tại đây</h1>
      <div className="h-[15%]">
        <InputCustomWidth
          required={true}
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
            required={true}
            placeholder="Giá: VND"
            PLarge={false}
            value={price}
            setValue={setPrice}
            setValidatesForm={setValidatesForm}
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
      <div className="flex ">
        <div className=" w-1/2 pr-3">
          <div className="h-[350px]">
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
              text="ADD CONTENT"
              bgColor="#4ed14b"
              textColor="#fff"
              width="100%"
              height={"2"}
              onClick={setContentProduct}
            ></Button>
            {shortDes && (
              <div className="border-primary border-2 mt-2 h-10 rounded-md bg-slate-50 flex justify-center items-center">
                <span className="">Đã thêm nội dung sản phẩm</span>
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
          <div className=" w-[50%] mt-3">
            <div className="">
              <label htmlFor="" className="font-bold">
                Ảnh chính
              </label>
              <input
                type="file"
                name="imageMain"
                accept="image/*"
                onChange={(e) => {
                  setImage((prev) => ({
                    ...prev,
                    imageMain: e.target.files[0],
                  }));
                }}
              />
            </div>
            <div className="">
              <label htmlFor="" className="font-bold">
                Ảnh 1
              </label>
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
            </div>
            <div className="">
              <label htmlFor="" className="font-bold">
                Ảnh 2
              </label>
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
            </div>
            <div className="mb-6">
              <label htmlFor="" className="font-bold">
                Ảnh 3
              </label>
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
            </div>

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
        </div>
      </div>
      <div className="flex">
        <Button
          text="ADD PRODUCT"
          bgColor="#4ed14b"
          textColor="#fff"
          width="50%"
          height="2"
          onClick={() => {
            if (validateForm()) {
              console.log(validatesForm);
              return handleSubmit();
            } else {
              setShowUpload(true);
              setContentUpload({ status: 1 });
            }
          }}
        ></Button>
        <Button
          text="SEE PREVIEW"
          bgColor="#cf2b2b"
          textColor="#fff"
          width="50%"
          height="2"
        ></Button>
      </div>
    </div>
  );
};
export default FormCreateProduct;
