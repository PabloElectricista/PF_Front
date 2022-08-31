/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* 
    Dependencias de stripe: @stripe/react-stripe-js @stripe/stripe-js
    bootswatch lireria con temas de bootstrap
*/

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import "bootswatch/dist/lux/bootstrap.min.css";

const stripePromise = loadStripe('pk_test_51LZlZLAfFn4zXQabU5GwZV9N2mF4rWwZiphhNImIDe3ClFcAcspjPLm2unNFM81E9ljcZfjf2BBhb6L2UW3Vin6G00c54G75HA');

function StripeComponent() {
    const products = useSelector((state) => state.cart);  //

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
                    const cart = products.map(product => {
                        return {
                            id: paymentMethod.id,
                            productid: product._id,
                            quantity: product.quantity,
                            amount: product.price * 100  // price en centavoss
                        }
                    })
                    const { data } = await axios.post('http://localhost:3001/api/checkout',
                        { cart }
                    )
                    console.log(data.message);  // success?

                    elements.getElement(CardElement).clear();
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return (
            <form onSubmit={handleSubmit} className="card card-body">
                {
                    products.map(instrumentItem => <div>
{/* 
                    mostrar productos                    

 */}
                    </div>)
                }
{/* 
                mostrar precio total
*/}
                <button
                    type="submit"
                    disabled={!stripe || !elements}
                    className="btn btn-success m-2"
                >
                    buy
                </button>
            </form>
        )
    }

    return (
        products ?
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
