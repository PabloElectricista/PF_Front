// React utilities
import React, { useState } from "react";
// Actions
import { getPrice } from '../Card/favAndCart'
// Components
import ShopCard from "./ShopCard";
// Styles
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './Card.css'
// Paypal
import Paypal from "../paypal/Paypal";

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
    let cartItemMap = cartItem.map((instrument, idx) => 
        <ShopCard
          key={idx}
          id={instrument.id}
          name={instrument.name}
          price={instrument.price}
          brand={instrument.brand}
          rating={instrument.rating}
          color={instrument.color}
          deleteItem={deleteItem}
          updateQuantity={updateQuantity}
          quantity={instrument.quantity ? instrument.quantity : 1}
          image={instrument.image} 
        />
      )
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
        <div className="paymentDetailSC">
          <p>Subtotal: <span>${getPrice()}</span></p>
          { 
            checkout ? (<Paypal/>) : 
            <Button 
              onClick={() => {setCheckOut(true);}} 
              type="submit" 
              variant="contained" 
              endIcon={<ShoppingCartCheckoutIcon />}
              >
                Checkout
            </Button>
          }
        </div>
      </div>
    </div>
  );
}
