const DetailNavDesktop = ({activeTab,setActiveTab,productDetailRef,relatedProductRef,infoClickHandler,ratingAndReviewRef,initPosition}) => {
  return <div className="h-[48px] items-center relative bg-lightGrey mx-[20px] rounded-[12px] px-[16px] mt-[55px] hidden lg:flex">
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
};

export default DetailNavDesktop;
