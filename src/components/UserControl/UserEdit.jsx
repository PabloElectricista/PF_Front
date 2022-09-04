import React, { useState } from "react";
import { Link, useParams} from "react-router-dom";
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getUserById, putUser}  from '../../redux/actions'


    

export default function UserEdit() {

  const dispatch = useDispatch();
  const currentClient = useSelector((store)=> store.userDetail);
  const {id} = useParams();
    
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

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(putUser(id, input));
    alert("Usuario editado");
   
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  

return (
    <div>
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
            
            <div>
            <p>Username</p>
            <input
              type='text'
              value={input.username}
              name='username'
              onChange={(e) => handleChange(e)}
            />
            </div>


          <br />
          <div >
            <p>Email </p>
            <input
              type='text'
              value={input.email}
              name='email'
              onChange={(e) => handleChange(e)}
            />
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
            <button type='submit'>Modify</button>

            <button>
              <Link to={`/admin/usercontrol/userdetail/${currentClient._id}`}>Cancel</Link>
            </button>

          </div>
        </form>
      </div>
      
    </div>
  );
}