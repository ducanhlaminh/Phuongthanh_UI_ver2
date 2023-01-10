import wishlist from "../../apis/wishlist";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import LongButton from "../../components/LongButton";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import noWishlist from "../../assets/NoWishlist.png";

const WishList = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await wishlist.getAllWish();
      setProducts(res.wishlist);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Header>
        <div className="flex text-[14px] text-primary items-center font-[600] gap-[20px]">
          <MdOutlineArrowBackIosNew size="24" />
          <div>Yêu thích</div>
        </div>
      </Header>

      <div>
        <img src={noWishlist}/>
      </div>

      <ButtonFooterContainer>
        <Link to="/" className="w-[95%]">
          <LongButton
            width="100%"
            height="44px"
            backgroundColor="#1B4B66"
            color="white"
          >
            <p>Trở về trang chủ</p>
          </LongButton>
        </Link>
      </ButtonFooterContainer>
    </div>
  );
};

export default WishList;
