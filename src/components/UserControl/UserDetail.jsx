import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'

import './User.css'
import { Loading } from 'react-admin'

export default function UserDetail() {
    const dispatch = useDispatch();
    const allUsers = useSelector((store) => store.users);
    const { email } = useParams();
    const [thisUser, setThisUser] = useState({})
    // const thisUser = allUsers.find(e => e.email === email)
    useEffect(() => {
        if(allUsers.length === 0){
            dispatch(getAllUsers())
        }
        setThisUser(allUsers.length ? allUsers.find(e => e.email === email) : {})
    }, [allUsers])

    if(allUsers.length === 0){
        return <Loading/>
    }
    return (
        <div className='UserEditContainer'>
            <div className="UserEditMargin">
                <h1>User Detail</h1>
            </div>
            <p className="UserEditMargin">Name : {thisUser.nickname}</p>
            <p className="UserEditMargin">Email : {thisUser.email}</p>
            <p className="UserEditMargin">Blocked : {thisUser.isBloked ? "true" : "false"}</p>
            <p className="UserEditMargin">Admin : {thisUser.isAdmin ? "true" : "false"}</p>
            <p className="UserEditMargin">Active : {thisUser.isActive ? "true" : "false"}</p>
            <Link to={`/profile/admin/usercontrol/userdetail/userEdit/${email}`} >Edit</Link>
        </div>)
}
