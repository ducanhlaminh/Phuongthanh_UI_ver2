import Avatar from "../assets/anonAvatar.png";
import { AiFillStar } from "react-icons/ai";
import ButtonFooterContainer from "./ButtonFooterContainer";
import LongButton from "./LongButton";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
export const ReviewAndRatingMobile = ({
  commentData,
  name,
  shortDescription,
  score,
  setShowPopupReview,
  showPopupReview,
  setShowPopupComment,
  setShowHeader,
}) => {
  return (
    <div className={`fixed z-20 h-screen w-screen top-0 left-0 bg-lightGrey flex flex-col md:hidden ${ !showPopupReview?'translate-x-[100%]':'translate-x-[0]'} transition-all`}>
      <header className="bg-white h-[56px] pl-[16px] flex-none flex items-center ">
        <MdOutlineArrowBackIosNew
          size="24"
          onClick={() => {
            setShowPopupReview(false);
            setShowHeader(true);
          }}
        />
      </header>
      <section className="bg-white pl-[16px] pt-[6px]">
        <p className="text-[16px] font-medium">{name}</p>
        <p className="text-[14px] font-medium text-darkGrey">
          This is short description
        </p>
        <div className="flex items-center mt-[16px] pb-[10px]">
          <div className="flex items-center mr-[12px]">
            <span className="text-[16px] text-black font-semibold mr-[4px]">
              {score}
            </span>
            <AiFillStar size="25" className="text-yellow" />
          </div>
          <span className="text-[14px] text-black font-semibold">Đánh giá</span>
        </div>
      </section>

      <section className="bg-white pl-[16px] flex-auto overflow-y-auto mt-[8px]">
        {commentData?.length > 0 ? (
          <div className="pt-[24px]">
            {commentData?.map((comment, i) => {
              return (
                <div key={i} className="mb-[24px]">
                  <div className="flex items-center mb-[12px]">
                    <div className="mr-[12px]">
                      <img
                        src={Avatar}
                        className="rounded-[50px] w-[40px] h-[40px]"
                      ></img>
                    </div>
                    <div>
                      <p className="text-black font-semibold md:text-[14px]">
                        {comment?.commentator?.name}
                      </p>
                      <p className="text-darkGrey-tint font-medium md:text-[14px]">
                        {comment?.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-darkGrey-tint font-medium md:text-[14px]">
                      {comment?.content}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="h-[66px]"></div>
          </div>
        ) : (
          <div className="h-[50px] flex items-center justify-center text-[16px] font-medium text-darkGrey">
            <p>Sản phẩm này không có bình luận</p>
          </div>
        )}
      </section>

      <div
        onClick={() => {
          setShowPopupComment(true);
          setShowHeader(false);
        }}
      >
        <ButtonFooterContainer>
          <LongButton
            width="90%"
            height="44px"
            backgroundColor="#1B4B66"
            color="white"
            size="14px"
          >
            <AiOutlinePlus color="white" size="22px" className="mr-[8px]" />
            <p>Viết bình luận</p>
          </LongButton>
        </ButtonFooterContainer>
      </div>
    </div>
  );
};

export const ReviewAndRatingDesktop = ({ commentData }) => {
  return (
    <div>
      {commentData?.map((comment, i) => {
        return (
          <div key={i} className="mb-[24px]">
            <div className="flex items-center mb-[12px]">
              <div className="mr-[12px]">
                <img
                  src={Avatar}
                  className="rounded-[50px] w-[80px] h-[80px]"
                ></img>
              </div>
              <div>
                <p className="text-black font-semibold md:text-[24px]">
                  {comment?.commentator?.name}
                </p>
                <p className="text-darkGrey-tint font-medium md:text-[20px]">
                  {comment?.createdAt.substring(0, 10)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-darkGrey-tint font-medium md:text-[20px]">
                {comment?.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
