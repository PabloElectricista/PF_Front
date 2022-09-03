import {Link} from 'react-router-dom';
import {useParams} from 'react'




export default function UsersCard({username, email}){
    
const {id} = useParams()

    return(
        <div className='cards-container' >
           


            
            <div> 
            
          <Link to={`/admin/userdetail/${id}`}>
                 <p>{username}</p>
           </Link> 
                <p>{email}</p>
                
             </div> 
            
            
        </div>
    )
}