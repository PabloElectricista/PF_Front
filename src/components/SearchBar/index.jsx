import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filteredIntruments } from '../../redux/actions';
import iconSearch from '../img/search_FILL0.png';
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBar.css';


export default function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({ name: '' })

    function handleInputChange(e) {
        e.preventDefault();
        setInput({ [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(filteredIntruments(input));
        navigate('/home');
    }

    return (
        <div className='containerSearchBar d-flex'>
            <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }} >
                <button className="input-group-text" id="inputGroup-sizing-default" type='submit'><img src={iconSearch} alt="search Icon" width="25" height="25" /></button>
                <input className="form-control me-2" value={input.name} name={"name"} onChange={(e) => { handleInputChange(e) }} placeholder='Type your search...' />
            </form>
        </div>
    )
}