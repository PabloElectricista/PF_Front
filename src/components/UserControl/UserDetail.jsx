import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'



export default function UserDetail(){
    const [currentClient, setCurrentClient] = useState({})
    const {id} = useParams()

    
    useEffect(() => {
    const getId = async () => {
           const {data} = await axios.get("/users/"+ id )
           setCurrentClient(data)
        }
    getId()
})

console.log(currentClient)

        return(
            <div  >
               
    
            <h1> hola soy el detail</h1>
    
                
        </div> )}
