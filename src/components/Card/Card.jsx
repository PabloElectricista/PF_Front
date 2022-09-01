import './Card.css'
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ProductCard({ id, name, price, rating, image, brand }) {

  const addToFav = () => {
    let favs = JSON.parse(localStorage.getItem('favList'))
    if (favs) {
      if (favs.length <= 10 && favs.every(item => item.id !== id)) {
        favs.push({ id, name, price, rating, image, brand })
      }
    } else {
      favs = [{ id, name, price, rating, image, brand }]
    }
    localStorage.setItem('favList', JSON.stringify(favs))
  }
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cartList'))
    if (cart) {
      if (cart.length <= 10 && cart.every(item => item.id !== id)) {
        cart.push({ id, name, price, rating, image, brand })
      }
    } else {
      cart = [{ id, name, price, rating, image, brand }]
    }
    localStorage.setItem('totalPrice', JSON.stringify(price + JSON.parse(localStorage.getItem('totalPrice'))))
    localStorage.setItem('cartList', JSON.stringify(cart))
  }

  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt={name} />
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
        <BsCartFill className='CardIcon' onClick={addToCart}/>
      </div>
    </Card>
  )
}
