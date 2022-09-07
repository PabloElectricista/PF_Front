import ShopCard from "./ShopCard";
import './Card.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import Paypal from "../paypal/Paypal";
import { getPrice } from '../Card/favAndCart'

export default function ShoppingCart() {

  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))
  const [checkout, setCheckOut] = useState(false);

  const deleteItem = (id) => {
    let arr = cartItem.filter(instrument => instrument.id !== id)
    localStorage.setItem('cartList', JSON.stringify(arr))
    setCartItem(arr)
  }

  const updateQuantity = (id, quantity) => {
    let updatedList = cartItem.map(item =>
        item.id !== id ? item : {...item, quantity}
    );
    localStorage.setItem('cartList', JSON.stringify(updatedList));
    setCartItem(updatedList);
  }

  function renderInstruments() {
    if (!cartItem) {
      return (
        <h4>
          The CartItem list is empty.
        </h4>
      )
    }
    let cartItemMap = cartItem.map((instrument, idx) => <ShopCard
      key={idx}
      id={instrument.id}
      name={instrument.name}
      price={instrument.price}
      brand={instrument.brand}
      rating={instrument.rating}
      quantity={instrument.quantity}
      deleteItem={deleteItem}
      updateQuantity={updateQuantity}
      quantity={instrument.quantity ? instrument.quantity : 1}
      image={instrument.image} />);
    return (
      <div className="favoriteCards">
        {cartItemMap}
      </div>
    );
  }

  return (
    <div className="containerHome cartItemContainer">
      <h1>Cart</h1>
      {renderInstruments()}
      <h1>
        {getPrice()}
      </h1>
      <div>
      {checkout ? (
        <Paypal/>
      ) : (
        <button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </button>
      )}
      </div>
    </div>

  );
}
