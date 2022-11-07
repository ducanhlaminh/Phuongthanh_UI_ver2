import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import icons from "../../ultils/icons";
import { FilterProductsMobile } from "../../components/Modal";
import { filters, filtersSider } from "../../ultils/constant";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Slider as SliderImage } from "../../components";
import { Slider } from "@mui/material";
import { ProductItem } from "../../components";
import { SelectCustomWidth } from "../../components/InputCtWidth";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import Pagination from "@mui/material/Pagination";
const { FaSortAmountDownAlt, AiOutlinePlus, GrSubtract } = icons;

function ListProducts({ categoryData }) {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedFilterSider, setSelectedFilterSider] = useState([]);
  const [isShow, setIsShow] = useState(true);

  const { loading } = useSelector((state) => {
    return state.app;
  });
  const { products, count } = useSelector((state) => {
    return state.products;
  });
  const [isShowFilter, setIsShowFilter] = useState(true);
  const minDistance = 10000000;

  // luu page hien tai
  const [page, setPage] = useState(1);
  // onChange page
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [value2, setValue2] = useState([0, 1000000]);
  const [value, setValue] = useState([0, 1000000]);
  const handleChange2 = (event, newValue, activeThumb) => {
    setValue2(newValue);
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      console.log(newValue);
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };
  function numFormatter(num) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num); // if value < 1000, nothing to do
  }
  useEffect(() => {
    setPage(1);
  }, [selectedFilter, categoryData, value2, selectedFilterSider]);

  useEffect(() => {
    const filter = Object.values(selectedFilter.sort);
    dispatch(
      actions.getProducts({
        categoryCode: categoryData.code,
        inStocking: selectedFilterSider.some((item) => item.valueVi) ? 1 : 0,
        price: value2,
        limitProduct: 12,
        order: [...filter],
        page: page,
      })
    );
  }, [selectedFilter, categoryData, value2, selectedFilterSider, page]);

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <AppBar title={categoryData.valueVi} />
        <div className="w-full flex flex-wrap  my-[56px]">
          {loading === true ? (
            <LoadingPageDesktop />
          ) : (
            products?.map((product) => (
              <div className="w-1/2 flex justify-center" key={product.id}>
                <Card
                  name={product.name}
                  image={product.mainImage}
                  price={product.costPerUnit}
                />
              </div>
            ))
          )}
          <div className="flex justify-center w-full">
            {/* component Pagination ,count là số trang thì lấy tổng chia ra */}
            <Pagination
              count={Math.ceil(count / 12)}
              color="primary"
              size="large"
              page={page}
              onChange={handleChangePage}
            />
          </div>
          <div className="fixed bottom-0 w-full h-[56px] bg-[#eeeeeefc]">
            <div
              className="flex w-full h-full"
              onClick={(e) => {
                setIsShow(true);
              }}
            >
              <div className="w-full h-full flex justify-center items-center">
                <b className="flex">
                  <span className="text-xl mr-1">
                    <FaSortAmountDownAlt />
                  </span>
                  SORT
                </b>
              </div>
            </div>
          </div>
        </div>
        {isShow && (
          <FilterProductsMobile
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setIsShow={setIsShow}
            handleChange2={handleChange2}
            handleChange={handleChange}
            numFormatter={numFormatter}
            value={value}
            filtersSider={filtersSider}
            setSelectedFilterSider={setSelectedFilterSider}
            selectedFilterSider={selectedFilterSider}
          />
        )}
      </div>
      {/* Desktop */}
      <div className="md:block hidden w-full ">
        <div className="py-6 mb-6 flex flex-col gap-8 ">
          <SliderImage />

          <div className=" w-full lg:block px-6">
            <h2 className=" text-3xl font-extrabold">{categoryData.valueVi}</h2>
            <div className="flex ">
              {/* Navslider */}
              <div className="w-[20%]  p-5 hidden lg:block">
                <div>
                  <div
                    className="border-b-2 py-3 justify-between flex "
                    onClick={() => setIsShowFilter(!isShowFilter)}
                  >
                    <span>Lọc sản phẩm</span>
                    {!isShowFilter ? <AiOutlinePlus /> : <GrSubtract />}
                  </div>
                  {isShowFilter && (
                    <div className="p-3 bg-slate-200">
                      {filtersSider.map((filter) => (
                        <div className="flex justify-center items-center min-h-[50px]">
                          <input
                            type="checkbox"
                            checked={
                              selectedFilterSider.some((item) => item.valueVi)
                                ? 1
                                : 0
                            }
                            value={JSON.stringify(filter)}
                            className="w-1/5"
                            onClick={() => {
                              setSelectedFilterSider((prev) => {
                                return prev.some(
                                  (item) => item.valueVi === filter.valueVi
                                )
                                  ? prev.filter(
                                      (item) => item.valueVi !== filter.valueVi
                                    )
                                  : [...prev, filter];
                              });
                            }}
                          />
                          <label htmlFor="" className="w-4/5 text-center">
                            {filter.valueVi}
                          </label>
                        </div>
                      ))}
                      <div className="mt-[50px]">
                        <Slider
                          getAriaLabel={() => "Minimum distance shift"}
                          value={value}
                          onChange={handleChange}
                          onChangeCommitted={handleChange2}
                          valueLabelDisplay="on"
                          step={10000000}
                          marks
                          disableSwap
                          max={100000000}
                          valueLabelFormat={(value) => (
                            <div>{numFormatter(value)}</div>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-auto flex flex-wrap justify-evenly lg:w-[80%]">
                <div className="min-h-[56px] w-full bg-slate-200 flex justify-between p-3">
                  <div className="w-[20%]"></div>
                  <div className="w-[30%]">
                    <SelectCustomWidth
                      label="Loc"
                      widthP="full"
                      options={filters}
                      selectValue={selectedFilter}
                      setSelectValue={setSelectedFilter}
                    />
                  </div>
                </div>
                {/* Layout list sản phẩm */}
                <div className=" w-full  p-5 relative">
                  <div className="flex flex-wrap flex-auto min-h-[500px]">
                    {loading === true ? (
                      <LoadingPageDesktop />
                    ) : (
                      products.map((item) => (
                        <div className="w-1/3 flex justify-center ">
                          <ProductItem
                            key={item.id}
                            image={item?.mainImage}
                            title={item?.name}
                            description={item?.description}
                            cost={item?.costPerUnit}
                            productId={item?.id}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-center w-full">
                    <Pagination
                      count={Math.ceil(count / 12)}
                      color="primary"
                      size="large"
                      page={page}
                      onChange={handleChangePage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProducts;
