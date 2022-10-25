import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useState, useEffect,useRef } from "react";
import ApiProduct from "../../apis/product";
import Card from "../../components/Card";
import { LoadingPageDesktop } from "../../components/LoadingPage";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ApiProduct.getProductByIdClient({
          name: searchKeyword,
          limitProduct: 10,
        });
        setProducts(res.productData.rows);
        setIsLoading(false);
      } catch (err) {}
    };

    if (searchKeyword.length !== 0) fetchProduct();
    if(isLoading){
      setProducts([]);
    }
  }, [searchKeyword]);
  return (
    <>
      <Header>
        <MdOutlineArrowBackIosNew size="24" />
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex bg-lightGrey h-[40px] w-[85%] items-center p-[8px] ml-[10px] rounded-[4px]"
        >
          <input
            placeholder="Tìm kiếm"
            className="bg-lightGrey h-full outline-none w-[90%] placeholder:font-medium placeholder:text-[14px]"
            value={searchKeyword}
            onChange={(e) => {
              setIsLoading(true);
              setSearchKeyword(e.target.value);
            }}
          />
          <RiSearchLine size={24} />
        </div>
      </Header>
      <div className="w-full flex flex-wrap justify-evenly my-[56px] min-h-[500px]">
        {isLoading && <LoadingPageDesktop />}
        {products?.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            image={product.mainImage}
            price={product.costPerUnit}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
