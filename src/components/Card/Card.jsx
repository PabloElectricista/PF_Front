// React utilities
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
// Styles
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Skeleton from '@mui/material/Skeleton';
import './Card.css'
import {addToFav, addToCart} from './FavAndCart';

export default function ProductCard({ id, name, price, rating, image, brand }) {

  const [loading, setLoading] = useState(true);

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
        <BsStarFill className='CardIcon' onClick={() => addToFav(id, name, price, rating, image, brand)} />
        <BsCartFill className='CardIcon' onClick={() => addToCart(id, name, price, rating, image, brand)}/>
      </div>
    </Card>
  )
}
