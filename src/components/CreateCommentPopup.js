import { MdClose } from "react-icons/md";
import ButtonFooterContainer from "./ButtonFooterContainer";
import LongButton from "./LongButton";
import { useRef } from "react";
import ApiComment from "../apis/comment";
const CreateComponentPopup = ({ setShowPopupComment, id }) => {
  const createComment = async () => {
    await ApiComment.createComment({
      productId: id,
      content: commentRef?.current?.innerHTML,
    });
  };
  const commentRef = useRef();
  console.log(commentRef);
  return (
    <div className="fixed w-screen h-screen bg-white z-30 lg:hidden">
      <header className="bg-white h-[56px] pl-[16px] flex items-center text-primary">
        <div
          onClick={() => {
            setShowPopupComment(false);
          }}
        >
          <MdClose size="35px" className="text-primary mr-[20px]" />
        </div>
        <p className="text-[20px] font-semibold">Thêm bình luận</p>
      </header>
      <section className="pl-[16px]">
        <p className="font-semibold text-[14px] text-black">
          Nội dung bình luận
        </p>
        <div
          contentEditable="true"
          className="min-h-[96px] w-[95%] bg-lightGrey rounded-[4px] mt-[8px] p-[16px]"
          ref={commentRef}
        ></div>
      </section>
      <div
        onClick={() => {
          createComment();
          commentRef.current.innerHTML = "";
        }}
      >
        <ButtonFooterContainer>
          <LongButton
            width="90%"
            height="100%"
            color="white"
            backgroundColor="#1B4B66"
            size="14px"
          >
            <p>Đăng bình luận</p>
          </LongButton>
        </ButtonFooterContainer>
      </div>
    </div>
  );
};

export default CreateComponentPopup;
