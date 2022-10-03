import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiProduct from "../../apis/product";
import { IoImagesOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

const Detail = () => {
  const id = useParams()["id"];
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await ApiProduct.getProductByIdClient({ id: id });
      setProduct(res.productData.rows[0]);
    };
    fetchProduct();
  }, []);

  console.log(product);
  return (
    <div className="pl-[16px]">
      <section>
        <div className="relative">
          <div className="flex overflow-x-auto h-[340px]">
            <img
              src={product.mainImage}
              className="object-cover mr-[8px] rounded-[10px] w-[332px]"
            ></img>
            <img
              src={product.image1}
              className="object-cover mr-[8px] rounded-[10px] w-[332px]"
            ></img>
            <img
              src={product.image3}
              className="object-cover mr-[8px] rounded-[10px] w-[332px]"
            ></img>
            <img
              src={product.image2}
              className="object-cover mr-[8px] rounded-[10px] w-[332px]"
            ></img>
          </div>
          <div className="absolute bottom-[16px] right-[41px] w-[40px] h-[40px] bg-[#f1f1f1] rounded-[50%] flex items-center justify-center">
            <IoImagesOutline size={20} className="text-[#626262]" />
          </div>
        </div>
      </section>

      <section className="leading-5">
        <p className="font-medium text-[16px]">{product.name}</p>
        <p className="text-[#626262] text-[14px] font-medium">
          This is for short des
        </p>
      </section>

      <section>
        <div className="flex items-center">
          <p>{product.votedCounter===0?'0':Math.floor(product.scores/product.votedCounter)}</p>
          <AiFillStar className="text-[#FF8C4B]"/>
        </div>
      </section>
    </div>
  );
};

export default Detail;
