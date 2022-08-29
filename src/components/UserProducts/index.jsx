import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../redux/actions"
import UserProductCard from "../UserProductCard"

export default function UserProducts() {
  const { user } = useAuth0()
  const Products = useSelector(state => state.instruments)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllProducts())
  }, [])

  console.log(user)
  let mapProducts = Products.map(instrument => {
    return (
      <UserProductCard
        key={instrument._id}
        id={instrument._id}
        name={instrument.name}
        price={instrument.price}
        brand={instrument.brand}
        rating={Math.floor((Math.random() * 6))}
        image={instrument.image}
      />
    )
  })

  return (
    <>
      {mapProducts}
    </>
  )
}