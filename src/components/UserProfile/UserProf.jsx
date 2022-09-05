import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import UserData from './UserData'
import UserEditData from './UserEditData'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../../redux/actions'
import Loading from '../Loading/Loading'


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
        <div>
            <div>
                <h1 >Welcome:</h1>
                <h2 >{}</h2>
                <h3>
                    {user.nickname}
                </h3>
            </div>
            <div >
                <div >
                    <Link to={<UserData/>}  >
                        Personal Info
                    </Link>
                    <Link to={<UserEditData/>}>
                        Edit personal info
                    </Link>

                </div>
                <div >{component}</div>
            </div>
        </div>
    )
}

export default UserProf
