import React, { useEffect, useState, useRef } from "react";
import Button from "../../components/Button";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ApiProduct from "../../apis/product";


import FormCreateProduct from "../../components/FormCreateProduct";
const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [shortDes, setShortDes] = useState("");
  const [image, setImage] = useState({
    imageMain: '',
    image1: '',
    image2: '',
    image3: '',
  });
  const [imageUrl, setImageUrl] = useState({
    imageMainUrl: "",
    image1Url: "",
    image2Url: "",
    image3Url: "",
  });
  const [variants, setVariants] = useState([]);
  const [variantValue, setVariantValue] = useState({ name: '', value: [] });
  const [variantChild, setVariantChild] = useState({ type: '', price: '' })


  const { categories } = useSelector((state) => state.app);

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
<<<<<<< Updated upstream
    // ApiProduct.create(bodyFormData);
=======
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
>>>>>>> Stashed changes
  };
  useEffect(() => {
    categories.length > 0 && setSelectValue(categories[0].code);
  }, [categories]);
  const editorRef = useRef(null);
  const log = () => {

    if (editorRef.current) {
      const des = editorRef.current.getContent()

      setShortDes(des)
    }
  };
  useEffect(() => {
<<<<<<< Updated upstream
    if (typeof image.imageMain !== 'string') image.imageMain.preview = URL.createObjectURL(image.imageMain);
    if (typeof image.image1 !== 'string') image.image1.preview = URL.createObjectURL(image.image1);
    if (typeof image.image2 !== 'string') image.image2.preview = URL.createObjectURL(image.image2);
    if (typeof image.image3 !== 'string') image.image3.preview = URL.createObjectURL(image.image3);

  }, [image.imageMain]);


  return (
    <>

      <FormCreateProduct productName={productName} setProductName={setProductName} categories={categories} selectValue={selectValue} setSelectValue={setSelectValue} price={price} setPrice={setPrice} tags={tags} setTags={setTags} setVariantChild={setVariantChild} variantChild={variantChild} setVariants={setVariants} variants={variants} image={image} setImage={setImage} variantValue={variantValue} setVariantValue={setVariantValue} handleSubmit={handleSubmit} setShortDes={setShortDes} />
      <h1 className="text-3xl">Xem trước tại đây</h1>
      <div className="w-full items-center bg-[#d9d9d9] rounded justify-between p-5">

        <img src={image.imageMain?.preview ? image.imageMain?.preview : ''} width='100%' height='100%' alt="" />
      </div>

=======
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
>>>>>>> Stashed changes
    </>
  );
};

export default EditProduct;