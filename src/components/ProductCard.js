import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import * as actions from "../store/actions";
import {togglePopup} from '../store/actions/popupAction';
import { convertPrice } from "../ultils/common";

export const ProductCardCtHeight = ({
  id,
  image,
  name,
  color,
  costPerUnit,
}) => {
  const cartItem = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatch = async () => {
    await dispatch(actions.getProductByIdClient({ id: id}));
    navigate(`/detail/${id}`)
  }
  const isProductInCart = (id) => {
    for (let i = 0; i < cartItem.products.length; i++) {
      if (cartItem.products[i].id === id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="w-[200px] md:w-[230px] h-[320px] flex flex-col items-center bg-white rounded-[10px] overflow-hidden relative drop-shadow-md ">
      <div 
      onClick={() => handleDispatch()}
      className={`mb-[20px] w-full`}>
        <img className="w-full h-[187px] object-cover " src={image} />
      </div>
      <p
        className="absolute text-white rounded-[10px] top-[172px] left-[20px] text-[12px] px-[5px] py-[6px]"
        style={{ backgroundColor: color }}
      >
        {convertPrice(costPerUnit)}
      </p>
      <p className="text-align text-wrap left decoration-double font-large text-[15px] pl-[12px] pr-[4px] h-[40px] text-ellipsis overflow-hidden">
        {name}
      </p>
      <div className="absolute bottom-[0px] flex items-end justify-around w-full py-3">
        <AiOutlineShoppingCart size={20} color={color} onClick={() => {
          if (isLoggedIn.isLoggedIn) {
            if (!isProductInCart(id)) {
              dispatch(actions.addToCartAction({
                id,
                image,
                name,
                color,
                costPerUnit,
              }))
            }
          }
          else {
            dispatch(togglePopup(true))
          }
        }} ></AiOutlineShoppingCart>

        <Link
          onClick={async() => await dispatch(actions.getProductByIdClient({ id: id}))}
          to={`/detail/${id}`}
          style={{ color: color }}
          className="text-[11px] font-bold"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};
