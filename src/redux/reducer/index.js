const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    FILTERED_INSTRUMENTS,
    CREATE_PRODUCT,
    ORDER_PRODUCTS,
    GET_REVIEWS_BY_PRODUCT_ID,
    ADD_REVIEW,
    CREATE_CONTACT,
    GET_MY_ORDERS,
    ACTIVE_LOADING,
    SHOW_ALERT,
    ADD_TO_CART,

} = require('../actions/index');

function orderMayMen(array, prop) {
    array.sort((a, b) => {
        if (a[prop] < b[prop]) return 1;
        if (a[prop] > b[prop]) return -1;
        return 0;
    });
}
function orderMenMay(array, prop) {
    array.sort((a, b) => {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
    });
}

const initialState = {
    instruments: [],
    allInstruments: [],
    retrievedInstrument: null,
    filteredIntruments: [],
    productReviewList: [],
    myOrders: [],
    isLoading: true,
    alertInfo: {
        displayAlert: false,
        alertVariant: 'success',
        alertTitle: '',
        alertText: ''
    }
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_MY_ORDERS:
            console.log("acion: myOrders", state.myOrders);
            if (!action.payload) { return state }
            const NewOrders = action.payload.orders.map(element => {
                return {
                    status: element.status,
                    quantity: element.products[0].quantity,
                    instrument: state.allInstruments.find(instrument => instrument._id === element.products[0].products)
                }
            })

            return { ...state, myOrders: NewOrders }
        //-------------------------
        //-------------------------
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
                isLoading: false
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload,
                isLoading: false
            }

        case UPDATE_PRODUCT:
            const allInstrumentsUpdated = state.allInstruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            const instrumentsUpdated = state.instruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            return {
                ...state,
                allInstruments: allInstrumentsUpdated,
                instruments: instrumentsUpdated,
                retrievedInstrument: action.payload
            }

        case CREATE_PRODUCT:
            return {
                ...state,
                allInstruments: [action.payload, ...state.allInstruments]
            }
        case FILTERED_INSTRUMENTS:
            console.log(action.payload);
            return {
                ...state,
                instruments: action.payload,
                isLoading: false
            }

        case ORDER_PRODUCTS:
            let sortedProducts = JSON.parse(JSON.stringify(state.instruments))
            switch (action.payload) {
                case "Up to Down":
                    orderMayMen(sortedProducts, "name");
                    break;
                case "Down to Up":
                    orderMenMay(sortedProducts, "name");
                    break;
                case "Higher price":
                    orderMayMen(sortedProducts, "price")
                    break;
                case "Lower price":
                    orderMenMay(sortedProducts, "price");
                    break;
                default:
                    break;
            }
            return {
                ...state,
                instruments: sortedProducts,
                isLoading: false
            }

        case GET_REVIEWS_BY_PRODUCT_ID:
            return {
                ...state,
                productReviewList: action.payload
            }

        case ADD_REVIEW:
            return {
                ...state,
                productReviewList: [
                    action.payload,
                    ...state.productReviewList]
            }

        case ACTIVE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ADD_TO_CART:
            // console.log(action.payload, 'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
            let newOrders = action.payload
            let productsOnly = []
            productsOnly = newOrders.map(function (elem) {
                let returnProducts = { product: elem.products }
                return returnProducts
            })
            let newArray = []
            for (let i = 0; i < productsOnly.length; i++) {
                newArray.push(productsOnly[i].product)
            }
            function flattenDeep(newArray) {
                return newArray.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
            }
            flattenDeep(newArray)
            console.log(flattenDeep(newArray))

            // console.log(productsOnly, 'SOY LA ORDEN')
            // console.log(finalInstruments, 'SOY LA ORDEN')
            return {
                ...state,
                cart: flattenDeep(newArray),
            }

        case CREATE_CONTACT:
            return {
                ...state,

            }

        case SHOW_ALERT:
            return {
                ...state,
                alertInfo: {
                    displayAlert: true,
                    ...action.payload
                }
            };



        default:
            return state
    }

}
