// React utilities
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
// Styles
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Skeleton from '@mui/material/Skeleton';
import './Card.css'

export default function ProductCard({ id, name, price, rating, image, brand, handleAdded, handleNotAdded }) {

  const [loading, setLoading] = useState(true);
  
  const addToFav = () => {
    let favs = JSON.parse(localStorage.getItem('favList'))
    if (favs) {
      if (favs.length >= 30) {
        handleNotAdded()
        return
      }
      if (!favs.some(item => item.id === id)) {
        favs.push({ id, name, price, rating, image, brand })
      }
    } else {
      favs = [{ id, name, price, rating, image, brand }]
    }
    localStorage.setItem('favList', JSON.stringify(favs))
    handleAdded()
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cartList'))
    if (cart) {
      if (cart.length >= 30) {
        handleNotAdded()
        return
      }
      if (!cart.some(item => item.id === id)) {
        cart.push({ id, name, price, rating, image, brand })
      }
    } else {
      cart = [{ id, name, price, rating, image, brand }]
    }
    localStorage.setItem('totalPrice', JSON.stringify(price + JSON.parse(localStorage.getItem('totalPrice'))))
    localStorage.setItem('cartList', JSON.stringify(cart))
    handleAdded()
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [])


  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        {
          !loading ?
            <img className='cardImage' src={image} alt={name} />
            : <Skeleton
              variant='rectangular'
              animation="wave"
            />
        }
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{name}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardBrand'>{brand}</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>${price}</ListGroup.Item>
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
        <BsStarFill className='CardIcon' onClick={addToFav} />
        <BsCartFill className='CardIcon' onClick={addToCart} />
      </div>
    </Card>
  )
}
