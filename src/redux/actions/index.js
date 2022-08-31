import axios from 'axios'
const URL_PRODUCTS = "http://localhost:4000/products";  // temporal para las pruebas

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_INSTRUMENT_BY_NAME = "GET_INSTRUMENTS_BY_NAME";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FILTERED_INSTRUMENTS = "FILTERED_INSTRUMENTS";
export const GET_USER_NAME_ORDERS = "GET_USER_NAME_ORDERS";
export const GET_USER_NAME_COMMENT = "GET_USER_NAME_COMMENT";
export const GET_USERS = "GET_USERS";
export const GET_USER_NAME = "GET_USER_NAME";
export const POST_USER = "POST_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const UPDATE_AMOUNT = "UPDATE_AMOUNT";
export const CLEAR_CART = "CLEAR_CART";
export const PURCHASE_ORDER = "PURCHASE_ORDER";
export const ADD_TO_CART_PURCHASE_ORDER = "ADD_TO_CART_PURCHASE_ORDER";
export const REMOVE_ONE_FROM_CART_PURCHASE_ORDER = "REMOVE_ONE_FROM_CART_PURCHASE_ORDER";
export const REMOVE_ALL_FROM_CART_PURCHASE_ORDER = "REMOVE_ALL_FROM_CART_PURCHASE_ORDER";



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

// export const getInstrumentsByName = () => {
//     return function (dispatch) {
//         return dispatch({ type: GET_INSTRUMENT_BY_NAME, payload: null })
//     }
// }

export const getProductById = (instrumentId) => {
    return function (dispatch) {
        axios.get(`${URL_PRODUCTS}/${instrumentId}`)
            .then(response =>
                dispatch({
                    type: GET_PRODUCT_BY_ID,
                    payload: response.data
                })
            )
            .catch(error =>
                dispatch({
                    type: GET_PRODUCT_BY_ID,
                    payload: { error: error.message }
                })
            );
    }
}

export const updateProduct = (instrumentItem) => {
    return async function (dispatch) {
        const response = await axios.put(`${URL_PRODUCTS}/${instrumentItem._id}`,
            instrumentItem);
        return dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data
        });
    };
};

export function createProduct(payload) {
    return async function (dispatch) {
        await axios.post('http://localhost:4000/products', payload)
    }
}

let queries={
    name:"",
    categorie:"",
    status:"",
    brand:""
}
export function filteredIntruments(payload) {
    return async function (dispatch) {
        let condition=[];
        queries={...queries,...payload}
        for(const key in queries){
            if(queries[key]) condition.push(`${key}=${queries[key]}`)
        }
        const filter = await axios.get(`http://localhost:4000/filter?${condition.join('&')}`)
        dispatch({
            type: FILTERED_INSTRUMENTS,
            payload: filter.data
        })
    }
}

export function getUsers() {
  return async function (dispatch) {
    const json = await axios.get('http://localhost:4000/users')
    console.log('///users:SOY EL GET USERS')
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    })
  }
}

// export function getUserName(payload) {
//   return {
//     type: GET_USER_NAME,
//     payload: payload,
//   }
// }

export function getUserNameOrders(payload) {
  return {
    type: GET_USER_NAME_ORDERS,
    payload: payload,
  }
}

// export function getUserNameComment(payload) {
//   return {
//     type: GET_USER_NAME_COMMENT,
//     payload: payload,
//   }
// }


//COMPRAS

export function addToCart() {
  return async (dispatch) => {
    const NewOrder = await axios.get(
      'http://localhost:4000/orders/user/630e5167d4480e5b45e82970'
      )
      // console.log(NewOrder.data.orders)
    const productsInCart = NewOrder.data.orders
      return dispatch({
      type: ADD_TO_CART,
      payload: productsInCart,
    })
  }
}
export function removeOneFromCart(id) {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: id,
    })
  }
}
export function removeAllFromCart(id) {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_ALL_FROM_CART,
      payload: id,
    })
  }
}
export function updateAmount(amount) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_AMOUNT,
      payload: amount,
    })
  }
}

export function clearCart() {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_CART,
      payload: 'nada',
    })
  }
}

export function purchaseOrder(payload) {
  console.log('PURCHASE', payload)
  return (dispatch) => {
    return dispatch({
      type: 'PURCHASE_ORDER',
      payload: payload,
    })
  }
}

export function addToCartPurchaseOrder(payload) {
  return (dispatch) => {
    return dispatch({
      type: ADD_TO_CART_PURCHASE_ORDER,
      payload: payload,
    })
  }
}

export function removeOneFromCartPurchaseOrder(payload) {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_ONE_FROM_CART_PURCHASE_ORDER,
      payload: payload,
    })
  }
}

export function removeAllFromCartPurchaseOrder(payload) {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_ALL_FROM_CART_PURCHASE_ORDER,
      payload: payload,
    })
  }
}
