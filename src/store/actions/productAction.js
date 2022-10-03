import actionTypes from "./actionTypes";
import ApiProduct from "../../apis/product";


export const getProducts = (params) => async (dispatch) => {
    try {
        const response = await ApiProduct.getAll(params);
        if (response?.status === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCTS,
                products: response.productData.rows,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCTS,
                products: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS,
            products: null,
        });
    }
};
export const getLastestProducts = (params) => async (dispatch) => {
    try {
        const response = await ApiProduct.getAll(params);
        if (response?.status === 0) {
            dispatch({
                type: actionTypes.GET_LASTEST_PRODUCTS,
                products: response.productData.rows,
            });
        } else {
            dispatch({
                type: actionTypes.GET_LASTEST_PRODUCTS,
                products: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_LASTEST_PRODUCTS,
            products: null,
        });
    }
};
export const getTopProducts = (params) => async (dispatch) => {
    try {
        const response = await ApiProduct.getAll(params);
        if (response?.status === 0) {
            dispatch({
                type: actionTypes.GET_TOP_PRODUCTS,
                products: response.productData.rows,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TOP_PRODUCTS,
                products: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOP_PRODUCTS,
            products: null,
        });
    }
};