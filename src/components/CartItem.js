import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceCaculator } from "../ultils/caculator";
import {numFormatter} from '../ultils/fn'

const CartItem = ({
  product,variants,
  setQuanityList,
  quanityList,
  checkedList,
  setOpenAlertPopup,
  setIdDelete,
  isMobile,
  cartID,
  dataBill,
  setDataBill,
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
    let varName=''
    variants.map((variant) => {
      varName += `${variant.variant}: ${variant.value}. `
    })
    let index = checkedList.indexOf(idUnique)
    let billData = {
      pid: id,
      qty: quanityProduct,
      variant: varName,
      cost: price
    }
    if(isChecked) {
      if(index !== -1){
        quanityList.splice(index,1,quanityProduct)
        let data = quanityList
        setQuanityList([...data])
        dataBill.splice(index,1,billData)
        let tempData = dataBill
        setDataBill([...tempData])
      }else{
        setQuanityList(prev => [...prev,quanityProduct])
        setCheckedList(prev => [...prev,idUnique])
        setDataBill(prev => [...prev,billData])
      }
    }else if(!isChecked){
      if(index!==-1){
        quanityList.splice(index,1)
        dataBill.splice(index,1)
        setCheckedList(prev => prev.filter(id => id !== idUnique))
      }
    }
  },[quanityProduct,isChecked])

  return (
    <>
      {!isMobile&&<div key={idUnique} className="my-3 hidden md:block border-b-2 px-3">
        <div className="w-full flex h-[80px]">
          <div className=" w-[50%]">
            <div className="flex h-full ">
              <div className="w-[80px]">
                <img src={mainImage} alt="" className="object-cover h-full" />
              </div>

              <div className="p-2 flex flex-col justify-evenly">
                <Link to={`/chi-tiet-san-pham/${id}`} className=" font-bold">{name}</Link>
                <p className="text-xs">Đã bán: {soldCounter}</p>
                <div className="flex bg-slate-300 p-1 rounded-sm w-fit">
                  <div className="flex justify-center items-center">
                    <div className="text-xs flex justify-center items-center">
                      <span>Số lượng :</span>
                    </div>
                  </div>
                  <select
                    className="bg-slate-300 text-xs h-[20px]"
                    defaultValue={1}
                    onChange={(e) => setQuanityProduct(e.target.value)}
                  >
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
                <div className="inline">{
                  variants.map((variant,i) => {
                    let variantLength = variants.length
                    return(
                      <>
                      <span>{variant.variant}: {variant.value}</span>
                      <span>{i<variantLength-1?', ':''}</span>
                      </>
                    )
                  })
                }
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] text-center">{numFormatter(price)}</div>
          <div className="w-[15%] text-center">{quanityProduct}</div>
          <div className="w-[15%] text-center">
            {numFormatter(price*quanityProduct)}
          </div>
        </div>
        <div className="flex justify-end h-[20px] mb-2 font-bold">
          <div className="w-fit flex justify-between">
            <p className="text-primary border-b-4 border-b-primary pb-5 w-fit mr-2">
              <input id={idUnique} className="cursor-pointer" type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)}/>
              <label className="cursor-pointer" htmlFor={idUnique}>Chọn</label>
            </p>
            <p className="text-primary border-b-4 border-b-primary ml-[24px] pb-5 w-fit mr-2 cursor-pointer">Yêu thích</p>
            <p 
            onClick={() => {
              setIdDelete(cartID)
              setOpenAlertPopup(true)}}
            className=" text-red-700 border-b-4 ml-[24px] border-b-red-700 pb-5 w-fit cursor-pointer">
              Xóa
            </p>
          </div>
        </div>
      </div>}
    </>
  );
};
export default CartItem;
