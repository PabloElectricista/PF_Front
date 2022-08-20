import './Card.css'
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ProductCard({ id, name, price, rating, image, brand }) {

  return (
    // <div className='Card' >
    //   <Link to={"/detail/" + id}>
    //     <img src={image} alt={name} className='CardImg' />
    //   </Link>
    //   <Link to={"/detail/" + id}>
    //     <div className='InfoDiv'>
    //       <h2 >{name}</h2>
    //       <p className='Price'>${price}</p>
    //       <p>brand: {brand}</p>
    //       <p>rating: {rating}/5</p>
    //     </div>
    //   </Link>
    //   <div className='ButtonsDiv'>
    //     <BsCartFill className='CardIcon' />
    //     <BsStarFill className='CardIcon' />
    //   </div>
    // </div>
    <Card className="card" >
      <Link className='cardImage' to={"/detail/" + id}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{name}</Card.Title>
        </Link>
        <ListGroup variant="flush">
          <ListGroup.Item>Price: ${price}</ListGroup.Item>
          <ListGroup.Item>{brand}</ListGroup.Item>
          <ListGroup.Item>Rating: {rating}/5</ListGroup.Item>
        </ListGroup>
        <div className='containerButton'>
          <BsCartFill className='CardIcon buttonCard' />
          <BsStarFill className='CardIcon buttonCard' />
        </div>
      </Card.Body>
    </Card>
  )
}
