const NameAndDescription=({name,shortDescription})=>{
    return <section className="leading-5 mt-[20px]">
    <p className="font-medium text-[16px] md:text-[34px] md:font-semibold">
      {name}
    </p>
    <p className="text-[#626262] text-[14px] font-medium mt-[3px] md:text-[20px] md:font-semibold leading-7 md:mt-[13px]">
      This is for short description of the product
    </p>
  </section>
}

export default NameAndDescription;