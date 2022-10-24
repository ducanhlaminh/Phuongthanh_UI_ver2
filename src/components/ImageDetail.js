import { IoIosArrowForward } from "react-icons/io";
import React,{ useState, useEffect,memo } from "react";
const ImageDetail = ({
  mainImage,
  image1,
  image2,
  image3,
  type,
  mainImageScreen,
}) => {
  const activeImage = "border-[3px] border-primary";

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [imageList, setImageList] = useState(0);

  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);
  if (type === "mobile") {
    return (
      <div className="flex overflow-x-auto h-[340px] md:hidden">
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
      <div className="h-[704px] hidden md:block">
        <div className="h-[390px] w-[390px] lg:h-[605px] lg:w-[605px]">
          <img
            src={`${selectedImage}`}
            className="w-full h-full object-cover rounded-[16px]"
          ></img>
        </div>
        <div className="flex justify-center mt-[24px] items-center">
          <IoIosArrowForward
            className="rotate-[180deg]"
            size="25px"
            onClick={() => {
              setImageList((prev) => {
                if (prev > 0 && prev <= 3) return prev - 1;
                else if (prev == 0) return 3;
              });
            }}
          ></IoIosArrowForward>
          <img
            src={mainImage}
            className={`object-cover mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 0 ? activeImage : ""
            }`}
            alt="image"
            onClick={() => {
              setSelectedImage(mainImage);
              setImageList(0);
            }}
          ></img>
          <img
            src={image1}
            className={`object-cover mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 1 ? activeImage : ""
            }`}
            alt="image"
            onClick={() => {
              setSelectedImage(image1);
              setImageList(1);
            }}
          ></img>
          <img
            src={image3}
            className={`object-cover mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 2 ? activeImage : ""
            }`}
            alt="image"
            onClick={() => {
              setSelectedImage(image2);
              setImageList(2);
            }}
          ></img>
          <img
            src={image2}
            className={`object-cover mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 3 ? activeImage : ""
            }`}
            alt="image"
            onClick={() => {
              setSelectedImage(image3);
              setImageList(3);
            }}
          ></img>
          <IoIosArrowForward
            size="25px"
            onClick={() => {
              setImageList((prev) => {
                if (prev >= 0 && prev <3) return prev + 1;
                else if (prev == 3) return 0;
              });
            }}
          ></IoIosArrowForward>
        </div>
      </div>
    );
  }
};

export default React.memo(ImageDetail);
