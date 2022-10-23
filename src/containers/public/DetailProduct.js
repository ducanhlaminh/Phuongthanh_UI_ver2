import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiComment from "../../apis/comment";
import ApiProduct from "../../apis/product";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import CreateComponentPopup from "../../components/CreateCommentPopup";
import DetailNavDesktop from "../../components/DetailNavDesktop";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import ImageDetail from "../../components/ImageDetail";
import LongButton from "../../components/LongButton";
import NameAndDescription from "../../components/NameAndDescription";
import RelatedProduct from "../../components/RelatedProduct";
import {
  ReviewAndRatingDesktop, ReviewAndRatingMobile
} from "../../components/ReviewAndRating";
import SideNavigateMenu from "../../components/SideNavigateMenu";
import Voucher from "../../components/Voucher";
import SelectvariantPopup from "../../triggercompoents/SelectVariantPopup";
import icons from "../../ultils/icons";

const {AiFillStar, AiOutlineHeart, MdOutlineArrowBackIosNew, RiHandbagLine} =  icons
const DetailProduct = () => {
  const id = useParams()["id"];
  const productDetailRef = useRef();
  const relatedProductRef = useRef();
  const ratingAndReviewRef = useRef();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState({});
  const [mainImage, setMainImage] = useState(product?.mainImage);
  const [initPosition, setInitPosition] = useState({ left: 0, width: 0 });
  const [activeTab, setActiveTab] = useState([1, 0, 0]);
  const [Vouchers, setVouchers] = useState([]);
  const [showPopupReview, setShowPopupReview] = useState(false);
  const [showPopupComment, setShowPopupComment] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showPopupCart, setShowPopupCart] = useState(false);
  const activeVariant = "border-primary bg-[#d9eff1]";
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
          <SelectvariantPopup 
            setShowPopupCart={setShowPopupCart}
            showPopupCart={showPopupCart}
            product={product}
            setShowPopupReview={setShowPopupReview}
            comments={comments}
          />

          {showHeader && (
            <div className="md:hidden">
              <Header>
                <MdOutlineArrowBackIosNew size="24" />
              </Header>
            </div>
          )}

          <ReviewAndRatingMobile
            commentData={comments?.rows}
            name={product.name}
            shortDescription={product?.shortDescription}
            score={product?.scores}
            setShowPopupReview={setShowPopupReview}
            showPopupReview={showPopupReview}
            setShowPopupComment={setShowPopupComment}
            setShowHeader={setShowHeader}
          />

          <CreateComponentPopup
            setShowPopupComment={setShowPopupComment}
            showPopupComment={showPopupComment}
            id={product.id}
          />
          <div className="bg-[white] pl-[16px] ">
            <div className="md:flex">
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

              <div className="md:ml-[20px]">
                <NameAndDescription
                  name={product.name}
                  shortDescription={product?.shortDescription}
                />

                <section className="hidden md:flex mt-[28px] mb-[30px]">
                  {handleRenderStar(product?.scores)?.map((content, i) => (
                    <span key={i}>{content}</span>
                  ))}
                  <p className="text-darkGrey-tint text-[16px] ">
                    ({product.votedCounter} Đánh giá)
                  </p>
                </section>

                <section className="flex items-center">
                  <p className="font-semibold text-[20px] text-[#171520] mr-[10px] md:text-[40px] md:font-semibold">
                    <span>đ</span>
                    {Number(product.costPerUnit?.toFixed(1))?.toLocaleString()}
                  </p>
                  <div className="text-[#626262] relative mr-[8px] md:translate-y-[5px]">
                    <span className=" font-medium text-[14px] leading-5 md:text-[34px] md:font-semibold md:text-[#B6B6B6]">
                      <span>đ</span>
                      {Number(
                        product.costPerUnit?.toFixed(1)
                      )?.toLocaleString()}
                    </span>
                    <div className="absolute w-full h-[1px] top-[50%] left-0 bg-[#626262] md:top-[35%]"></div>
                  </div>
                  <p className="text-[#E21D1D] leading-5 text-[14px] font-medium tracking-tighter md:text-[20px] md:font-semibold md:text-[#FF404B]">
                    20%OFF
                  </p>
                </section>
                <section className="pb-[16px] hidden md:block mt-[20px]">
                  <Voucher Vouchers={Vouchers}></Voucher>
                </section>

                <div className="hidden md:block mb-[16px]">
                  {product?.variants.map((variant) => {
                    return (
                      <div key={variant.id}>
                        <p className="text-[18px] font-semibold text-black">
                          {variant?.name}
                        </p>
                        <div className="flex mt-[10px] gap-[9px] font-bold text-black text-base">
                          {variant?.value.map((value) => (
                            <div
                              key={value.id}
                              className={`p-[8px] border-[3px] border-darkGrey-tint rounded-[8px] `}
                            >
                              {value.type}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <section className="hidden md:flex">
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

            <section className="flex mt-[10px] pb-[20px] md:hidden">
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

            <section className="pb-[16px] md:hidden">
              <Voucher Vouchers={Vouchers}></Voucher>
            </section>
          </div>

          <section className="mt-[8px] bg-white md:hidden">
            <Dropdown title="Mô tả sản phẩm">
              <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                {product.description}
              </p>
            </Dropdown>
          </section>

          <section
            className="mt-[8px] bg-white md:hidden"
            onClick={() => {
              setShowPopupReview(true);
              setShowHeader(false);
            }}
          >
            <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
          </section>

          <div className="h-[66px] md:hidden"></div>

          <DetailNavDesktop
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            productDetailRef={productDetailRef}
            relatedProductRef={relatedProductRef}
            ratingAndReviewRef={ratingAndReviewRef}
            initPosition={initPosition}
            infoClickHandler={infoClickHandler}
          />

          <section className="hidden md:block ml-[20px] mt-[24px] mb-[95px]">
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

          <div className="md:hidden">
            <ButtonFooterContainer>
              <button className="w-[44px] h-[44px] bg-[#F4F4F4] rounded-[8px] flex items-center justify-center text-primary">
                <AiOutlineHeart size="24px"></AiOutlineHeart>
              </button>
              <div
                className="h-[44px] w-[272px]"
                onClick={() => {
                  setShowPopupCart(true);
                }}
              >
                <LongButton
                  width="100%"
                  height="100%"
                  color="white"
                  backgroundColor="#1B4B66"
                  size="14px"
                  disabled={false}
                >
                  <RiHandbagLine size="24px"></RiHandbagLine>
                  <p>Chọn loại hàng</p>
                </LongButton>
              </div>
            </ButtonFooterContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
