import {Link} from 'react-router-dom';





export default function UsersCard({username, email, _id}){
    

    return(
        <div className="card"  >

    
            <div> 


            
          <Link to={`/admin/usercontrol/userdetail/${_id}`}>
                 <p>Name : {username}</p>
           </Link> 
                <p>Email : {email}</p>

                                
             </div> 
            
            
        </div>
    )
}