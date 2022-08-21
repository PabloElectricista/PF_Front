const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT
} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null
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
            item.id === action.payload.id ? action.payload : item);

            const instrumentsUpdated = state.instruments.map(item =>
                item.id === action.payload.id ? action.payload : item);

            return {
                ...state,
                allInstruments: allInstrumentsUpdated,
                instruments: instrumentsUpdated,
            }

        default:
            return state
    }
}
