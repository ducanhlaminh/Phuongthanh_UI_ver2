const LongButton=({children,width,height,backgroundColor,color,size})=>{
    return <button className={`flex leading-6 font-semibold rounded-[8px] items-center justify-center`} style={{width:width,height:height,fontSize:size,color:color,backgroundColor:backgroundColor}}>
        {children}
    </button>
}

export default LongButton;