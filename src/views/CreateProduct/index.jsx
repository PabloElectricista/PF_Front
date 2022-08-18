import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
//import {createProduct, getAllCategories} from '../actions'
import {useDispatch,useSelector} from 'react-redux'
import './form.css'



export default function CreateProduct(){
    const allInstruments = useSelector(store=> store.instruments)
    const allCategories = useSelector(store=> store.categories)
    const dispatch = useDispatch()
    const [error,setError] = useState({})
    const [inputForm,setInputForm] = useState({
        name: '',
        image: '',
        price: 0,
        categorie: [],
        color: [],
        descript: '',
        stock: 0,
        brand: ''
    })
    
   
    // useEffect(()=>{
    //     dispatch(getAllCategories())
    // },[dispatch])

    function validate(input){
        let error = {}
        if(input.name.length >= 0 && !input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
            error.name = 'Only letters and no spaces are allowed at the end!'
        }else error.name = null

        if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
            error.image = 'The image has to be a URL'
        }else error.image = null

        if(input.descript && input.descript.length > 1000){
            error.descript = 'Must contain a maximum of 1000 characters'
        }else error.type = null
        
        if(input.brand && input.brand.length < 30){
          error.brand = 'Must contain a maximum of 30 characters'
        }else error.brand = null
        
        if(input.price > 10000 || input.price < 0){
          error.price = 'It has to be between 0 and 10000 dollars'
        }else error.price = null

        if(input.stock > 30 || input.stock < 0){
          error.stock = 'It has to be between 0 and 30'
        }else error.stock = null
        
        if(input.categorie && input.categorie.length === 0){
            error.categorie = 'You have to choose at least one category'
        }else error.categorie = null
        return error
    }

    function handleChange(e){
        setInputForm({
            ...inputForm,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...inputForm,
            [e.target.name] : e.target.value
        }))
    } 
    function handleSelect(e){
        setInputForm({
            ...inputForm,
            diets : [...inputForm.categorie,e.target.value]
        })
        setError(validate({
            ...inputForm,
            diets : [...inputForm.categorie,e.target.value]
        }))
    } 
    function deleteSelect(e,id){
        e.preventDefault();
        setInputForm({
            ...inputForm,
            diets : inputForm.categorie.filter(d=> d !== id)
        })
        setError(validate({
            ...inputForm,
            diets : inputForm.categorie.filter(d=> d !== id)
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(error.name === null && error.image === null && 
        error.descript === null && error.brand === null && 
        error.price === null && error.stock === null &&
        error.categorie === null){
            dispatch(createProduct(inputForm))
            alert('Successfully created')
            setInputForm({
              name: '',
              image: '',
              price: 0,
              categorie: [],
              color: [],
              descript: '',
              stock: 0,
              brand: ''
            })
        }else{
            alert('Fixes flagged errors and fills in required spaces')
        }
    }
    
 
 
    return(
        <div id='container-create'>

            <div id='cont-btn-home'>
                <Link to='/home'>
                    <button class="btn btn-secondary" >Back</button>
                </Link>
            </div>

            <div id='cont-title-form'>
                <h1>Post your sale!</h1>
            </div>

            <form onSubmit={(e)=>{handleSubmit(e)}}>

                <div id='form-cont-left'>
                    <div  id='input-name' className='form-inputs'>
                        <label>* Name:</label>
                        <input 
                            type='text' 
                            value={inputForm.name} 
                            name='name' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.name&& (
                            <p>{error.name}</p>
                        )}
                    </div>

                    <div id='input-name' className='form-inputs'>
                        <label>image:</label>
                        <input 
                            type='text' 
                            value={inputForm.image} 
                            name='image' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.image&& (
                            <p>{error.image}</p>
                        )}
                    </div>

                    <div  id='input-name' className='form-inputs'>
                        <label>Price:</label>
                        <input 
                            type='text' 
                            value={inputForm.type} 
                            name='price' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.price&& (
                            <p>{error.price}</p>
                        )}
                    </div>
                    <div id='select-diets'  className='form-inputs' >
                        <label>*Categorie:</label>
                        <select onChange={(e)=>{handleSelect(e)}}>
                            <option> -Select at least one- </option>
                            {
                                allCategories&&allCategories.map(d=>{
                                    return(
                                        <option value={d.id}>{d.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div id='cont-diets'>
                        <ul>
                        {allCategories&&allCategories.map((d)=>{
                            if(inputForm && inputForm.categorie.includes(d.id) ){
                                return(
                                        
                                        <li>{d.name} <button onClick={(e)=>{deleteSelect(e,d.id)}}>X</button></li>
                                )
                            }
                            return
                        })}
                        </ul>
                    </div>

                    <div id='select-diets'  className='form-inputs'>
                            <label>Color:</label>
                            <input 
                                type='color' 
                                value={inputForm.color} 
                                name='color' 
                                onChange={(e)=>{handleChange(e)}}/>
                        
                    </div>

                    <div  id='input-dsc' className='form-inputs'>
                            <label>Description:</label>
                            <input 
                                type='text' 
                                value={inputForm.descript} 
                                name='descript' 
                                onChange={(e)=>{handleChange(e)}}/>
                            {error.descript&& (
                              <p>{error.descript}</p>
                            )}
                    </div>

                    <div  id='input-stk' className='form-inputs'>
                        <label>*stock:</label>
                        <input 
                            type='number' 
                            value={inputForm.stock} 
                            name='stock' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.stock&& (
                            <p>{error.stock}</p>
                        )}
                    </div>

                    <div  id='input-brn' className='form-inputs'>
                            <label >Brand:</label>
                            <input   
                                type='text' 
                                value={inputForm.brand} 
                                name='brand' 
                                onChange={(e)=>{handleChange(e)}}/>
                            {error.brand&& (
                                <p>{error.brand}</p>
                            )}
                    </div>

                    <div id='cont-btn-submit'>
                        <button class="btn btn-secondary">Sell Product</button>
                    </div>

                </div>
                
            </form>
        </div>
    )
}