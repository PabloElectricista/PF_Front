
import './Card.css'
// React utilities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getPrice } from '../Card/favAndCart';

export default function ShopCard({ id, name, price, image, color, quantity, deleteItem, updateQuantity }) {
  const [qua, setQua] = useState(quantity);

  const plus = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'))
    let found = cartList.find(e => e.id === id)
    found.quantity += 1
    localStorage.setItem('cartList', JSON.stringify(cartList))
    setQua(qua + 1)
    updateQuantity()
  }
  const minus = () => {
    if (qua > 1) {
      const cartList = JSON.parse(localStorage.getItem('cartList'))
      let found = cartList.find(e => e.id === id)
      found.quantity -= 1
      localStorage.setItem('cartList', JSON.stringify(cartList))
      setQua(qua - 1)
      updateQuantity()
    }
  }

  return (
    <div className="cardShoppingCart">
      <Link className='cardContainerImageSC' to={"/detail/" + id}>
        <img className='cardImageSC' src={image} alt={name} />
      </Link>
      <div className='containerBodySC'>
        <h5>{name}</h5>
        <p><span>Color: </span>{color[0].toUpperCase() + color.substring(1)}</p>
        <p><span  className='priceSC'>${getPrice()}</span> ({qua} Items)</p>
      </div>
      <div className='containerButtonsSC'>
        <div className='selectQuantity'>
            <AddCircleIcon onClick={plus} />
            <p>{qua}</p>
            <RemoveCircleIcon onClick={minus} />
          </div>
          <DeleteIcon onClick={() => deleteItem(id)} />
        </div>
    </div>
  )
}
