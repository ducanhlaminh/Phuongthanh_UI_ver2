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
import RelatedProduct from "../../components/RelatedProduct";
import {
  ReviewAndRatingMobile,
  ReviewAndRatingDesktop,
} from "../../components/ReviewAndRating";
import Voucher from "../../components/Voucher";
import ImageDetail from "../../components/ImageDetail";
import NameAndDescription from "../../components/NameAndDescription";
import DetailNavDesktop from "../../components/DetailNavDesktop";
import CreateComponentPopup from "../../components/CreateCommentPopup";

const Detail = () => {
  const id = useParams()["id"];
  const productDetailRef = useRef();
  const relatedProductRef = useRef();
  const ratingAndReviewRef = useRef();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState({});
  const [mainImage, setMainImage] = useState(product?.mainImage);
  const [initPosition, setInitPosition] = useState({ left: 0, width: 0 });
  const [activeTab, setActiveTab] = useState([1, 0, 0]);
  const [Vouchers, setVouchers] = useState([]);
  const [showPopupReview, setShowPopupReview] = useState(false);
  const [showPopupComment, setShowPopupComment] = useState(false);
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
          {showPopupReview && (
            <ReviewAndRatingMobile
              commentData={comments?.rows}
              name={product.name}
              shortDescription={product?.shortDescription}
              score={product?.scores}
              setShowPopupReview={setShowPopupReview}
              setShowPopupComment={setShowPopupComment}
            />
          )}
          {showPopupComment && <CreateComponentPopup setShowPopupComment={setShowPopupComment} id={product.id}/>}
          <div className="bg-[white] pl-[16px] ">
            <div className="lg:flex">
              <section>
                <div className="relative">
                  {/* image mobile */}
                  <ImageDetail
                    mainImage={product.mainImage}
                    image1={product.image1}
                    image2={product.image2}
                    image3={product.image3}
                    type="mobile"
                    mainImageScreen=""
                  />

                  {/* image desktop */}
                  <ImageDetail
                    mainImage={product.mainImage}
                    image1={product.image1}
                    image2={product.image2}
                    image3={product.image3}
                    type="desktop"
                    mainImageScreen={mainImage}
                  />
                </div>
              </section>

              <div className="lg:ml-[20px]">
                <NameAndDescription
                  name={product.name}
                  shortDescription={product?.shortDescription}
                />

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
                    <span>đ</span>
                    {Number(product.costPerUnit?.toFixed(1))?.toLocaleString()}
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
                <section className="pb-[16px] hidden lg:block mt-[20px]">
                  <Voucher Vouchers={Vouchers}></Voucher>
                </section>

                <section className="hidden lg:flex">
                  <LongButton
                    width="328px"
                    height="44px"
                    backgroundColor="#1B4B66"
                    size="14px"
                    color="white"
                  >
                    <RiHandbagLine size="24px"></RiHandbagLine>
                    <p>Thêm vào giỏ</p>
                  </LongButton>

                  <div className="border-[2px] border-primary rounded-[8px] ml-[24px]">
                    <LongButton
                      width="240px"
                      height="40px"
                      backgroundColor="white"
                      size="14px"
                      color="#1B4B66"
                    >
                      <RiHandbagLine size="24px"></RiHandbagLine>
                      <p>Thêm vào yêu thích</p>
                    </LongButton>
                  </div>
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

            <section className="pb-[16px] lg:hidden">
              <Voucher Vouchers={Vouchers}></Voucher>
            </section>
          </div>

          <section className="mt-[8px] bg-white lg:hidden">
            <Dropdown title="Mô tả sản phẩm">
              <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                {product.description}
              </p>
            </Dropdown>
          </section>

          <section
            className="mt-[8px] bg-white lg:hidden"
            onClick={() => {
              setShowPopupReview(true);
            }}
          >
            <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
          </section>

          <div className="h-[66px] lg:hidden"></div>

          <DetailNavDesktop
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            productDetailRef={productDetailRef}
            relatedProductRef={relatedProductRef}
            ratingAndReviewRef={ratingAndReviewRef}
            initPosition={initPosition}
            infoClickHandler={infoClickHandler}
          />

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
              <ReviewAndRatingDesktop commentData={comments?.rows} />
            </div>
          </section>

          <div className="lg:hidden">
            <ButtonFooterContainer>
              <button className="w-[44px] h-[44px] bg-[#F4F4F4] rounded-[8px] flex items-center justify-center text-primary">
                <AiOutlineHeart size="24px"></AiOutlineHeart>
              </button>
              <div className="h-[44px] w-[272px]">
                <LongButton
                  width="100%"
                  height="100%"
                  color="white"
                  backgroundColor="#1B4B66"
                  size="14px"
                >
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
