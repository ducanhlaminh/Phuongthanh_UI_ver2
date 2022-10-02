import actionTypes from "../actions/actionTypes";

const initState = {
    products: [],
    count: 0,
    productsPayment: [],
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return { ...state, count: state.count + 1, products: [...state.products, action.data] }
        case actionTypes.DETELE_ALL:
            return { ...state, count: 0, products: [] }
        case actionTypes.ADD_TO_PAYMENT:

            return { ...state, productsPayment: [...state.productsPayment, action.data] }
        case actionTypes.DELETE_FROM_PAYMENT:

            let newProductsPayment = state.productsPayment.filter((product) => { return product !== action.data });
            return { ...state, productsPayment: newProductsPayment }
        case actionTypes.UPDATE_PAYMENT:
           
            let updateQuantityProductsPayment= state.productsPayment.map((product) =>{ 
                product= JSON.parse(product);
                if(product.id===action.data.id)
                {
                    product.quantity=action.data.quantity;
                    return JSON.stringify(product);
                }
                else return JSON.stringify(product);
            })
            return {...state, productsPayment:updateQuantityProductsPayment}
            case actionTypes.DELETE_ALL_PAYMENTS:
                return {...state, productsPayment:[]};
        default:
            return state;
    }
}

export default cartReducer;