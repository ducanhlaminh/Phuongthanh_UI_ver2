const NameAndDescription=({name,shortDescription})=>{
    return <section className="leading-5 mt-[20px]">
    <p className="font-medium text-[16px] lg:text-[34px] lg:font-semibold">
      {name}
    </p>
    <p className="text-[#626262] text-[14px] font-medium mt-[3px] lg:text-[20px] lg:font-semibold leading-7 lg:mt-[13px]">
      This is for short description of the product
    </p>
  </section>
}

export default NameAndDescription;