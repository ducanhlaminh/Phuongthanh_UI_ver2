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
const { FaSortAmountDownAlt, AiOutlinePlus, GrSubtract } = icons;

function ListProducts({ categoryData }) {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedFilterSider, setSelectedFilterSider] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const { products, loading } = useSelector((state) => state.app);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const minDistance = 100000;

  const [value2, setValue2] = useState([50000, 80000]);
  useEffect(() => {
    console.log(value2);
  }, [value2]);
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      console.log(newValue);
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1000000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  function numFormatter(num) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num); // if value < 1000, nothing to do
  }
  useEffect(() => {
    const filter = Object.values(selectedFilter.sort);

    dispatch(
      actions.getProduct({
        categoryCode: categoryData.code,
        inStocking: 1,
        price: value2,
        order: [...filter],
      })
    );
  }, [selectedFilter, categoryData, value2]);

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <AppBar title={categoryData.valueVi} />
        <div className="w-full flex flex-wrap justify-evenly my-[56px]">
          {products.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              image={product.mainImage}
              price={product.costPerUnit}
            />
          ))}

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
            numFormatter={numFormatter}
            value2={value2}
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
              <div className="w-[20%]  p-5 hidden lg:block">
                <div>
                  <div
                    className="border-b-2 py-3 justify-between flex "
                    onClick={() => setIsShowFilter(!isShowFilter)}
                  >
                    <span>Choose</span>
                    {!isShowFilter ? <AiOutlinePlus /> : <GrSubtract />}
                  </div>
                  {isShowFilter && (
                    <div className="p-3 bg-slate-200">
                      {filtersSider.map((filter) => (
                        <div className="flex justify-center items-center min-h-[50px]">
                          <input
                            type="checkbox"
                            value={JSON.stringify(filter)}
                            className="w-1/5"
                          />
                          <label htmlFor="" className="w-4/5 text-center">
                            {filter.valueVi}
                          </label>
                        </div>
                      ))}
                      <div className="mt-[50px]">
                        <Slider
                          getAriaLabel={() => "Minimum distance shift"}
                          value={value2}
                          onChange={handleChange2}
                          valueLabelDisplay="on"
                          step={100000}
                          marks
                          disableSwap
                          max={1000000}
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

                <div className="flex flex-wrap flex-auto w-full min-h-[800px] p-5 relative">
                  {loading === true ? (
                    <LoadingPageDesktop />
                  ) : (
                    products.map((item) => (
                      <div className="w-1/3 flex justify-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProducts;
