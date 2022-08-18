import { useState } from 'react'
import {useDispatch} from 'react-redux'
//import {getInstrumentsByName} from '../actions'
import i from '../img/search_FILL0.png'
import 'bootstrap/dist/css/bootstrap.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input,setInput] = useState('')

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getInstrumentsByName(input))
        setInput('')
    }
    console.log(input)
    return(
        <div class="container-fluid" >
            <form class="input-group" onSubmit={(e)=>{handleSubmit(e)}} >
                <button class="input-group-text" id="basic-addon1" type='submit'><img src={i}/></button>
                <input class="form-control me-2" value={input} onChange={(e)=>{handleChange(e)}} placeholder='Type your search...' aria-describedby="basic-addon1"/>
            </form>
        </div>
    )
}