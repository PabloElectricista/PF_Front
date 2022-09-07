import './Card.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


// , purchaseOrder,updateAmount
export default function ShopCard({ id, name, price, rating, image, brand, quantity, deleteItem }) {
  const [qua, setQua] = useState(quantity)

  const plus = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'))
    let found = cartList.find(e => e.id === id)
    found.quantity += 1
    localStorage.setItem('cartList', JSON.stringify(cartList))
    setQua(qua + 1)
  }
  const minus = () => {
    if (qua > 1) {
      const cartList = JSON.parse(localStorage.getItem('cartList'))
      let found = cartList.find(e => e.id === id)
      found.quantity -= 1
      localStorage.setItem('cartList', JSON.stringify(cartList))
      setQua(qua - 1)
    }
  }

  return (
    <Card className="card shop" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt={name} />
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{name}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardBrand'>{brand}</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>Unitary ${price.toFixed(2)}</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>Total ${(price * qua).toFixed(2)}</ListGroup.Item>
          <ListGroup.Item className='cardRating'>
            <p className={rating >= 1 ? 'cardStarActive' : 'cardStar'}>&#9733;</p>
            <p className={rating >= 2 ? 'cardStarActive' : 'cardStar'}>&#9733;</p>
            <p className={rating >= 3 ? 'cardStarActive' : 'cardStar'}>&#9733;</p>
            <p className={rating >= 4 ? 'cardStarActive' : 'cardStar'}>&#9733;</p>
            <p className={rating === 5 ? 'cardStarActive' : 'cardStar'}>&#9733;</p>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <div className='containerButton'>
        <AiFillDelete className='CardIcon' onClick={() => deleteItem(id)} />
        <AiFillPlusCircle className='CardIcon' onClick={plus} />
        <h3>{qua}</h3>
        <AiFillMinusCircle className='CardIcon' onClick={minus} />
      </div>
    </Card>
  )
}
