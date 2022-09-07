// React utilities
import React, { useState } from "react";
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

  const updateQuantity = (id, quantity) => {
    let updatedList = cartItem.map(item =>
        item.id !== id ? item : {...item, quantity}
    );
    localStorage.setItem('cartList', JSON.stringify(updatedList));
    setCartItem(updatedList);
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
      color={instrument.color}
      deleteItem={deleteItem}
      updateQuantity={updateQuantity}
      quantity={instrument.quantity ? instrument.quantity : 1}
      image={instrument.image} />);
    return (
      <div className="containerCardsSC">
        {cartItemMap}
      </div>
    );
  }

  return (
    <div className="shoppingCart">
      <h2>Your Shopping Cart</h2>
      <div className="principalSC">
        {renderInstruments()}
        <div className='paymentDetailSC'>
          <div className="goToPaySC">go To Pay</div>
        </div>
      </div>
      
    </div>

  );
}
