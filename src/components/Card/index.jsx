import { Link } from 'react-router-dom'

export default function Card({ name, price, rating, image, brand }) {
  let id = 0 //

  const goToDetail = () => {

  }
  
  return (
      <div>
        <Link to={"/detail/" + id}>
          <img src={image} alt={name} />
          <div>
            <h2 >{name}</h2>
            <p>{price}</p>
            <p>{brand}</p>
            <p>{rating}</p>
          </div>
        </Link>
        <button>fav</button>
        <button>shopping cart</button>
      </div>
  )
}
