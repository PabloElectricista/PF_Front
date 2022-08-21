import { Link } from "react-router-dom";

export default function ProfileNavBar() {

  return (
    <nav className="navbar shadow-lg mb-2 bg-light p-2 bg-body rounded">
    <div className="container-fluid justify-content-around ">
        <div className="d-flex align-items-center">
            <div className="navbar-nav hstack gap-3">
                <Link to='/profile/cart' className="btn btn-sm btn-outline-secondary" >Shopping cart</Link>
                <Link to='/profile/favorites' className="btn btn-sm btn-outline-secondary" >Favorites</Link>
                <Link to='/profile/my-products' className="btn btn-sm btn-outline-secondary" >My Products</Link>
                <Link to='/profile/shop-history' className="btn btn-sm btn-outline-secondary" >Shopping history</Link>
                <Link to='/profile/sold' className="btn btn-sm btn-outline-secondary" >Sales History</Link>
            </div>
        </div>
    </div>
</nav>
  )
}