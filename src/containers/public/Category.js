import React from "react";

const Category = ({ categoryData }) => {
  console.log(categoryData);
  return (
    <div className="h-[500px] flex justify-center items-center">
      {categoryData.code}
    </div>
  );
};

export default Category;
