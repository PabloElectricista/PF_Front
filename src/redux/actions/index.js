import axios from 'axios'


const URL_PRODUCTS= "http://localhost:4000/products";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_INSTRUMENT_BY_NAME = "GET_INSTRUMENT_BY_NAME";

export const getAllProducts = () => {
    return async function (dispatch) {
        var products;
        try {
            products = await axios(URL_PRODUCTS)
        } catch (error) {
            console.log(error.message);
        }

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
