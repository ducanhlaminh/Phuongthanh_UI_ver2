import React, { useEffect, useState, useRef } from "react";
import Button from "../../components/Button";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ApiProduct from "../../apis/product";
import Preview from "../../components/Preview";
import FormCreateProduct from "../../components/FormCreateProduct";
const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [shortDes, setShortDes] = useState("");
  const [image, setImage] = useState({
    imageMain: "",
    image1: "",
    image2: "",
    image3: "",
  });
  const [variants, setVariants] = useState([]);
  const [variantValue, setVariantValue] = useState({ name: "", value: [] });
  const [variantChild, setVariantChild] = useState({ type: "", price: "" });
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
    bodyFormData.append("tags", tags);
    console.log(shortDes, image, tags);
    try {
      const res = await ApiProduct.create(bodyFormData);
      console.log(res);
      if (res.status === 0) {
        console.log(1);
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
      image.imageMain.preview = URL.createObjectURL(image.imageMain);
    if (typeof image.image1 !== "string")
      image.image1.preview = URL.createObjectURL(image.image1);
    if (typeof image.image2 !== "string")
      image.image2.preview = URL.createObjectURL(image.image2);
    if (typeof image.image3 !== "string")
      image.image3.preview = URL.createObjectURL(image.image3);
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
      />
      {/* <Preview /> */}
    </>
  );
};

export default EditProduct;
