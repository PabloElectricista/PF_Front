import ShopCard from "./ShopCard";
import './Card.css'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ShoopingCartItem() {

  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))

  const deleteItem = (id) =>{
    let arr = cartItem.filter(instrument => instrument.id !== id)
    localStorage.setItem('cartList', JSON.stringify(arr))
    setCartItem(arr)
  }

  function renderInstruments() {
    if (!cartItem) {
      return (
        <h4>
          The CartItem list is empty.
        </h4>
      )
    }
    let cartItemMap = cartItem.map((instrument, idx) => <ShopCard // usar fav card
      key={idx}
      id={instrument.id}
      name={instrument.name}
      price={instrument.price}
      brand={instrument.brand}
      rating={instrument.rating}
      deleteItem={deleteItem}
      image={instrument.image} />);
    return (
      <div className="favoriteCards">
        {cartItemMap}
      </div>
    );
  }

  return (
    <div className="containerHome cartItemContainer">
      <h1>Shopping Cart</h1>
      {renderInstruments()}
      <div>
        <Link to = '/stripe'>
        <button>Submit Cart</button>
        </Link>
      </div>
    </div>
    
  );
}
