import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserByEmail } from '../../redux/actions'
import Loading from '../Loading/Loading'
import './UserProf.css'

const UserProf = () => {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.usersEmail)
  // const {email} = useParams()
  
  
  useEffect(() => {
    if (isAuthenticated) {
      // const email = user.email
      dispatch(getUserByEmail(user.email))
    }
  }, [isAuthenticated])
  // console.log(email, 'DETALLE')
  console.log(user, 'USER AUTH0')


  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="FormDiv">
      <div className="FormLabel">
        <h1 className="">Welcome: {user.name}</h1>
        <img className="pic" src={user.picture} alt='profilePic' />
        <ul>
          <p>{user.email}</p>
          <p>{user.nickname}</p>

        </ul>
      </div>
      <div className="FormTextArea">
        <Link to='/profile/data/edit'>
          <button className="SubmitBtn">Edit Info</button>
        </Link>
      </div>
    </div>
  )
}

export default UserProf
