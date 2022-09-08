import { getUserByEmail } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import NothingFound from '../NothingFound/NothingFound';
import ShopHistoryCard from './ShopHistoryCard';

export default function ShopHistory() {
  const { user, isAuthenticated } = useAuth0()
  const userDetail = useSelector(state => state.usersEmail)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserByEmail(user.email))
    }
  }, [dispatch, isAuthenticated, user])

  if (isAuthenticated && Object.values(userDetail).length) {
    if (userDetail.orders.length === 0) {
      return (<NothingFound />)
    }
    const mapOrders = userDetail.orders.map(order => <ShopHistoryCard
      key={order._id}
      user={order.user}
      products={order.products}
      status={order.status}
      userseller={order.userseller}
      payment={order.payment}
      createdAt={order.createdAt}
    />)
    return <>{mapOrders}</>
  }

  return (
    <Loading />
  )
}