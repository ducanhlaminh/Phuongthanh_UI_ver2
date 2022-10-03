import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiProduct from "../../apis/product";
import ApiComment from "../../apis/comment";
import { IoImagesOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import Dropdown from "../../components/Dropdown";

const Detail = () => {
  const id = useParams()["id"];
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await ApiProduct.getProductByIdClient({ id: id });
      setProduct(res.productData.rows[0]);
    };

    const fetchComments = async () => {
      const res = await ApiComment.getComment({ productId: id });
      setComments(res.commentData);
    };
    fetchComments();
    fetchProduct();
  }, []);

  console.log(product.votedCounter);
  return (
    <div className=" bg-[#f1f1f1]">
      <div className="bg-[white] pl-[16px]">
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
            This is for short description of the product
          </p>
        </section>

        <section className="flex">
          <div className="flex items-center w-[74px] h-[38px] bg-[#f4f4f4] rounded-[4px] justify-center mr-[14px]">
            <p className="text-[#171520] text-[16px] leading-4 font-semibold mr-[4px]">
              {product.votedCounter === 0
                ? "0"
                : Math.floor(product.scores / product.votedCounter)}
            </p>
            <AiFillStar className="text-[#FF8C4B]" size="20px" />
          </div>
          <div>
            <p className="text-[#171520] text-[14px] font-semibold leading-5">
              Lượt đánh giá
            </p>
            <div className="text-[#626262] text-[14px] font-medium leading-5">
              <span>{product.votedCounter} Đánh giá và </span>
              <span>{comments.count} bình luận</span>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-[8px] bg-white">
        <Dropdown title="Mô tả sản phẩm"></Dropdown>
      </section>

      <section className="mt-[8px] bg-white">
        <Dropdown title="Đánh giá và bình luận"></Dropdown>
      </section>
    </div>
  );
};

export default Detail;
