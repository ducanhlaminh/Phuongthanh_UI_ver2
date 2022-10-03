import actionTypes from "../actions/actionTypes";

const initState = {
    products: [],
    lastestProducts: [],
    topProducts: []
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.products || []
            }
        case actionTypes.GET_LASTEST_PRODUCTS:
            return {
                ...state,
                lastestProducts: action.products || []
            }
        case actionTypes.GET_TOP_PRODUCTS:
            return {
                ...state,
                topProducts: action.products || []
            }

        default:
            return state;
    }
};

export default productReducer;
