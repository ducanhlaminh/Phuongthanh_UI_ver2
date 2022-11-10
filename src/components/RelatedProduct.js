import ProductItem from "./ProductItem";
const RelatedProduct = ({ products }) => {
  return (
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
  );
};

export default RelatedProduct;
