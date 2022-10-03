function Card({ name = 'Tui Dior', shortDescription = 'Túi christian dior chính hãng', cost = '2000', preCost = '3000' }) {
    return (
        <>
            <div className="max-w-[150px] h-[219px]">
                <div className="h-[60%]">
                    <img src="https://i0.wp.com/tuixachhanghieu.com/wp-content/uploads/2021/05/Dior-Book-Tote-1.jpg?fit=1020%2C714&ssl=1" alt="" className="object-cover h-full rounded-xl" />
                </div>
                <div className="h-[40%] p-1">
                    <div className="font-semibold">{name}</div>
                    <p className="text-sm">{shortDescription}</p>
                    <div className="">
                        <span className="font-bold">{`$${cost}`}</span>
                        <p className="text-xs">{`$${preCost}`}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;