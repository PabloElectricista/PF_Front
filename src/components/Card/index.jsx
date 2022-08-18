import './Card.css'
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';

export default function Card({ id, name, price, rating, image, brand }) {

  return (
    <div className='Card' >
      <Link to={"/detail/" + id}>
        <img src={image} alt={name} className='CardImg' />
      </Link>
      <Link to={"/detail/" + id}>
        <div className='InfoDiv'>
          <h2 >{name}</h2>
          <p className='Price'>${price}</p>
          <p>brand: {brand}</p>
          <p>rating: {rating}/5</p>
        </div>
      </Link>
      <div className='ButtonsDiv'>
        <BsCartFill className='CardIcon' />
        <BsStarFill className='CardIcon' />
      </div>
    </div>
  )
}
