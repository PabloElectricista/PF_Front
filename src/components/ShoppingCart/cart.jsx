
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import Alert from '../functions/Alert';
import { addToCart, purchaseOrder, updateAmount } from '../../redux/actions';

const Cart = ({name, stock, id}) => {

    const dispatch = useDispatch();
    const { userLogged } = useSelector((state) => state.users);
    const productsAmount = useSelector((state) => state.cartAmount);
    const products = useSelector((state) => state.cart);
    const algo = products.filter(e => e.name === name);
    const { loginWithRedirect } = useAuth0();

    const handleAddToCart = (e) => {
        e.preventDefault();
        // if (userLogged.length === 0) return loginWithRedirect();
        // if (algo.length) return alert('Producto ya agregado al carrito', 'cart');
        // dispatch(addToCart(id));
        // dispatch(updateAmount(productsAmount + 1));
        // alert('Producto agregado al carrito!', 'cart');
        setTimeout(function () {
          dispatch(
            purchaseOrder({
              email: userLogged[0].email,
              name: userLogged[0].name,
              instrument: products[products.length - 1].name,
              unit_price: products[products.length - 1].price,
              quantity: products[products.length - 1].stock,
            })
          )
        }, 1000);
    }

    return (
        <div>
            {
                stock > 1 ? (
                <AddShoppingCartIcon
                    cursor='pointer'
                    color='action'
                    fontSize='large'
                    onClick={(e) => handleAddToCart(e)}
                /> ) : ( '' )
           }
        
        </div>
    )
}

export default Cart;
