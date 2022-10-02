import { ProductCardCtHeight } from "./ProductCard";
import { useSelector } from "react-redux";

const BoxTopSeller = ({ color }) => {
  const { productsBestSeller, productsCurrentUpdate } = useSelector(state => state.app)
  return (
    <div className="bg-[#d9d9d9] mb-[5px] p-4 rounded">
      <div className="mb-[3px] text-[15px] lg:text-[24px] flex">
        <div className="flex">
          <span className="font-bold">#Top </span>
          <span style={{ color: color }} className="font-bold">
            bán chạy
          </span>
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full 
        scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-black-300 
        lg:w-[90%] overflow-x-auto flex mx-auto">
          {productsBestSeller?.map((product) => (
            <div className="[&:not(:last-child)]:mr-5 pb-[18px]">
              <ProductCardCtHeight
                id={product.id}
                image={product.mainImage}
                name={product.name}
                costPerUnit={product.costPerUnit}
                color={color}
              ></ProductCardCtHeight>
            </div>
          ))}
        </div>
      </div>


      <div>
        <div className="mt-[20px] mb-[5px]">
          <span
            style={{ color: color }}
            className="font-bold text-[15px] lg:text-[24px]"
          >
            #Mới nhất
          </span>
        </div>
        <div className="w-full">
          <div className="scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-black-300 
           w-full lg:w-[90%] overflow-x-auto flex mx-auto ">
            {productsCurrentUpdate?.map((product) => (
              <div className="[&:not(:last-child)]:mr-5 pb-[18px]">
                <ProductCardCtHeight
                  id={product.id}
                  image={product.mainImage}
                  name={product.name}
                  costPerUnit={product.costPerUnit}
                  color={color}
                ></ProductCardCtHeight>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxTopSeller;