import {Link} from 'react-router-dom'

export default function Card() {
  let id = 0

  return (
    <>
      <Link to={"/detail/" + id}>
        <h1>Card</h1>
      </Link>
    </>
  )
}
