import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  addToCart,
} from '../../redux/actions'
import ProductCard from '../Card'
import StripeComponent from '../StripeComponent/StripeComponent'
import ShopCard from './ShopCard'

export default function ShoopingCart(id) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart)
  const unInstrument = useSelector((state) => state.retrievedInstrument)

  const { id } = useParams();

    useEffect(() => {
        if (!unInstrument || (id !== unInstrument._id && !unInstrument.error)) {
            dispatch(getProductById(id));
        }
    }, [dispatch, unInstrument])

  console.log(products)


  let element = []
  for (let i = 0; i < products.length; i++) {
    element.push(products[i]);
  }


  // console.log(element, 'PRODUCTOS DE SHOPPING CART')

  useEffect(() => {
    dispatch(addToCart(id))
  }, [dispatch, id])

  // let filtered = []
  // console.log(filtered)
  // if(element === allInstruments){
  //  filtered.push(element)
  // } return filtered


  function renderProducts() {
    return (
      <div>
        {element?.length ? (
          element?.map((p) => (
            <StripeComponent
            key={p._id}
            id={p.products}
            name={p.name}
            price={p.price}
            brand={p.brand}
            rating={1}
            image={p.image}
            />
          ))
        ) : (
          <h2>Tu carrito está vacío</h2>
        )
        }
      </div>
    )
  }

  return (
    <div>
      {renderProducts()}
    </div>
  )

}
