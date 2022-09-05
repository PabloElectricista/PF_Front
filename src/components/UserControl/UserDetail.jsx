import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getUserById}  from '../../redux/actions'
import axios from 'axios'



export default function UserDetail(){
    const dispatch = useDispatch();
    const currentClient = useSelector((store)=> store.userDetail);
    const {id} = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(getUserById(id));
    },[dispatch])
       
    
    
    function handleEdit() {
        navigate(`/admin/usercontrol/userdetail/userEdit/${id}`);
    }
    
    console.log(currentClient)
        
    return(
           <div>

            <div>
                <h1>User Detail</h1>
            </div>
    

                <p>Name : {currentClient.username}</p>
                <p>Email : {currentClient.email}</p>
                <p>Blocked? : {currentClient.isBLoked? "true" : "false"}</p>
                <p>Admin? : {currentClient.isAdmin? "true" : "false"}</p>
                <p>Active? : {currentClient.isActive? "true" : "false"}</p>

                <button 
                className='submitButton'
                type='button'
                onClick={() => handleEdit()}>
                    Edit
                </button>
    
                
            </div> )}
