import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ApiProduct from "../../apis/product";
import ApiComment from "../../apis/comment";
import { IoImagesOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import Dropdown from "../../components/Dropdown";
import SideNavigateMenu from "../../components/SideNavigateMenu";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import LongButton from "../../components/LongButton";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import RelatedProduct from "../../components/RelatedProduct";
import {
  ReviewAndRatingMobile,
  ReviewAndRatingDesktop,
} from "../../components/ReviewAndRating";

const Detail = () => {
  const id = useParams()["id"];
  const productDetailRef = useRef();
  const relatedProductRef = useRef();
  const ratingAndReviewRef = useRef();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState({});
  const [mainImage, setMainImage] = useState(product?.mainImage);
  const [selectedImage, setSelectedImage] = useState();
  const [initPosition, setInitPosition] = useState({ left: 0, width: 0 });
  const activeImage = "border-[3px] border-primary";
  const [activeTab, setActiveTab] = useState([1, 0, 0]);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await ApiProduct.getProductByIdClient({ id: id });
      setProduct(res.productData.rows[0]);
      setMainImage(res.productData.rows[0].mainImage);
    };
    setInitPosition((prev) => {
      return {
        ...prev,
        left: productDetailRef?.current?.offsetLeft,
        width: productDetailRef?.current?.offsetWidth,
      };
    });

    const fetchComments = async () => {
      const res = await ApiComment.getComment({ productId: id });
      setComments(res.commentData);
    };
    fetchComments();
    fetchProduct();
  }, []);
  const infoClickHandler = (ref) => {
    setInitPosition({
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
    });
  };
  const handleRenderStar = (starValue) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= +starValue) {
        stars = [...stars, <AiFillStar size="23" className="text-yellow" />];
      } else {
        stars = [
          ...stars,
          <AiFillStar size="23" className="text-darkGrey-tint" />,
        ];
      }
    }
    return stars;
  };

  return (
    <>
      {product && (
        <div className=" bg-lightGrey relative lg:bg-white lg:mt-[64px]">
          <div className="bg-[white] pl-[16px] ">
            <div className="lg:flex">
              <section>
                <div className="relative">
                  {/* image mobile */}
                  <div className="flex overflow-x-auto h-[340px] lg:hidden">
                    <img
                      src={product.mainImage}
                      className="object-cover mr-[8px] rounded-[10px] w-[332px]"
                      alt="image"
                    ></img>
                    <img
                      src={product.image1}
                      className="object-cover mr-[8px] rounded-[10px] w-[332px]"
                      alt="image"
                    ></img>
                    <img
                      src={product.image3}
                      className="object-cover mr-[8px] rounded-[10px] w-[332px]"
                      alt="image"
                    ></img>
                    <img
                      src={product.image2}
                      className="object-cover mr-[8px] rounded-[10px] w-[332px]"
                      alt="image"
                    ></img>
                  </div>

                  {/* image desktop */}
                  <div className="h-[704px] hidden lg:block">
                    <div className="h-[605px] w-[605px]">
                      <img
                        src={mainImage}
                        className="w-full h-full object-cover rounded-[16px]"
                      ></img>
                    </div>
                    <div className="flex justify-center mt-[24px] items-center">
                      <IoIosArrowForward
                        className="rotate-[180deg]"
                        size="25px"
                      ></IoIosArrowForward>
                      <img
                        src={product.mainImage}
                        className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px] ${activeImage}`}
                        alt="image"
                      ></img>
                      <img
                        src={product.image1}
                        className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
                        alt="image"
                      ></img>
                      <img
                        src={product.image3}
                        className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
                        alt="image"
                      ></img>
                      <img
                        src={product.image2}
                        className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
                        alt="image"
                      ></img>
                      <IoIosArrowForward size="25px"></IoIosArrowForward>
                    </div>
                  </div>

                  <div className="absolute bottom-[16px] right-[41px] w-[40px] h-[40px] bg-lightGrey rounded-[50%] flex items-center justify-center lg:hidden">
                    <IoImagesOutline size={20} className="text-[#626262]" />
                  </div>
                </div>
              </section>

              <div className="lg:ml-[20px]">
                <section className="leading-5 mt-[20px]">
                  <p className="font-medium text-[16px] lg:text-[34px] lg:font-semibold">
                    {product.name}
                  </p>
                  <p className="text-[#626262] text-[14px] font-medium mt-[3px] lg:text-[20px] lg:font-semibold leading-7 lg:mt-[13px]">
                    This is for short description of the product
                  </p>
                </section>

                <section className="hidden lg:flex mt-[28px] mb-[30px]">
                  {handleRenderStar(product?.scores)?.map((content, i) => (
                    <span key={i}>{content}</span>
                  ))}
                  <p className="text-darkGrey-tint text-[16px] ">
                    ({product.votedCounter} Đánh giá)
                  </p>
                </section>

                <section className="flex items-center">
                  <p className="font-semibold text-[20px] text-[#171520] mr-[10px] lg:text-[40px] lg:font-semibold">
                    $54.99
                  </p>
                  <div className="text-[#626262] relative mr-[8px] lg:translate-y-[5px]">
                    <span className=" font-medium text-[14px] leading-5 lg:text-[34px] lg:font-semibold lg:text-[#B6B6B6]">
                      <span>đ</span>
                      {Number(
                        product.costPerUnit?.toFixed(1)
                      )?.toLocaleString()}
                    </span>
                    <div className="absolute w-full h-[1px] top-[50%] left-0 bg-[#626262] lg:top-[35%]"></div>
                  </div>
                  <p className="text-[#E21D1D] leading-5 text-[14px] font-medium tracking-tighter lg:text-[20px] lg:font-semibold lg:text-[#FF404B]">
                    20%OFF
                  </p>
                </section>
              </div>
            </div>

            <section className="flex mt-[10px] pb-[20px] lg:hidden">
              <div className="flex items-center w-[74px] h-[38px] bg-[#f4f4f4] rounded-[4px] justify-center mr-[14px]">
                <p className="text-[#171520] text-[16px] leading-4 font-semibold mr-[4px]">
                  {product.scores}
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

          <section className="mt-[8px] bg-white lg:hidden">
            <Dropdown title="Mô tả sản phẩm">
              <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                {product.description}
              </p>
            </Dropdown>
          </section>

          <section className="mt-[8px] bg-white lg:hidden">
            <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
          </section>

          <div className="h-[66px] lg:hidden"></div>

          <div className="h-[48px] items-center relative bg-lightGrey mx-[20px] rounded-[12px] px-[16px] mt-[55px] hidden lg:flex">
            <div
              className={`px-[18px] py-[10px] z-10 ${
                activeTab[0] === 1 ? "text-white" : "text-darkGrey"
              }`}
              ref={productDetailRef}
              onClick={() => {
                infoClickHandler(productDetailRef);
                setActiveTab([1, 0, 0]);
              }}
            >
              <p
                className="text-[16px] font-medium"
                style={{ userSelect: "none" }}
              >
                Thông tin chi tiết
              </p>
            </div>
            <div
              className={`px-[18px] py-[10px] z-10 ${
                activeTab[1] === 1 ? "text-white" : "text-darkGrey"
              }`}
              ref={relatedProductRef}
              onClick={() => {
                infoClickHandler(relatedProductRef);
                setActiveTab([0, 1, 0]);
              }}
            >
              <p
                className="text-[16px] font-medium"
                style={{ userSelect: "none" }}
              >
                Sản phẩm liên quan
              </p>
            </div>
            <div
              className={`px-[18px] py-[10px] z-10 ${
                activeTab[2] === 1 ? "text-white" : "text-darkGrey"
              }`}
              ref={ratingAndReviewRef}
              onClick={() => {
                infoClickHandler(ratingAndReviewRef);
                setActiveTab([0, 0, 1]);
              }}
            >
              <p
                className="text-[16px] font-medium"
                style={{ userSelect: "none" }}
              >
                Đánh giá và bình luận
              </p>
            </div>

            <div
              className={`absolute bg-primary h-[32px] top-[19%] transition-all rounded-[8px] z-1`}
              style={{
                width: `${initPosition.width}px`,
                left: `${initPosition.left}px`,
              }}
            ></div>
          </div>

          <section className="hidden lg:block ml-[20px] mt-[24px] mb-[95px]">
            <div className={`${activeTab[0] === 1 ? "block" : "hidden"}`}>
              <p className="text-darkGrey text-[16px] font-medium">
                {product.description}
              </p>
            </div>
            <div className={`${activeTab[1] === 1 ? "block" : "hidden"}`}>
              <RelatedProduct />
            </div>
            <div className={`${activeTab[2] === 1 ? "block" : "hidden"}`}>
              <ReviewAndRating commentData={comments?.rows} />
            </div>
          </section>

          <div className="lg:hidden">
            <ButtonFooterContainer>
              <button className="w-[44px] h-[44px] bg-[#F4F4F4] rounded-[8px] flex items-center justify-center text-primary">
                <AiOutlineHeart size="24px"></AiOutlineHeart>
              </button>
              <div className="h-[44px] w-[272px]">
                <LongButton>
                  <RiHandbagLine size="24px"></RiHandbagLine>
                  <p>Thêm vào giỏ</p>
                </LongButton>
              </div>
            </ButtonFooterContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
