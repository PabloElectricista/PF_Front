/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
// React utilities
import React, { useEffect, useState } from "react";
import { getProductById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {addToFav, addToCart} from '../../components/Card/FavAndCart';
// Components
import Loading from "../../components/Loading/Loading";
import ReviewList from "../../components/ReviewList/ReviewList";
import ReviewForm from "../../components/ReviewForm";
// Auth0
import { useAuth0 } from '@auth0/auth0-react';
// Styles
import Carousel from "react-bootstrap/Carousel";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import './ProductDetail.css';
import {BsCartFill, BsStarFill} from "react-icons/bs";

export default function ProductDetail() {

    // Auth0
    const { isAuthenticated } = useAuth0()

    // Hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const instrumentItem = useSelector((state) => state.retrievedInstrument);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            dispatch(getProductById(id));
        }
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [dispatch, instrumentItem, id])

    // Go to edit the product
    function handleEdit() {
        navigate(`/edit/${id}`);
    }

    // Alert Logic 
    const [open, setOpen] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    const {name, price, rating, image, brand} = instrumentItem ? instrumentItem : {};
    return (
        (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) ? <Loading /> :
        <div className="containerDetails">
            <div className="principalData">
                {
                    !loading ? 
                    <Carousel variant="dark" >
                        {
                            instrumentItem.image.map((imageItem, index) => {
                                return(
                                    <Carousel.Item interval={3000} key={index}>
                                        <img className="imageDetail"
                                            src={imageItem}
                                            alt={instrumentItem.name}
                                        />
                                    </Carousel.Item>
                                ) 
                            })
                        }
                    </Carousel>
                    : <Skeleton             
                        variant='circular' 
                        animation="wave"
                    />
                }

                <div className="productData">
                    <h3>{instrumentItem.name}</h3>
                    <p>{instrumentItem.description}</p>
                    <ul>
                        <div className="listProductDetail">
                            <li><b>Brand:</b> {instrumentItem.brand}</li>
                            <li><b>Stock:</b> {instrumentItem.stock}</li>
                            <li><b>Condition:</b> {instrumentItem.status}</li>
                        </div>
                        <div className="listProductDetail">
                            <li><b>Color:</b> {instrumentItem.color[0].toUpperCase() + instrumentItem.color.substring(1)}</li>
                            <li><b>Category:</b> {instrumentItem.category.join(', ')}</li>
                            <li><b>Location:</b> {instrumentItem.location}</li>
                        </div>
                    </ul>
                </div>

                <div className="productsOptions">
                    <div className="share-favorite">
                        <CopyToClipboard text={window.location.href}>
                            <p><ShareOutlinedIcon onClick={handleClick}/> Share</p>
                        </CopyToClipboard>
                        <BsStarFill className='CardIcon' onClick={() => addToFav(id, name, price, rating, image, brand)} />
                        <BsCartFill className='CardIcon' onClick={() => addToCart(id, name, price, rating, image, brand)}/>
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Link copied to clipboard 
                                </Alert>
                        </Snackbar>
                    </div>
                    
                    <div className="detailPayment">
                        <h5>${instrumentItem.price}</h5>
                        <div className="formPayment">Aca iria el form donde puedes elegir
                        la cantidad e ir a comprarlo o al carrito</div>
                    </div>

                    {
                        isAuthenticated ? 
                        <button className='editButton'
                            type='button'
                            onClick={() => handleEdit()}
                        >Edit
                        </button>
                        : null 
                    }
                </div>
            </div>
            <Divider />
            <ReviewList productId={id}/>
            <ReviewForm productId={id}/>
        </div>
    );
}
