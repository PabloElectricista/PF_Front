// React utilities
import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './Card.css';

export default function ShopCard({ id, name, price, image, color, deleteItem, updateQuantity, quantity }) {

  const plus = () => {
    localStorage.setItem('totalPrice', JSON.stringify(price + JSON.parse(localStorage.getItem('totalPrice'))))
    updateQuantity(id, quantity + 1)
  }
  const minus = () => {
    if (quantity > 1) {
      localStorage.setItem('totalPrice', JSON.stringify(JSON.parse(localStorage.getItem('totalPrice'))- price))
      updateQuantity(id, quantity - 1)
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
        <p><span  className='priceSC'>${price * quantity}</span> ({quantity} Items)</p>
      </div>
      <div className='containerButtonsSC'>
      <div className='selectQuantity'>
          <AddCircleIcon onClick={plus} />
          <p>{quantity}</p>
          <RemoveCircleIcon onClick={minus} />
        </div>
        <DeleteIcon onClick={() => deleteItem(id)} />
      </div>
    </div>
  )
}
