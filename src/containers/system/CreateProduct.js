import React, { useEffect, useState, useRef } from "react";
import Button from "../../components/Button";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ApiProduct from "../../apis/product";
import Preview from "../../components/Preview";
import FormCreateProduct from "../../components/FormCreateProduct";
const EditProduct = ({selectProductEdit}) => {
  const product = selectProductEdit
  const [productName, setProductName] = useState(product?.name||"");
  const [selectValue, setSelectValue] = useState(product?.categoryData?.code||"");
  const [price, setPrice] = useState(product?.costPerUnit||"");
  const [tags, setTags] = useState([]);
  const [shortDes, setShortDes] = useState(product?.description||"");
  const [image, setImage] = useState({
    imageMain: "",
    image1: "",
    image2: "",
    image3: "",
  });
  const [imageUrl, setImageUrl] = useState(product?{imageMainUrl:product?.mainImage,image1Url:product?.image1,image2Url:product?.image2,image3Url:product?.image3}:{
    imageMainUrl: "",
    image1Url: "",
    image2Url: "",
    image3Url: "",
  });
  const [variants, setVariants] = useState(product?.variants||[]);
  const [variantValue, setVariantValue] = useState(product?.name||{ name: "", value: [] });
  const [variantChild, setVariantChild] = useState(product?.name||{ type: "", price: "" });
  const { categories } = useSelector((state) => state.app);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const handleSubmit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("mainImage", image.imageMain);
    bodyFormData.append("image1", image.image1);
    bodyFormData.append("image2", image.image2);
    bodyFormData.append("image3", image.image3);
    bodyFormData.append("name", productName);
    bodyFormData.append("costPerUnit", price);
    bodyFormData.append("description", shortDes);
    bodyFormData.append("categoryCode", selectValue);
    bodyFormData.append("variants", JSON.stringify(variants));
    bodyFormData.append("tags", JSON.stringify(tags));
    bodyFormData.append("inStocking", 1);
    try {
      const res = await ApiProduct.create(bodyFormData);
      if (res.status === 0) {
        setShowUpload(true);
        setContentUpload(res);
      }
    } catch (error) {
      console.log(error);
      setContentUpload(true);
    }
  };
  useEffect(() => {
    categories.length > 0 && setSelectValue(categories[0].code);
  }, [categories]);
  useEffect(() => {
    if (typeof image.imageMain !== "string")
      setImageUrl((prev) => ({
        ...prev,
        imageMainUrl: URL.createObjectURL(image.imageMain),
      }));
    if (typeof image.image1 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image1Url: URL.createObjectURL(image.image1),
      }));
    if (typeof image.image2 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image2Url: URL.createObjectURL(image.image2),
      }));
    if (typeof image.image3 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image3Url: URL.createObjectURL(image.image3),
      }));
  }, [image]);

  return (
    <>
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
        variantValue={variantValue}
        setVariantValue={setVariantValue}
        handleSubmit={handleSubmit}
        setShortDes={setShortDes}
        contentUpload={contentUpload}
        showUpload={showUpload}
        setShowUpload={setShowUpload}
        setContentUpload={setContentUpload}
        imageUrl={imageUrl}
        type={"create"}
      />
      {/* <Preview /> */}
    </>
  );
};

export default EditProduct;
