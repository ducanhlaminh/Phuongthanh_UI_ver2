function Card({ name = 'Tui Dior', shortDescription = 'túi xách', cost }) {
    return (
        <>
            <div className="max-w-[150px] h-[219px]">
                <div className="h-[80%]">
                    <img src="https://cdn.elly.vn/uploads/2021/09/23023802/chiec-tui-tote-dior-luon-la-su-lua-chon-tuyet-voi-danh-cho-cac-quy-co-cong-so.1.jpg" alt="" className="object-cover" />
                </div>
                <div className="h-[20%]">

                </div>
            </div>
        </>
    );
}

export default Card;