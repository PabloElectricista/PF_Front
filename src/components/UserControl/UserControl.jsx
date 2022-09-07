import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import UsersCard from './UsersCard';


export default function UserControl() {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users);

    const currentUser = {
        "_id": {
            "$oid": "6313a6f4bee5ce14957dd99c"
        },
        "username": "mariana",
        "email": "test@email.com",
        "password": "123456",
        "isAdmin": true,
        "createdAt": {
            "$date": {
                "$numberLong": "1660838853317"
            }
        },
        "updatedAt": {
            "$date": {
                "$numberLong": "1661915123100"
            }
        },
        "__v": {
            "$numberInt": "4"
        },
        "favorites": [],
        "isActive": true,
        "isBloked": false,
        "orders": [{
            "$oid": "630c2abce6e3ea838bbb7f5a"
        }, {
            "$oid": "630ecf6d7b40b5acb8388983"
        }, {
            "$oid": "630ecff27b40b5acb8388990"
        }],
        "posts": [],
        "purchases": [],
        "score": {
            "reviews": {
                "$numberInt": "0"
            },
            "stars": {
                "$numberInt": "0"
            }
        }
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <>
            <div>
                <h1 className='UserControlTitle'>Users List</h1>
            </div>
            <div>
                {users.map(u => {
                    return (<>
                        <UsersCard username={u && u.username} email={u && u.email} _id={u && u._id} />
                    </>)
                })}
            </div>
        </>
    )

}

