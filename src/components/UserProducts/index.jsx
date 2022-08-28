import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from "react-redux"

export default function UserProducts() {
  const dispatch = useDispatch()
  const { user } = useAuth0()

  // useEffect(()=>{
  //   dispatch(getProductsByOwner(user.email))
  // })
  console.log(user)

  return (
    <>
    </>
  )
}