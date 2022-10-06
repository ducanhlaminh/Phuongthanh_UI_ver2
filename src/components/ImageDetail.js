import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
const ImageDetail = ({
  mainImage,
  image1,
  image2,
  image3,
  type,
  mainImageScreen,
}) => {
  const activeImage = "border-[3px] border-primary";
  const [selectedImage, setSelectedImage] = useState();
  if (type === "mobile") {
    return (
      <div className="flex overflow-x-auto h-[340px] lg:hidden">
        <img
          src={mainImage}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image"
        ></img>
        <img
          src={image1}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image"
        ></img>
        <img
          src={image3}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image"
        ></img>
        <img
          src={image2}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image"
        ></img>
      </div>
    );
  } else {
    return (
      <div className="h-[704px] hidden lg:block">
        <div className="h-[605px] w-[605px]">
          <img
            src={mainImageScreen}
            className="w-full h-full object-cover rounded-[16px]"
          ></img>
        </div>
        <div className="flex justify-center mt-[24px] items-center">
          <IoIosArrowForward
            className="rotate-[180deg]"
            size="25px"
          ></IoIosArrowForward>
          <img
            src={mainImage}
            className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px] ${activeImage}`}
            alt="image"
          ></img>
          <img
            src={image1}
            className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
            alt="image"
          ></img>
          <img
            src={image3}
            className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
            alt="image"
          ></img>
          <img
            src={image2}
            className={`object-cover mx-[15px] rounded-[10px] w-[75px] h-[75px]`}
            alt="image"
          ></img>
          <IoIosArrowForward size="25px"></IoIosArrowForward>
        </div>
      </div>
    );
  }
};

export default ImageDetail;
