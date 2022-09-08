import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ShopHistoryCard(user, products, status, userseller, payment, createdAt) {
  const mapProducts = products.map((e) => <p>{e}</p>)

  return (
    <Card className="card UserProductCard" >
      <Card.Body className='containCardBody'>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardBrand'>user: {user}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>userseller: {userseller}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>status: {status}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>products: {mapProducts}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>payment: {payment} </ListGroup.Item>
          <ListGroup.Item className='cardBrand'>createdAt: {createdAt} </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}