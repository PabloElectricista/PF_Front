import React, {useEffect} from "react";
import {getAllProducts} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function ProductDetail() {

    const dispatch = useDispatch();
    const allInstruments = useSelector((state) => state.allInstruments);
    const { id } = useParams();

   useEffect( () =>{
        if (allInstruments.length === 0 ) {
            dispatch(getAllProducts());
        }
    }, [dispatch, allInstruments])

    function renderInstrument() {
        if (allInstruments.length === 0) {
            return (
                <h1 className='instrumentErrorMessage'>
                    The store is empty...
                </h1>
            );
        }
        const instrumentItem = allInstruments.find(item =>
            item.id === id);
        if (!instrumentItem) {
            return (
                <h1 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h1>
            );
        }
        return (
            <div className="detailsInfo">
                <h1>{instrumentItem.name}</h1>
                <p><b>Name: </b>{instrumentItem.name}</p>
                <p><b>Price: $</b>{instrumentItem.price}</p>
                <p><b>Description: </b>{instrumentItem.description}</p>
                <p><b>Image: </b>{instrumentItem.image}</p>
                <p><b>Stock: </b>{instrumentItem.stock}</p>
                <p><b>Color: </b>{instrumentItem.color}</p>
                <p><b>Category: </b>{instrumentItem.categorie}</p>
                <p><b>Brand: </b>{instrumentItem.brand}</p>
                <p><b>Location: </b>{instrumentItem.location}</p>
                <p><b>Status: </b>{instrumentItem.status}</p>
            </div>
        );
    }

    return (
        <div className='Details'>
            {renderInstrument()}
        </div>
    );
}

export default ProductDetail;
