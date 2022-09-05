import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getUserById } from '../../redux/actions';

const UserData = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userDetail)
  const {id} = useParams();

  useEffect(() => {
    dispatch(getUserById(id));
},[dispatch, id])
   
  return (
    <div>
      <form >
        <legend >Personal Data</legend>
        <div >
          <div >
            <label htmlFor='username'>User:</label>
            <input
              type='text'
              name='username'
              value={allUsers?.username}
              readOnly
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email' value={allUsers?.email} readOnly />
          </div>
          <div >
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' value={allUsers?.name} readOnly />
          </div>
          <div >
            <label htmlFor='lastname'>Lastname:</label>
            <input
              type='text'
              name='lastname'
              value={allUsers?.lastname}
              readOnly
            />

          </div>
          <div >
            <label htmlFor='country'>Location:</label>
            <input
              type='text'
              name='country'
              value={allUsers?.country}
              readOnly
            />

          </div>
          <div >
            <label htmlFor='cuil'>Identification Number:</label>
            <input type='text' name='cuil' value={allUsers?.cuil} readOnly />

          </div>
          <div >
            <label htmlFor='phone'>Phone Number:</label>
            <input type='text' name='phone' value={allUsers?.phone} readOnly />
          </div>
          <div >
            <label htmlFor='address'>Address:</label>
            <input
              type='text'
              name='address'
              value={allUsers?.address}
              readOnly
            />
          </div>
          <div >
            <label htmlFor='postal'>ZIP Code:</label>
            <input
              type='number'
              name='postal'
              value={allUsers?.postal}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserData
