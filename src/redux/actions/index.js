import axios from 'axios'

const URL_PRODUCTS= "http://localhost:4000/products";  // temporal para las pruebas

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_INSTRUMENT_BY_NAME = "GET_INSTRUMENT_BY_NAME";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const getAllProducts = () => {
    return async function (dispatch) {
        const products = await axios(URL_PRODUCTS)  // temporal para las pruebas

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
// export const createProduct = () => {
//     return function (dispatch) {
//         return dispatch({ type: CREATE_PRODUCT, payload: null })
//     }
// }

export const getInstrumentsByName = () => {
    return function (dispatch) {
        return dispatch({ type: GET_INSTRUMENT_BY_NAME, payload: null })
    }
}

export const updateProduct = (instrumentItem) => {
    return async function (dispatch) {
        const response = await axios.put(`http://localhost:3001/instruments/${instrumentItem.id}`,
                                          instrumentItem);
        return dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data
        });
    };
};

export function createProduct(payload){
    return async function(dispatch){
        await axios.post('http://localhost:4000/products',payload)
    }
}