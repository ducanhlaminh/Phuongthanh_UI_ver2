import ProductItem from "./ProductItem";
import {Link} from "react-router-dom"
import { generatePath } from "../ultils/fn";


const RelatedProduct = ({ products,cate }) => {
  return (
    <div>
      <Link  to={`/${generatePath(cate)}`} className="font-semibold text-[14px] text-primary flex justify-end mb-[16px]">Xem tất cả</Link>
      <div className="flex overflow-x-auto w-full gap-[16px]">
        {products.map((item) => {
          return (
            <div className="w-[286px]">
              <ProductItem
                key={item.id}
                productId={item.id}
                image={item?.mainImage}
                title={item?.name}
                description={item?.description}
                cost={item?.costPerUnit}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;
