/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* 
    Dependencias de stripe: @stripe/react-stripe-js @stripe/stripe-js
    bootswatch lireria con temas de bootstrap
*/

import axios from 'axios';
// import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import "bootswatch/dist/lux/bootstrap.min.css";
// import ShoopingCartItem from '../ShoppingCart';
import { useState } from 'react';
import ShopCard from "../ShoppingCart";
import '../ShoppingCart/Card.css'


const appearance = {
    theme: 'night',
    variables: {
      fontFamily: 'Sohne, system-ui, sans-serif',
      fontWeightNormal: '500',
      borderRadius: '8px',
      colorBackground: '#0A2540',
      colorPrimary: '#EFC078',
      colorPrimaryText: '#1A1B25',
      colorText: 'white',
      colorTextSecondary: 'white',
      colorTextPlaceholder: '#727F96',
      colorIconTab: 'white',
      colorLogo: 'dark'
    },
    rules: {
      '.Input, .Block': {
        backgroundColor: 'transparent',
        border: '1.5px solid var(--colorPrimary)'
      }
    }
  };


const stripePromise = loadStripe('pk_test_51LZlZLAfFn4zXQabU5GwZV9N2mF4rWwZiphhNImIDe3ClFcAcspjPLm2unNFM81E9ljcZfjf2BBhb6L2UW3Vin6G00c54G75HA');

function StripeComponent() {
    // const products = useSelector((state) => state.cart);  //
    // const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem('totalPrice')))
    // const total = () => {
    //     setTotalPrice()
    //   }
    //   console.log
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))

    const deleteItem = (id) => {
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
            <div className="favoriteCards">
                {cartItemMap}
            </div>
        );
    }

    function CheckoutForm() {
        const stripe = useStripe();
        const elements = useElements();
        if (elements == null) return;

        const handleSubmit = async (event) => {
            event.preventDefault();
            console.log("hasta aqui");
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            console.log("hasta aqui no llega");
            if (!error) {
                try {
                    const cart = cartItem.map(product => {
                        return {
                            id: paymentMethod.id,
                            productid: product._id,
                            quantity: product.quantity,
                            amount: product.price  // price en centavoss
                        }
                    })

                    const { data } = await axios.post('http://localhost:3001/api/checkout', { cart })
                    console.log(data.message);  // success?
                    elements.getElement(CardElement).clear();
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return (<div >
            <>
                <h1>Shopping Cart</h1>
                {renderInstruments()}
                <p>TOTAL A PAGAR</p>
            </>
            <form onSubmit={handleSubmit}>
                <div className='cartContainer'>
                    <CardElement className='cartContainer' />
                </div>
                <button type="submit" disabled={!stripe || !elements} className="btn btn-success m-2" >
                    buy
                </button>
            </form>
        </div>
        )
    }

    return (
        cartItem ?
            (
                <div className="App">
                    <Elements stripe={stripePromise}>
                        <div className='container p-4'>
                            <div className='row'>
                                <div className="col-md-4 offset-md-4">
                                    <CheckoutForm />
                                </div>
                            </div>
                        </div>
                    </Elements>
                </div>
            )
            : <span>Loading...</span>
    );
}

export default StripeComponent;
