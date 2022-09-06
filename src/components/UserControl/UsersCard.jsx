import { Link } from 'react-router-dom';





export default function UsersCard({ username, email, _id }) {


    return (
        <div className="card UserProductCard UserProfileCard"  >
                <Link to={`/profile/admin/usercontrol/userdetail/${_id}`}>
            <ul>
                    <li className='UserCardLi'>Name : {username}</li>
                    <li className='UserCardLi'>Email : {email}</li>
            </ul>
                </Link>
        </div>
    )
}