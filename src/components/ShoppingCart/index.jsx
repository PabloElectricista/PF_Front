// React utilities
import React from "react";
import { useState } from "react";
// Components 
import ShopCard from "./ShopCard";
// Styles
import './Card.css'

export default function ShoppingCart() {

  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))

  const deleteItem = (id) => {
    let arr = cartItem.filter(instrument => instrument.id !== id)
    localStorage.setItem('cartList', JSON.stringify(arr))
    setCartItem(arr)
  }

  function renderInstruments() {
    if (!cartItem.length) {
      return (
        <div className="empyShoppingCart">
          <h3>Your Shopping Cart is empty.</h3>
        </div>
      )
    }
    let cartItemMap = cartItem.map((instrument, idx) => <ShopCard
        key={idx}
        id={instrument.id}
        name={instrument.name}
        price={instrument.price}
        brand={instrument.brand}
        rating={instrument.rating}
        deleteItem={deleteItem}
        image={instrument.image} />);
      return (
        <div className="containerCards">
          {cartItemMap}
        </div>
      );
  }

  return (
    <div className="shoppingCart">
      <h2>Your Shopping Cart</h2>
      {renderInstruments()}
    </div>

  );
}
