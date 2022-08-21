const {
    GET_ALL_PRODUCTS,
    UPDATE_PRODUCT
} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
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

        case 'CREATE_PRODUCT':
                return{
                    ...state,
                    allInstruments: [action.payload,...state.allInstruments]
                }

        default:
            return state
    }
}
