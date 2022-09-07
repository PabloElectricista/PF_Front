import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../redux/actions"
import NothingFound from "../NothingFound/NothingFound"
import UserProductCard from "./UserProductCard"

export default function UserProducts() {
  const { user, isAuthenticated } = useAuth0()
  const myUser = useSelector(state => state.usersEmail)
  const allProducts = useSelector(state => state.allProducts)
  console.log(myUser)
  const MyProducs = myUser.products
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  // if (isAuthenticated) {

  //   console.log(products.map(e => e.user));
  //   const myProducts = products.filter(product => product.user._id === user.sub.slice(user.sub.indexOf("|") + 1))
  //   if (myProducts.length === 0) {
  //     return (
  //       <>
  //       <h2>My products</h2>
  //       <NothingFound />
  //       </>
  //     )
  //   }
  //   let mapProducts = myProducts.map(instrument => {
  //     return (
  //       <UserProductCard
  //         key={instrument._id}
  //         id={instrument._id}
  //         name={instrument.name}
  //         price={instrument.price}
  //         brand={instrument.brand}
  //         rating={Math.floor((Math.random() * 6))}
  //         image={instrument.image}
  //       />
  //     )
  //   })
  //   return (
  //     <>
  //       {mapProducts}
  //     </>
  //   )
  // }

  return (
    <h2>You have no products published</h2>
  )
}
