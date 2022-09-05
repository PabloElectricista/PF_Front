import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import UserEditData from './UserEditData'
import { Link } from 'react-router-dom'
import { getUserById } from '../../redux/actions'
import Loading from '../Loading/Loading'
import './UserProf.css'

const UserProf = () => {
    const { isAuthenticated, isLoading, user } = useAuth0()
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userDetail)
    const [component, setComponent] = useState('')

    console.log(userDetail)
    
    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getUserById(user.sub.slice(user.sub.indexOf("|") + 1)))
            console.log("despachado");
        }
    }, [isAuthenticated])

    
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className="FormDiv">
            <div className="FormLabel">
                <h1 className="FormTextArea">Welcome:</h1>
                <img className="pic"src = {user.picture} alt='profilePic'/>
                <h3>
                    {user.name}
                </h3>
            </div>
                <div className="FormTextArea">
                    <Link to='/profile/data/edit'  >
                        <button  className="SubmitBtn">Personal Info</button>
                    </Link>
{/* 
                    <Link to={<UserEditData/>}>
                    <button  className="SubmitBtn">Edit tour profile</button>
                    </Link> */}
                </div>
            {/* <div className="FormInput">
                <div >{component}</div>
            </div> */}
        </div>
    )
}

export default UserProf
