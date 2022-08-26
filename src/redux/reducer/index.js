const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    FILTERED_INSTRUMENTS,
    CREATE_PRODUCT,
    ORDER_NAME,
	ORDER_PRICE,
} = require('../actions/index');

function orderMayMen(array, prop) {
	let newArray = array.sort((a, b) => {
		if (a[prop] < b[prop]) return 1;
		if (a[prop] > b[prop]) return -1;
		return 0;
	});
	return newArray;
}
function orderMenMay(array, prop) {
	let newArray = array.sort((a, b) => {
		if (a[prop] < b[prop]) return -1;
		if (a[prop] > b[prop]) return 1;
		return 0;
	});
	return newArray;
}

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null,
    filteredIntruments: [],
    
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload
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
                return{
                    ...state,
                    allInstruments: [action.payload,...state.allInstruments]
                }
        case FILTERED_INSTRUMENTS:
            console.log(action.payload);
                return{
                ...state, 
                instruments: action.payload
            }

            case ORDER_NAME:
			let sortedName =
				action.payload === "Up to Down"
					? orderMayMen(state.instruments, "name")
					: orderMenMay(state.instruments, "name");
			return {
				...state,
				allInstruments:
					action.payload === "All"
						? [...state.instruments]
						: sortedName,
			};
		case ORDER_PRICE:
			let sortedPrice =
				action.payload === "Higher price"
					? orderMayMen(state.instruments, "price")
					: orderMenMay(state.instruments, "price");
			return {
				...state,
				allInstruments:
					action.payload === "All" ? [...state.instruments] : sortedPrice,
			};
        default:
            return state
    }

   
}
