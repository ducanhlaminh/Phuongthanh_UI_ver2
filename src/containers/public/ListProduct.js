import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import icons from "../../ultils/icons";
const { FiFilter, FaSortAmountDownAlt } = icons;
function ListProducts({ title }) {
    return (
        <>
            <AppBar title={title} />
            <div className="w-full flex flex-wrap justify-evenly mb-[56px]">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <div className="fixed bottom-0 w-full h-[56px] bg-[#eeeeeefc]">
                    <div className="flex w-full h-full">
                        <div className="w-1/2 h-full flex justify-center items-center">
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
        </>
    );
}

export default ListProducts;
