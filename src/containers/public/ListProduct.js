import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import icons from "../../ultils/icons";
import { FilterProductsMobile } from "../../components/Modal";
import { filters } from "../../ultils/constant";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Slider } from "../../components";
import { ProductItem } from "../../components";
const { FiFilter, FaSortAmountDownAlt, AiOutlinePlus, GrSubtract } = icons;
function ListProducts({ title }) {
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState(filters[0].sort);
    const [selectedValue, setSelectedValue] = useState(filters[0]);
    const [isShow, setIsShow] = useState(false);
    const { categories, products, code } = useSelector((state) => state.app);
    const [isShowFilter, setIsShowFilter] = useState(false);
    useEffect(() => {
        console.log(selectedFilter);
        const filter = Object.values(selectedFilter);

        dispatch(
            actions.getProduct({
                categoryCode: code,
                order: [...filter],
            })
        );
    }, [selectedFilter]);

    return (
        <>
            <div className="lg:hidden">
                <AppBar title={title} />
                <div className="w-full flex flex-wrap justify-evenly my-[56px]">
                    {products.map((product) => (
                        <Card key={product.id}
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
                    />
                )}
            </div>
            <div className="lg:block w-full ">
                <div className='py-6 mb-6 flex flex-col gap-8 '>
                    <Slider />

                    <div className=" w-full px-6">
                        <h2 className=" text-3xl font-extrabold">Đồ gia dụng</h2>
                        <div className="flex ">
                            <div className="w-[20%] h-[800px] p-5">
                                <div>
                                    <div className="border-b-2 py-3 justify-between flex " onClick={() => setIsShowFilter(!isShowFilter)}>
                                        <span>Choose</span>
                                        {!isShowFilter ? <AiOutlinePlus /> : <GrSubtract />}
                                    </div>
                                    {isShowFilter && <div className="p-3 bg-slate-200">
                                        <div className="flex mb-2">
                                            <input type="checkbox" className="mr-5" />
                                            <label htmlFor="">Best Saler</label>
                                        </div>
                                        <div className="flex">
                                            <input type="checkbox" className="mr-5" />
                                            <label htmlFor="">Stocking</label>
                                        </div>
                                    </div>}
                                </div>


                            </div>

                            <div className="w-[80%] flex flex-wrap justify-center ">
                                {products.map(item => (<ProductItem key={item.id}
                                    image={item?.mainImage}
                                    title={item?.name}
                                    description={item?.description}
                                    cost={item?.costPerUnit}
                                />))}
                            </div>
                        </div>

                    </div>

                </div >
            </div >
        </>
    );
}

export default ListProducts;
