import icons from "../ultils/icons";
const { MdArrowBackIos } = icons;
function AppBar({ title }) {
    return (
        <>
            <div className="w-full bg-white min-h-[56px] flex justify-center items-center">
                <div className="min-h-[26px] w-[90%] flex flex-row gap-5 text-2xl">
                    <div className=" flex items-center justify-center">
                        <MdArrowBackIos />
                    </div>
                    <div className=" h-full text-primary font-semibold">{title}</div>
                </div>
            </div>
        </>
    );
}

export default AppBar;
