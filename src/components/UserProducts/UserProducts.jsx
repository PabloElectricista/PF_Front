import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../redux/actions"
import UserProductCard from "./UserProductCard"

export default function UserProducts() {
  const { user, isAuthenticated } = useAuth0()
  const products = useSelector(state => state.allInstruments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  if (isAuthenticated) {
    const myProducts = products.filter(product => product.user ? product.user._id : null === user.sub.slice(user.sub.indexOf("|") + 1))
    console.log(user.sub.slice(user.sub.indexOf("|") + 1))
    console.log(products.map(e => {
      return e.user
    }))
    if (myProducts.length === 0) {
      return (
        <h2>You have no products published</h2>
      )
    }
    let mapProducts = myProducts.map(instrument => {
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

  return (
    <h2>You have no products published</h2>
  )
}
