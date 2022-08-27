import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getReviewsByProduct} from "../../redux/actions";
import './ReviewList.css';

function ReviewList(props) {

    const dispatch = useDispatch();
    const productReviewList = useSelector((state) => state.productReviewList);
    const productId = props.productId;

    useEffect(() => {
        if (!productReviewList ||
            productReviewList.length === 0
        ) {
            dispatch(getReviewsByProduct(productId));
        }
    }, [dispatch, productId, productReviewList])

    function renderReviewItem() {
        return (
            productReviewList.map((item, index) => {
                return (
                    <div className='reviewItem' key={index}>
                        <h1>{item.userName}</h1>
                        <p><b>Rating: </b>{item.rating}</p>
                        <p><b>Comment: </b>{item.comment}</p>
                    </div>
                )
            })
        );
    }

    function renderReviewList() {
        if (!productReviewList ||
            productReviewList.length === 0) {
            return '';
        }
        return (
            <div className='reviewListContainer'>
                {renderReviewItem()}
            </div>
        );
    }

    return (
        <div className='Details'>
            <h1>Review List</h1>
            {renderReviewList()}
        </div>
    );
}

export default ReviewList;
