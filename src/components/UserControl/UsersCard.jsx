import {Link} from 'react-router-dom';
//import {useParams} from 'react'




export default function UsersCard({username, email, _id}){
    
//const {id} = useParams()

    return(
        <div className='cards-container' >

    
            <div> 
            
          <Link to={`/admin/usercontrol/userdetail/${_id}`}>
                 <p>{username}</p>
           </Link> 
                <p>{email}</p>
                
             </div> 
            
            
        </div>
    )
}