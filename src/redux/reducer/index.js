const {
    GET_ALL_PRODUCTS, GET_INSTRUMENT_BY_ID
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
        default:
            return state
    }
}