// React utilities
import React, { useEffect, useState } from "react";
// Actions
import { getPrice } from '../Card/favAndCart'
// Components
import ShopCard from "./ShopCard";
// Styles
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './Card.css'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const stripePromise = loadStripe('pk_test_51LZlZLAfFn4zXQabU5GwZV9N2mF4rWwZiphhNImIDe3ClFcAcspjPLm2unNFM81E9ljcZfjf2BBhb6L2UW3Vin6G00c54G75HA');

export default function ShoppingCart() {
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWarning(false);
        setSuccess(false);
    };

    const [user, setUser] = useState({})
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))
    
    useEffect(()=>{
        axios('/users/mariana.stocco@outlook.com')
        .then(({data}) => {
            setUser(data._id);
        })
        .catch(error => console.log(error));
    }, [])
    const [totalPrice, setTotalPrice] = useState(getPrice());

    const deleteItem = (id) => {
        let arr = cartItem.filter(instrument => instrument.id !== id)
        localStorage.setItem('cartList', JSON.stringify(arr))
        setCartItem(arr)
        setTotalPrice(getPrice())
    }

    const updateQuantity = () => {
        setTotalPrice(getPrice())
    }
    function renderInstruments() {
        if (!cartItem) {
            return (
                <h4>
                    The CartItem list is empty.
                </h4>
            )
        }
        let cartItemMap = cartItem.map((instrument) =>
            <ShopCard
                key={instrument.id}
                id={instrument.id}
                name={instrument.name}
                price={instrument.price}
                brand={instrument.brand}
                rating={instrument.rating}
                color={instrument.color}
                deleteItem={deleteItem}
                updateQuantity={updateQuantity}
                quantity={instrument.quantity}
                image={instrument.image}
            />
        )
        return (
            <div className="containerCardsSC">
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
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            if (!error) {
                try {
                    const cart = {
                        paymentMethodid: paymentMethod.id,
                        products: [...cartItem],
                        customer: user
                    }
                    console.log(cart);

                    const { data } = await axios.post('/api/checkout', { ...cart })
                    console.log(data);
                    elements.getElement(CardElement).clear();

                    if(true){
                        setTotalPrice(0)
                        localStorage.setItem('cartList', JSON.stringify([]))
                        setCartItem([])
                        setSuccess(true)
                    }else{
                        setWarning(true)
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
        return <form className="formPayment" onSubmit={handleSubmit}>
            <label>Enter your card</label>
            <div className='pricipalContainerPAY' >
                <CardElement />
            </div>

            <Button
                type="submit"
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                disabled={!stripe || !elements}
            >
                BUY
            </Button>
        </form>
    }

    return (
        <div className="shoppingCart">
            <h2>Your Shopping Cart</h2>
            <div className="principalSC">
                {renderInstruments()}
                <div className="paymentDetailSC">
                    <p>Subtotal: <span>${totalPrice}</span></p>
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </div>
            <Snackbar elevation={6} autoHideDuration={1500} open={warning} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity="error" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Fail</strong></AlertTitle>
                    <strong>A purchase error has occurred</strong>
                </Alert>
            </Snackbar>
            <Snackbar elevation={6} autoHideDuration={1500} open={success} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Success</strong></AlertTitle>
                    <strong>Congratulations you have purchased successfully</strong>
                </Alert>
            </Snackbar>
        </div>
    );
}
