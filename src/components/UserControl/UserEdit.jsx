import React, { useState } from "react";
import { Link, useParams} from "react-router-dom";
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getUserById, putUser}  from '../../redux/actions'
import './User.css'

    

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
    <div className="UserEditContainer">
        <div className="UserEditMargin">
          <h1>SUPER ADMIN USERS EDITION V-3.0</h1>
        </div>
        <div className="UserEditMargin">
          <h3>User edit</h3>
        </div>
        <div className="UserEditMargin">
            <form onSubmit={(e) => handleSubmit(e)}>
            <div>
            <label>Username:</label>
            <input
              type='text'
              value={input.username}
              name='username'
              onChange={(e) => handleChange(e)}
              /> {error.username&& (
                <p>{error.username}</p>)}
            </div>
          <div className="UserEditMargin">
                <label>Email:</label>
            <input
              type='text'
              value={input.email}
              name='email'
              onChange={(e) => handleChange(e)}
              /> {error.email&& (
                <p>{error.email}</p>)}
          </div>
        <div className="UserEditMargin">
                <label>Admin:</label>
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
        <div className="UserEditMargin">
              <label>Active:</label>
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
        <div className="UserEditMargin">
            <label>Banned:</label>
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
          <div className="UserEditMargin">
            <button className="btn btn-outline-success me-2" type='submit'>
              <Link to={`/profile/admin/usercontrol/userdetail/${currentClient.email}`}>Modify</Link>
              </button>
            <button className="btn btn-outline-success me-2">
              <Link to={`/profile/admin/usercontrol/userdetail/${currentClient.email}`}>Cancel</Link>
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}