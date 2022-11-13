import ButtonFooterContainer from "./ButtonFooterContainer";
import { useState } from "react";
import Dropdown from "./Dropdown";
import Header from "./Header";
import ImageDetail from "./ImageDetail";
import LongButton from "./LongButton";
import NameAndDescription from "./NameAndDescription";
import { PriceCaculator } from "../ultils/caculator";
import SideNavigateMenu from "./SideNavigateMenu";
import Voucher from "./Voucher";

import icons from "../ultils/icons";

import { AiOutlineShoppingCart } from "react-icons/ai";

const { AiFillStar, AiOutlineHeart, MdOutlineArrowBackIosNew, RiHandbagLine } =
  icons;

const Preview = ({
  product = {
    variants: [
      {
        name: "Kích cỡ",
        value: [
          {
            type: "X",
            price: -5,
          },
          {
            type: "M",
            price: -2,
          },
          {
            type: "L",
            price: 0,
          },
          {
            type: "XS",
            price: -10,
          },
        ],
      },
    ],
    id: "eadf4a32-34d7-429a-a661-f940d29097a7",
    name: "Sản phẩm 91",
    costPerUnit: 650380000,
    inStocking: true,
    description: "Description 91",
    mainImage:
      "https://images.bloomingdalesassets.com/is/image/BLM/products/7/optimized/10251247_fpx.tif?$2014_BROWSE_FASHION$&fmt=jpeg&op_usm=0.7,1.0,0.5,0&resMode=sharp2&qlt=85,0&wid=280&hei=350",
    image1:
      "https://images.bloomingdalesassets.com/is/image/BLM/products/7/optimized/10251247_fpx.tif?$2014_BROWSE_FASHION$&fmt=jpeg&op_usm=0.7,1.0,0.5,0&resMode=sharp2&qlt=85,0&wid=280&hei=350",
    image2:
      "https://images.bloomingdalesassets.com/is/image/BLM/products/7/optimized/10251247_fpx.tif?$2014_BROWSE_FASHION$&fmt=jpeg&op_usm=0.7,1.0,0.5,0&resMode=sharp2&qlt=85,0&wid=280&hei=350",
    image3:
      "https://images.bloomingdalesassets.com/is/image/BLM/products/7/optimized/10251247_fpx.tif?$2014_BROWSE_FASHION$&fmt=jpeg&op_usm=0.7,1.0,0.5,0&resMode=sharp2&qlt=85,0&wid=280&hei=350",
    scores: 4.9,
    votedCounter: 4926,
    soldCounter: 439,
    hashtags: null,
    createdAt: "2022-11-06T05:52:12.000Z",
    updatedAt: "2022-11-06T05:52:12.000Z",
    categoryData: {
      code: "AUQOA5",
      valueVi: "Quần áo",
      valueEn: "Clothes",
      color: "#A5C663",
      image: "https://cf.shopee.vn/file/87cc3b3d4e6f14818a5b4a119704a59a",
    },
  },
}) => {
  const [canAtc, setCanAtc] = useState(false);
  const [variantTypes, setVariantTypes] = useState([]);
  return (
    <>
      <h1 className="text-3xl">Xem trước tại đây</h1>
      <div className=" items-center bg-[#d9d9d9] rounded justify-between p-5 ">
        {/* Desktop */}
        <div className="">
          {product && (
            <div className=" bg-lightGrey relative lg:bg-white lg:mt-[64px]">
              <div className="md:hidden">
                <Header>
                  <div className="flex justify-between w-[93%]">
                    <MdOutlineArrowBackIosNew size="24" />
                    <div className={`relative animate-bounce2`}>
                      <AiOutlineShoppingCart size={26} />
                      <span className="absolute top-0 right-0 w-[10px] h-[10px] bg-orange-600 rounded-full"></span>
                    </div>
                  </div>
                </Header>
              </div>

              <div className="bg-[white] pl-[16px] w-[1000px]">
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
                      />

                      {/* image desktop */}
                      <ImageDetail
                        mainImage={product.mainImage}
                        image1={product.image1}
                        image2={product.image2}
                        image3={product.image3}
                        type="desktop"
                      />
                    </div>
                  </section>

                  <div className="md:ml-[20px]">
                    <NameAndDescription
                      name={product.name}
                      shortDescription={product?.shortDescription}
                    />
                    <section className="flex items-center">
                      <p className="font-semibold text-[20px] text-[#171520] mr-[10px] md:text-[40px] md:font-semibold">
                        <span>đ</span>
                        {!canAtc &&
                          Number(
                            product.costPerUnit?.toFixed(1)
                          )?.toLocaleString()}
                        {canAtc && PriceCaculator(product, variantTypes)}
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
                      <Voucher></Voucher>
                    </section>

                    <div className="hidden md:block mb-[16px]">
                      <div className={`text-[#e21d1d] visible`}>
                        Vui lòng chọn loại hàng để thêm vào giỏ
                      </div>
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
                      <span> Đánh giá và </span>
                      <span> bình luận</span>
                    </div>
                  </div>
                </section>

                <section className="pb-[16px] md:hidden">
                  <Voucher></Voucher>
                </section>
              </div>

              <section className="mt-[8px] bg-white md:hidden">
                <Dropdown title="Mô tả sản phẩm" opened={true}>
                  <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                    {product.description}
                  </p>
                </Dropdown>
              </section>
              <section className="mt-[8px] bg-white md:hidden">
                <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
              </section>
              <div className="h-[66px] md:hidden"></div>
              <div className="md:hidden">
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
                      <p>Chọn loại hàng</p>
                    </LongButton>
                  </div>
                </ButtonFooterContainer>
              </div>
            </div>
          )}
        </div>
        {/* Mobile */}
        <div className="">
          {product && (
            <div className=" bg-lightGrey relative lg:bg-white lg:mt-[64px]">
              <div className="md:hidden">
                <Header>
                  <div className="flex justify-between w-[93%]">
                    <MdOutlineArrowBackIosNew size="24" />
                    <div className={`relative animate-bounce2`}>
                      <AiOutlineShoppingCart size={26} />
                      <span className="absolute top-0 right-0 w-[10px] h-[10px] bg-orange-600 rounded-full"></span>
                    </div>
                  </div>
                </Header>
              </div>

              <div className="bg-[white] pl-[16px] w-[1000px]">
                <div className="">
                  <section>
                    <div className="relative">
                      {/* image mobile */}
                      <ImageDetail
                        mainImage={product.mainImage}
                        image1={product.image1}
                        image2={product.image2}
                        image3={product.image3}
                        type="mobile"
                      />
                    </div>
                  </section>

                  <div className="md:ml-[20px]">
                    <NameAndDescription
                      name={product.name}
                      shortDescription={product?.shortDescription}
                    />
                    <section className="flex items-center">
                      <p className="font-semibold text-[20px] text-[#171520] mr-[10px] md:text-[40px] md:font-semibold">
                        <span>đ</span>
                        {!canAtc &&
                          Number(
                            product.costPerUnit?.toFixed(1)
                          )?.toLocaleString()}
                        {canAtc && PriceCaculator(product, variantTypes)}
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
                      <Voucher></Voucher>
                    </section>

                    <div className="hidden md:block mb-[16px]">
                      <div className={`text-[#e21d1d] visible`}>
                        Vui lòng chọn loại hàng để thêm vào giỏ
                      </div>
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

                <section className="flex mt-[10px] pb-[20px] md:block">
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
                      <span> Đánh giá và </span>
                      <span> bình luận</span>
                    </div>
                  </div>
                </section>

                <section className="pb-[16px] hidden md:block">
                  <Voucher></Voucher>
                </section>
              </div>

              <section className="mt-[8px] bg-white md:hidden">
                <Dropdown title="Mô tả sản phẩm" opened={true}>
                  <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                    {product.description}
                  </p>
                </Dropdown>
              </section>
              <section className="mt-[8px] bg-white md:hidden">
                <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
              </section>
              <div className="h-[66px] md:hidden"></div>
              <div className="md:hidden">
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
                      <p>Chọn loại hàng</p>
                    </LongButton>
                  </div>
                </ButtonFooterContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Preview;
