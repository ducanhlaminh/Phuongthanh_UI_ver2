function Analyst() {
    return ( 
        <div className="flex justify-around">
            <div className="flex bg-white w-1/5">
                <div>
                    <p>{new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(200000)}</p>
                </div>
            </div>
        </div>
     );
}

export default Analyst;