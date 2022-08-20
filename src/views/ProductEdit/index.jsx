import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAllProducts, updateProduct} from "../../redux/actions";

function ProductEdit() {

    const regexInteger = /^\d*$/;
    const regexDecimal = /^(\d+\.?\d*|\.\d+)$/;
    const regexAlphanumeric = /^[\dA-Za-z\s-]*$/;
    const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;

    const dispatch = useDispatch();
    const allInstruments = useSelector((state) => state.allInstruments)
    const { id } = useParams();
    const navigate = useNavigate();

    const [instrumentItem, setInstrumentItem] = React.useState({
        id: 0,
        instrument: '',
        price: 1.0,
        descript: '',
        image: '',
        stock: 0,
        color: '',
        categorie: '',
        brand: '',
    });

    const [errorInfo, setErrorInfo] = React.useState({
        instrument: '',
        price: '',
        descript: '',
        image: '',
        stock: '',
        color: '',
        categorie: '',
        brand: '',
    });

    function handleChange(event) {
        setInstrumentItem({...instrumentItem, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        if (allInstruments.length === 0 ) {
            dispatch(getAllProducts());
        } else {
          const instrumentItem = allInstruments.find(item =>
                item.id === id);
          setInstrumentItem(instrumentItem);
        }
    }, [dispatch, allInstruments, id]);

    function renderInstrument() {
        if (allInstruments.length === 0) {
            return (
                <h1 className='instrumentErrorMessage'>
                    The store is loading...
                </h1>
            );
        }
        if (!instrumentItem) {
            return (
                <h1 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h1>
            );
        }
        return renderForm(instrumentItem);
    }

    function renderForm(instrumentItem) {
        return (
            <>
                <h1>Edit {instrumentItem.instrument}</h1>

                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label>Name: </label>
                        <input placeholder='Instrument name'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('instrument', instrumentItem.instrument)}
                               value={instrumentItem.instrument}
                               type='text' name={'instrument'}/>
                        <span>{errorInfo.instrument}</span>
                    </div>

                    <div>
                        <label>Price: $</label>
                        <input placeholder='Instrument price'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateDecimal('price', instrumentItem.price)}
                               value={instrumentItem.price}
                               type='text' name={'price'}/>
                        <span>{errorInfo.price}</span>
                    </div>

                    <div>
                        <label>Description: </label>
                        <input placeholder='Instrument description'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('description', instrumentItem.descript)}
                               value={instrumentItem.descript}
                               type='text' name={'descript'}/>
                        <span>{errorInfo.descript}</span>
                    </div>

                    <div>
                        <label>Image: </label>
                        <input placeholder='Instrument image'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateUrl('image', instrumentItem.image)}
                               value={instrumentItem.image}
                               type='text' name={'image'}/>
                        <span>{errorInfo.image}</span>
                    </div>

                    <div>
                        <label>Stock: </label>
                        <input placeholder='Instrument stock'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateInteger('stock', instrumentItem.stock)}
                               value={instrumentItem.stock}
                               type='text' name={'stock'}/>
                        <span>{errorInfo.stock}</span>
                    </div>

                    <div>
                        <label>Color: </label>
                        <input placeholder='Instrument color'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('color', instrumentItem.color)}
                               value={instrumentItem.color}
                               type='text' name={'color'}/>
                        <span>{errorInfo.color}</span>
                    </div>

                    <div>
                        <label>Category: </label>
                        <input placeholder='Instrument category'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('category', instrumentItem.categorie)}
                               value={instrumentItem.categorie}
                               type='text' name={'categorie'}/>
                        <span>{errorInfo.categorie}</span>
                    </div>

                    <div>
                        <label>Brand: </label>
                        <input placeholder='Instrument brand'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('brand', instrumentItem.brand)}
                               value={instrumentItem.brand}
                               type='text' name={'brand'}/>
                        <span>{errorInfo.brand}</span>
                    </div>

                    <button className='submitButton' type='submit'>Edit</button>
                    <button className='cancelButton'
                            type='button'
                            onClick={() => handleCancel()}
                    >Cancel</button>
                </form>
            </>
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateProduct(instrumentItem);
        if (error) {
            return;
        }
        dispatch(updateProduct(instrumentItem));
        navigate(`/detail/${id}`);
    }

    function handleCancel() {
        navigate(`/detail/${id}`);
    }

    function validateProduct() {
        const errorName = validateAlpha('instrument', instrumentItem.instrument);
        const errorPrice = validateDecimal('price', instrumentItem.price);
        const errorDescription = validateAlpha('description', instrumentItem.descript);
        const errorImage = validateUrl('image', instrumentItem.image);
        const errorStock = validateInteger('stock', instrumentItem.stock); //validateStock();
        const errorColor = validateAlpha('color', instrumentItem.color);
        const errorCategory = validateAlpha('category', instrumentItem.categorie);
        const errorBrand = validateAlpha('brand', instrumentItem.brand);

        return errorName || errorPrice || errorDescription ||
               errorImage || errorStock || errorColor ||
               errorCategory || errorBrand;
    }

    function validateInteger(key, value) {
        let message = ''
        let result = false;
        if (!regexInteger.test(value)) {
            message = 'The value should contain only numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateDecimal(key, value) {
        let message = ''
        let result = false;
        if (!regexDecimal.test(value)) {
            message = 'The value should contain only decimal numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateAlpha(key, value) {
        let message = ''
        let result = false;
        if (!regexAlphanumeric.test(value)) {
            message = 'The value should contain letters and numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateUrl(key, value) {
        let message = ''
        let result = false;
        if (!regexUrl.test(value)) {
            message = 'The value should contain only a Url.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    return (
        <div className='ProductEdit'>
            {renderInstrument()}
        </div>
    );
}

export default ProductEdit;
