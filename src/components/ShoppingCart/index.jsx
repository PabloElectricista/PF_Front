import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation  } from 'react-router-dom'
import {
  addToCart,
  updateAmount,
  addToCartPurchaseOrder,
  clearCart,
  removeAllFromCart,
  removeAllFromCartPurchaseOrder,
  removeOneFromCart,
  removeOneFromCartPurchaseOrder,
} from '../../redux/actions'
import axios from 'axios'
// import Alert from './../functions/Alert'

export default function ShoopingCart() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart)
  console.log(products);
  // const render = useSelector((state) => state.render)
  const location = useLocation()
  const isLogged = useSelector((state) => state.userLogged)
  const order = useSelector((state) => state.purchaseOrder)
  const allUsers = useSelector((state) => state.users)
  const userId = allUsers.filter((u) => u._id === isLogged[0]._id)
  console.log(userId);
  const navigate = useNavigate()

  let price = 0
  let productsAmount = 0

  for (let i = 0; i < products.length; i++) {
    price = price + products[i].price * products[i].stock
    productsAmount = productsAmount + products[i].stock
  }

  useEffect(() => {
    dispatch(updateAmount(productsAmount))
    console.log(productsAmount);
  }, [dispatch, productsAmount])

  function handleAdd(e) {
    e.preventDefault()
    dispatch(addToCart(e.target.value))
    dispatch(addToCartPurchaseOrder(e.target.value))
  }
  function handleRemoveOne(e) {
    e.preventDefault()
    dispatch(removeOneFromCartPurchaseOrder(e.target.value))
    dispatch(removeOneFromCart(e.target.value))
  }
  function handleRemoveAll(e) {
    e.preventDefault()
    dispatch(removeAllFromCartPurchaseOrder(e.target.value))
    dispatch(removeAllFromCart(e.target.value))
  }
  function handleClear() {
    dispatch(clearCart())
  }

  // const handleClick = async () => {
  //   if (
  //     !userId[0].address ||
  //     !userId[0].dni ||
  //     !userId[0].postal ||
  //     !userId[0].ciudad
  //   ) 
  //   {
  //     navigate('/profile')
  //     return alert('Completar sus datos personales', 'updateInfo')
  //   }
  //   const json = await axios.post(
  //     'https://localhos:4000',
  //     order
  //   )
  //   location.assign(json.data.init_point)
  // }

  useEffect(() => {}, [products])

  return products.length === 0 ? (
    <h1>El carrito esta vacio!</h1>
  ) : (
    <div>
      <h3>Productos :</h3>
      {products.map((e) => {
        return (
          <div>
            <h4>
              {e.title} - ${e.price}
            </h4>
            <div >
              <button
                value={e._id}
                onClick={(e) => handleRemoveOne(e)}
                
              >
                {' '}
                -{' '}
              </button>
              <h4 >{e.amount}</h4>
              <button
                value={e._id}
                onClick={(e) => {
                  handleAdd(e)
                }}
                
              >
                {' '}
                +{' '}
              </button>
            </div>
            <div >
              <button
                value={e._id}
                onClick={(e) => handleRemoveAll(e)}
                
              >
                Quitar
              </button>
              <h4>Total: ${e.price * e.amount}</h4>
            </div>
          </div>
        )
      })}
      <p className=''>Cantidad de productos : {productsAmount}</p>
      <p className=''>Precio Total: ${price}</p>
      <div className=''>
        <button onClick={handleClear} className=''>
          Vaciar carrito
        </button>
        {products.length > 0 ? (
          <button type='submit'>
            Realizar compra
          </button>
        ) : null}
      </div>
    </div>
  )
}
