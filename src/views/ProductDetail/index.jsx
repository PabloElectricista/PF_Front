import React, { useEffect } from "react";
import { getInstrumentById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams();
    useDispatch(getInstrumentById(id));
    const instrument = useSelector(state => state.instruments[0])

    function renderInstrument() {
        if (!instrument) {
            return (
                <h1 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h1>
            );
        }
        return (
            <div className="detailsInfo">
                <h1>{instrument.instrument}</h1>
                <p><b>Name: </b>{instrument.instrument}</p>
                <p><b>Price: $</b>{instrument.price}</p>
                <p><b>Description: </b>{instrument.descript}</p>
                <p><b>Image: </b>{instrument.image}</p>
                <p><b>Stock: </b>{instrument.stock}</p>
                <p><b>Color: </b>{instrument.color}</p>
                <p><b>Category: </b>{instrument.categorie}</p>
                <p><b>Brand: </b>{instrument.brand}</p>
            </div>
        );
    }

    return (
        renderInstrument() 
    );
}

export default ProductDetail;
