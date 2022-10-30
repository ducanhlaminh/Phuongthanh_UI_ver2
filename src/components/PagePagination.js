import { useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
const PagePagination = ({
  dataCount,
  currentPage,
  setCurrentPage,
  itemPerPage,
}) => {
  const [pages, setPages] = useState();
  const leftPage=Math.max(currentPage-2,1);
  const rightPage=Math.min(currentPage+2,pages);
  const showLeftDots=leftPage >2;
  const showRightDots=rightPage<pages-2;
  let pageArray = [];
  const range=(start,end)=>{
    for (let i = start; i <= end; i++) {
      pageArray.push(i);
    }
  }
  if (pages<=5) {
    range(1,pages);
  }
  if(!showLeftDots&& showRightDots){
    range(1,5);
    pageArray.push("...");
  }
  useEffect(() => {
    setPages(Math.ceil(dataCount / +itemPerPage));
  }, [dataCount, itemPerPage]);

  return (
    <div className="flex justify-center items-center ">
      <div>
        <MdArrowForwardIos
          className="rotate-[180deg]"
          size={18}
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
        />
      </div>
      {pageArray.map((page, i) => (
        <div
          key={i}
          className={`w-[22px] h-[22px] mx-[6px] flex items-center justify-center ${
            page === currentPage ? "text-primary" : "text-black"
          } font-medium`}
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {page}
        </div>
      ))}
      <div>
        <MdArrowForwardIos
          size={18}
          onClick={() => {
            if (currentPage !== pageArray[pageArray.length - 1]) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PagePagination;
