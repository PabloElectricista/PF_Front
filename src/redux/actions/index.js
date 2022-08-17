import axios from 'axios'

export function getAllInstruments(){
    return async function(dispatch){
        const resu =  await axios('/instruments')
        dispatch({
            type: "GET_ALL_INSTRUMENTS",
            payload: resu.data
        })
    }
}