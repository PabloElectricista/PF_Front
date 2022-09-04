/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
// React utilities
import React, {useEffect} from "react";
import {getProductById} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
// Components
import Loading from "../../components/Loading/Loading";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
// Styles
import Carousel from "react-bootstrap/Carousel";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './ProductDetail.css';

function ProductDetail() {

    // Hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const instrumentItem = useSelector((state) => state.retrievedInstrument);

    useEffect(() => {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            dispatch(getProductById(id));
        }
    }, [dispatch, instrumentItem, id])

    // Go to edit the product
    function handleEdit() {
        navigate(`/edit/${id}`);
    }

    function renderCategories() {
        if (!instrumentItem ||
            !instrumentItem.category ||
            instrumentItem.category.length === 0) {
            return 'N/A';
        }
        return instrumentItem.category.join(', ');
    }

    function renderImageItem() {
        if (!instrumentItem ||
            !instrumentItem.image ||
            instrumentItem.image.length === 0) {
            return '';
        }
        return (
            instrumentItem.image.map((imageItem, index) => {
                return <Carousel.Item interval={3000} key={index}>
                            <img className="imageCarousel"
                                src={imageItem}
                                alt={index}
                            />
                        </Carousel.Item>
            })
        );
    }

    function renderInstrument() {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            return <Loading/>;
        }
        if (instrumentItem.error) {
            return (
                <h4 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h4>
            );
        }

        return (
            <div className='detailsContainer'>
                <div className="imageContainer">
                    <Carousel className='productDetailCarousel' variant="dark">
                        {renderImageItem()}
                    </Carousel>
                </div>
                <div className="infoContainer">
                    <h1>{instrumentItem.name}</h1>
                    <p><b>Name: </b>{instrumentItem.name}</p>
                    <p><b>Price: $</b>{instrumentItem.price}</p>
                    <p><b>Description: </b>{instrumentItem.description}</p>
                    <p><b>Stock: </b>{instrumentItem.stock}</p>
                    <p><b>Color: </b>{instrumentItem.color}</p>
                    <p><b>Categories: </b>{renderCategories()}</p>
                    <p><b>Brand: </b>{instrumentItem.brand}</p>
                    <p><b>Location: </b>{instrumentItem.location}</p>
                    <p><b>Status: </b>{instrumentItem.status}</p>
                    <button className='submitButton'
                            type='button'
                            onClick={() => handleEdit()}
                    >Edit
                    </button>
                </div>
            </div>
        );
    }

    return (
        (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) ? <Loading /> :
        <div className="containerDetails">
            <div className="principalData">
                <Carousel variant="dark" >
                    {
                        instrumentItem.image.map((imageItem, index) => {
                            return(
                                <Carousel.Item interval={3000} key={index}>
                                    {
                                        imageItem ? <img className="imageDetail"
                                            src={imageItem}
                                            alt={instrumentItem.name}
                                        /> : <Loading />
                                    }
                                    
                                </Carousel.Item>
                            ) 
                        })
                    }
                </Carousel>

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
                            <li><b>Category:</b> </li>
                            <li><b>Location:</b> {instrumentItem.location}</li>
                        </div>
                    </ul>
                </div>

                <div className="productsOptions">
                    <div className="share-favorite">
                        <p><ShareOutlinedIcon /> Share</p>
                        <p><FavoriteBorderOutlinedIcon /> Favorite</p>
                    </div>
                    
                    <div className="detailPayment">
                        <h5>${instrumentItem.price}</h5>
                        <div className="formPayment">Aca iria el form donde puedes elegir
                        la cantidad e ir a comprarlo o al carrito</div>
                    </div>
                </div>
            </div>
            <ReviewForm productId={id}/>
            <ReviewList productId={id}/>
        </div>
    );
}

//             <div className='Details'>
//             {renderInstrument()}
//             </div>
//             <ReviewForm productId={id}/>
//             <ReviewList productId={id}/> 

export default ProductDetail;