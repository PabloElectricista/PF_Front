import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useParams  } from 'react-router-dom'
import {
  addToCart,
  purchaseOrder,
  getProductById,
} from '../../redux/actions'
import ProductCard from '../Card'

export default function ShoopingCart() {
  const dispatch = useDispatch()
  const allInstruments = useSelector((state) => state.allInstruments)
  const products = useSelector((state) => state.cart)
  // console.log(allInstruments)
  console.log(products)

  let price = 0
  let productsAmount = 0

  useEffect(() => {
    dispatch(addToCart())
  }, [dispatch])

  let mapInstruments = products.map(instrument => <ProductCard
    key={instrument._id}
    id={instrument._id}
    name={instrument.name}
    price={instrument.price}
    brand={instrument.brand}
    rating={1}
    image={instrument.image}
    />)
  

    for (let i = 0; i < mapInstruments.length; i++) {
      price = price + mapInstruments[i].price * mapInstruments[i].stock
      productsAmount = productsAmount + mapInstruments[i].stock
    }


  // function handleAdd(e) {
  //   e.preventDefault()
  //   dispatch(addToCart(e.target.value))
  //   dispatch(addToCartPurchaseOrder(e.target.value))
  // }
  // function handleRemoveOne(e) {
  //   e.preventDefault()
  //   dispatch(removeOneFromCartPurchaseOrder(e.target.value))
  //   dispatch(removeOneFromCart(e.target.value))
  // }
  // function handleRemoveAll(e) {
  //   e.preventDefault()
  //   dispatch(removeAllFromCartPurchaseOrder(e.target.value))
  //   dispatch(removeAllFromCart(e.target.value))
  // }
  // function handleClear() {
  //   dispatch(clearCart())
  // }

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

  // useEffect(() => {}, [order])

  return mapInstruments.length === 0 ? (
    <h1>El carrito esta vacío!</h1>
  ) : (
    <div>
      <h3>Productos :</h3>
      {mapInstruments.map((e) => {
        return ( 
          <div>
            <ProductCard/>
             <h4>
              {e.name} - ${e.price}
            </h4>
            <div >
              <button
                value={e._id}
                
              >
                {' '}
                -{' '}
              </button>
              <h4 >{e.stock}</h4>
              <button
                value={e._id}
                
              >
                {' '}
                +{' '}
              </button>
            </div>
            <div >
              <button
                value={e._id}
                
              >
                Quitar
              </button>
              <h4>Total: ${e.price * e.stock}</h4>
            </div>
          </div>
        )
      })}
      <p className=''>Cantidad de productos : </p>
      <p className=''>Precio Total: $</p>
      <div className=''>
        <button  className=''>
          Vaciar carrito
        </button>
        {mapInstruments.length > 0 ? (
          <button type='submit'>
            Realizar compra
          </button>
        ) : null}
      </div>
    </div>
  )
}
