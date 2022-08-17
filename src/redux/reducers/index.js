const initialState = {
    
    instruments: [],
    allInstruments:[]
 
}

export default function rootReducer(state = initialState,action){
    switch(action.type){
        case 'GET_ALL_INSTRUMENTS':
            return {
                ...state,
                allInstruments: action.payload,
                instruments: [...action.payload]
            }
            default: 
            return state
    }
}