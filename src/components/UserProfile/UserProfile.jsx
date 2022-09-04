import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import UserData from './UserData'
import UserEditData from './UserEditData'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'


const UserProfile = () => {
    // const { isAuthenticated, isLoading } = useAuth0()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userDetail)
    const [component, setComponent] = useState('')
    const { id } = useParams();

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id])

    console.log(user, 'soy el userProfile')
    
    // if (isLoading) {
    //     return <div>Cargando...</div>
    // }

    const handleInput = (e) => {
        e.preventDefault()
        const name = e.target.name
        if (name === 'userData') setComponent(<UserData />)
        if (name === 'userEditData') setComponent(<UserEditData />)
    }

    return (
        <div>
            {/* {isAuthenticated && ( */}
                <div>
                    <h1 >Welcome:</h1>
                    <h3>
                        {user.username}
                    </h3>
                </div>
            {/* )} */}
            <div >
                <div >
                    <Button
                        sx={{ fontWeight: 'bold' }}
                        name='userData'
                        onClick={handleInput}
                    >
                        Personal Info
                    </Button>

                    <Button
                        sx={{ fontWeight: 'bold' }}
                        name='userEditData'
                        onClick={handleInput}
                    >
                        Edit personal info
                    </Button>

                </div>
                <div >{component}</div>
            </div>
        </div>
    )
}

export default UserProfile
