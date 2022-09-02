import { getAllProducts, getMyOrders } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from '@auth0/auth0-react';
import UserShopHistoryCard from './ShopHistoryCard';
import { useEffect } from 'react';

export default function ShopHistory() {
  const { user, isAuthenticated } = useAuth0()
  const myOrders = useSelector(state => state.myOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts());
    if (isAuthenticated) {
      dispatch(getMyOrders(user.sub.slice(user.sub.indexOf("|") + 1)))
    }
  }, [dispatch, isAuthenticated, user])

  if (isAuthenticated) {
    // const mapOrders = myOrders.map(order => <>order</>)
    console.log(myOrders);
    if (myOrders.length === 0){
      return (<h1>you have no orders</h1>)
    }
      return (
        // { mapOrders }
        <></>
      )
  }
  return (
    <h1>you have no orders</h1>
  )
}