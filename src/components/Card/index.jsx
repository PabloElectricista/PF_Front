import './Card.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, purchaseOrder,updateAmount } from '../../redux/actions/index'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
import { useAuth0 } from '@auth0/auth0-react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cart from '../../components/ShoppingCart/cart';



export default function ProductCard({ id, name, price, rating, image, brand }) {

  const dispatch = useDispatch()
  const { userLogged } = useSelector((state) => state)
  console.log('usuarioLogueado:', userLogged)
  const productsAmount = useSelector((state) => state.cartAmount)
  const products = useSelector((state) => state.cart)
  const filteredInstruments = products.filter((e) => e.name === name)

  const { loginWithRedirect } = useAuth0()


  const isBuy = changeBuy(id)


  function changeBuy(id) {
    if (userLogged.length > 0 && userLogged[0].buyInstrument.length > 0) {
      let result = userLogged[0].buyInstrument.indexOf(id)
      if (result === -1) {
        return false
      } else {
        return true
      }
    }
    if (userLogged.length === 0) {
      return false
    }
  }
function handleAddToCart(e) {
    e.preventDefault()
    if (userLogged.length === 0) return loginWithRedirect()
    if (filteredInstruments.length) return alert('ya esta agregado')
    console.log('filteredInstruments2', filteredInstruments)
    dispatch(addToCart(id))
    dispatch(updateAmount(productsAmount + 1))
    alert('Instrumento agregado al carrito!', 'cart')
    dispatch(
        purchaseOrder({
          email: userLogged[0].email,
          name: userLogged[0].name,
          name: products[products.length - 1].name,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].stock,
        })
      )
    }

    return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt={name}/>
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
        <BsCartFill className='CardIcon' onClick={(e) => handleAddToCart(e)} >
          <Cart />
        </BsCartFill>
        <BsStarFill className='CardIcon' />
        <BsCartFill className='CardIcon' />
      </div>
    </Card>
  )
}
