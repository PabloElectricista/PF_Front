import React, { useState } from "react";
import { Link, useParams} from "react-router-dom";
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getUserById, putUser}  from '../../redux/actions'


    

export default function UserEdit() {

  const dispatch = useDispatch();
  const currentClient = useSelector((store)=> store.userDetail);
  const {id} = useParams();
  const [error, setError] = useState({})



    
useEffect(() => {
        dispatch(getUserById(id));
    },[dispatch])


  const [input, setInput] = useState({
    username: currentClient.username,
    email: currentClient.email,
    isAdmin: currentClient.isAdmin,
    isActive: currentClient.isActive,
    isBloked: currentClient.isBloked,
  });

  function validate(input) {

    let error = {}
    if (input.username.length >= 0 && !input.username.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)) {
        error.username = 'Only letters and no spaces are allowed at the end!'
    } else error.username = null
    
    if (!input.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        error.email = 'You have to write an email'
    } else error.email = null
    return error
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(error.username === null && error.email === null){
    dispatch(putUser(id, input));
    alert("The user was updated succesfully");
   
  } else{
    alert('Fixes flagged errors and fills in required spaces')

  }}

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
  }));
  }

  

return (
    <div>
        <div>
          <h1>SUPER ADMIN USERS EDITION V-3.0</h1>
        </div>
        <br/>

        <div>
          <h3>User edit</h3>
        </div>
        <br/>
        <br/>

        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
            
            <div>
            <p>Username</p>
            <input
              type='text'
              value={input.username}
              name='username'
              onChange={(e) => handleChange(e)}
            /> {error.username&& (
              <p>{error.username}</p>)}
            </div>


          <br />
          <div >
            <p>Email </p>
            <input
              type='text'
              value={input.email}
              name='email'
              onChange={(e) => handleChange(e)}
            /> {error.email&& (
              <p>{error.email}</p>)}
          </div>
          <br />

        <div >
            <p>Is Admin? </p>
            <select
              value={input.isAdmin}
              name='isAdmin'
              onChange={(e) => handleChange(e)}
            >
              <option>select</option>
              <option value= {true}>Yes</option>
              <option value= {false} >No</option>
            </select>
        </div>

        <div >
            <p>Is Active? </p>
            <select
              value={input.isActive}
              name='isActive'
              onChange={(e) => handleChange(e)}
            >
              <option>select</option>
              <option value= {true}>Yes</option>
              <option value= {false} >No</option>
            </select>
        </div>


          <br />
        <div>
            <label>Is Banned? </label>
            <select
              value={input.isBloked}
              name='isBloked'
              onChange={(e) => handleChange(e)}
            >
              <option>select</option>
              <option value= {true}>Yes</option>
              <option value= {false} >No</option>
            </select>
        </div>
          <div>
            <button className="btn btn-outline-success me-2" type='submit'>
              <Link to={`/profile/admin/usercontrol/userdetail/${currentClient._id}`}>Modify</Link>
              </button>
            <button className="btn btn-outline-success me-2">
              <Link to={`/profile/admin/usercontrol/userdetail/${currentClient._id}`}>Cancel</Link>
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}