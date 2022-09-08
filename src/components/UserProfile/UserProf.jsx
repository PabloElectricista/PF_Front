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


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserByEmail(user.email))
    }
  }, [isAuthenticated])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="FormDiv">
      <div className="FormLabel">
        <h1 className="">Welcome: {user.name}</h1>
        <img className="pic" src={user.picture} alt='profilePic' />
        <ul>
          {console.log("USERDETAIL",userDetail)}
          <p>email: {user.email}</p>
          <p>nickname: {user.nickname}</p>
          <p>phone: {userDetail.phone}</p>
          <p>address: {userDetail.address}</p>
          <p>country: {userDetail.country}</p>
          <p>ZIP code: {userDetail.postal}</p>
          <p>birthday: {userDetail.birthday}</p>
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
