import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import icons from "../../ultils/icons";
import { FilterProductsMobile } from "../../components/Modal";
import { filters } from "../../ultils/constant";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const { FiFilter, FaSortAmountDownAlt } = icons;
function ListProducts({ title }) {
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState(filters[0]);
    const [selectedValue, setSelectedValue] = useState(filters[0]);
    const [isShow, setIsShow] = useState(false);
    const { categories, products, code } = useSelector((state) => state.app);

    useEffect(() => {
        console.log(selectedValue.code);
        const filter = Object.values(selectedFilter?.sort);

        dispatch(
            actions.getProduct({
                categoryCode: code,
                order: [...filter],
            })
        );
    }, []);
    return (
        <>
            <AppBar title={title} />
            <div className="w-full flex flex-wrap justify-evenly my-[56px]">
                {products.map(product => (<Card name={product.name} image={product.mainImage} price={product.costPerUnit} />))}

                <div className="fixed bottom-0 w-full h-[56px] bg-[#eeeeeefc]">
                    <div className="flex w-full h-full" onClick={(e) => {

                        setIsShow(true);
                    }}>
                        <div className="w-1/2 h-full flex justify-center items-center" >
                            <b className="flex">
                                <span className="text-xl mr-1">
                                    <FiFilter />
                                </span>
                                FILTER
                            </b>
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center">
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
            {isShow && <FilterProductsMobile selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} setIsShow={setIsShow} />}
        </>
    );
}

export default ListProducts;
