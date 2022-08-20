const {

    GET_ALL_PRODUCTS, GET_INSTRUMENT_BY_ID,
    UPDATE_PRODUCT

} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: payload,
                instruments: payload,
            }

        //-----------------------
        case GET_INSTRUMENT_BY_ID:
            if (!payload) { return state }
            return { ...state, instruments: [payload] }


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
