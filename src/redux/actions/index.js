import axios from 'axios'

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_INSTRUMENT_BY_NAME = "GET_INSTRUMENT_BY_NAME";

export const getAllProducts = () => {
    return async function (dispatch) {
        const products = await axios('https://my.api.mockaroo.com/instruments_PF?key=2e3ffde0')

        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: products.data
        });
    };
};

export const getAllCategories = () => {
    return function (dispatch) {
        return dispatch({ type: GET_ALL_CATEGORIES, payload: null })
    }
}
export const createProduct = () => {
    return function (dispatch) {
        return dispatch({ type: CREATE_PRODUCT, payload: null })
    }
}
export const getInstrumentsByName = () => {
    return function (dispatch) {
        return dispatch({ type: GET_INSTRUMENT_BY_NAME, payload: null })
    }
}
