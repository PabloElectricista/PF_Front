/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {getAllProducts} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
// import axios from "axios";
// import { URL_PRODUCTS } from "../../../config";

function ProductDetail() {

    const dispatch = useDispatch();
    const allInstruments = useSelector((state) => state.allInstruments);
    const { id } = useParams();
    
/* 
    const [ product, setProduct ] = useState();
    useEffect( () =>{
        axios(`${URL_PRODUCTS}/${id}`)
            .then(res => {
                setProduct(res.data);
            }).catch(err => {
            console.log(err);
        })
    }, [])
     */

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
                <h1>{instrumentItem.instrument}</h1>
                <p><b>Name: </b>{instrumentItem.instrument}</p>
                <p><b>Price: $</b>{instrumentItem.price}</p>
                <p><b>Description: </b>{instrumentItem.descript}</p>
                <p><b>Image: </b>{instrumentItem.image}</p>
                <p><b>Stock: </b>{instrumentItem.stock}</p>
                <p><b>Color: </b>{instrumentItem.color}</p>
                <p><b>Category: </b>{instrumentItem.categorie}</p>
                <p><b>Brand: </b>{instrumentItem.brand}</p>
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
