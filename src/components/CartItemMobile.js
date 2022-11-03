import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceCaculator } from "../ultils/caculator";
import {numFormatter} from '../ultils/fn'

const CartItemMobile = ({
  product,variants,
  setQuanityList,
  quanityList,
  checkedList,
  setOpenAlertPopup,
  setIdDelete,
  isMobile,
  setCheckedList}
  ) => {
  const{id,name,mainImage,soldCounter} = product || {}
  const [price, setPrice] = useState(0)
  const [quanityProduct, setQuanityProduct] = useState(1)
  const [isChecked, setIsChecked] = useState(false)
  let idUnique = null

  const getIdUnique = () => {
    idUnique=id
    variants.map((variant) => {
      idUnique += `--${variant.variant}-${variant.value}_${variant.price}`
    })
  }
  getIdUnique()

  useEffect(() => setPrice(PriceCaculator(product,variants)),[])
  useEffect(() => {
    let index = checkedList.indexOf(idUnique)
    if(isChecked) {
      if(index !== -1){
        quanityList.splice(index,1,quanityProduct)
        let data = quanityList
        setQuanityList([...data])
      }else{
        setQuanityList(prev => [...prev,quanityProduct])
        setCheckedList(prev => [...prev,idUnique])
      }
    }else if(!isChecked){
      if(index!==-1){
        quanityList.splice(index,1)
        setCheckedList(prev => prev.filter(id => id !== idUnique))
      }
    }
  },[quanityProduct,isChecked])

  return (
    <>
      {/*Mobile*/}
      {isMobile&&<div className="w-full md:hidden bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
            <div className="flex h-[120px]">
            <input id={idUnique+'-mobile'} className="cursor-pointer" type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)}/>
            <label htmlFor={idUnique+'-mobile'} className="flex">
              <img
                src={product?.mainImage}
                alt="ProductImage"
                className="object-cover"
              />
              <div className="p-2 flex flex-col justify-around">
                <b className="text-base">{product?.name}</b>
                <p>{
                  variants.map((variant,i) => {
                    let variantLength = variants?.length
                    return(
                      <>
                      <span>{variant?.variant}: {variant?.value}</span>
                      <span>{i<variantLength-1?', ':''}</span>
                      </>
                    )
                  })
                }</p>
                <div className="flex bg-slate-300 p-1 w-fit rounded-sm">
                  <div className="flex justify-center items-center">
                    <span className="text-xs">Số lượng :</span>
                  </div>
                  <select 
                    onChange={(e) => setQuanityProduct(e.target.value)}
                    className="bg-slate-300 font-bold">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">{numFormatter(price*quanityProduct)}</span>
                </div>
              </div>
              </label>

            </div>
            <div className="flex h-[40px] border-t-2 font-bold text-primary">
              <div className="border-r-2 w-1/2 flex justify-center items-center ">
                <span>Yêu thích</span>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <span>Xóa</span>
              </div>
            </div>
          </div>}
    </>
  );
};
export default CartItemMobile;
