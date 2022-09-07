import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByEmail } from '../../redux/actions'
import axios from 'axios'
import './User.css'



export default function UserDetail() {
    const dispatch = useDispatch();
    const [currentClient] = useSelector((store) => store.usersEmail);
    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserByEmail(email));
    }, [dispatch])



    function handleEdit() {
        navigate(`/profile/admin/usercontrol/userdetail/userEdit/${email}`);
    }

    console.log(currentClient)

    return (
        <div className='UserEditContainer'>
            <div className="UserEditMargin">
                <h1>User Detail</h1>
            </div>
            <p className="UserEditMargin">Name : {currentClient.username}</p>
            <p className="UserEditMargin">Email : {currentClient.email}</p>
            <p className="UserEditMargin">Blocked? : {currentClient.isBLoked ? "true" : "false"}</p>
            <p className="UserEditMargin">Admin? : {currentClient.isAdmin ? "true" : "false"}</p>
            <p className="UserEditMargin">Active? : {currentClient.isActive ? "true" : "false"}</p>
            <button 
                className='submitButton BtnCenter'
                type='button'
                onClick={() => handleEdit()}>
                Edit
            </button>
        </div>)
}
