import React, {useState} from "react";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
import {useDispatch} from "react-redux";
import {addReview} from "../../redux/actions";
import './ReviewForm.css';

function ReviewForm(props) {

    const productId = props.productId;
    const dispatch = useDispatch();
    const defaultReview = {
        user: '62fe63c53c42cd4281febdbe', //todo - add the user id.
        userName: 'Admin user',
        product: productId,
        rating: 0,
        comment: ''
    };
    const [reviewItem, setReviewItem] = useState(defaultReview);
    const [errorRating, setErrorRating] = useState('');
    const [errorComment, setErrorComment] = useState('');

    function handleCommentChange(event) {
        setReviewItem({...reviewItem, [event.target.name]: event.target.value})
    }

    function handleRateChange(newRate) {
        console.log("rate handleCommentChange", newRate)
        setReviewItem({...reviewItem, rating: newRate})
        setErrorRating('');
    }

    function validateRating(reviewItem) {
        if (reviewItem.rating === 0) {
            setErrorRating('Please assign a rating before clicking the submit button.');
            return true;
        } else {
            setErrorRating('');
            return false;
        }
    }

    function validateComment(reviewItem) {
        if (reviewItem.comment.length === 0) {
            setErrorComment('Please write a review clicking the submit button.');
            return true;
        } else {
            setErrorComment('');
            return false;
        }
    }

    function validateReview(reviewItem) {
        const resultComment = validateComment(reviewItem);
        const resultRating = validateRating(reviewItem);
        return resultRating || resultComment;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateReview(reviewItem);
        if (error) {
            return;
        }
        dispatch(addReview(reviewItem));
        setReviewItem(defaultReview);
        setErrorRating('');
        setErrorComment('');
    }

    function renderReviewForm() {
        return (
            <div className='ratingContainer'>
                <form>
                    <div className='starRating'>
                        <legend>Rating: </legend>
                        <ReactStars
                            value={reviewItem.rating}
                            onChange={(newRate) => handleRateChange(newRate)}
                            edit={true}
                            size={30}
                            color1={'#888'}
                            color2={'#169E85'}
                        />
                        <span className="errorMessage">{errorRating}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Review: </label>
                        <textarea placeholder='Write a review comment...'
                                  onChange={(e) => handleCommentChange(e)}
                                  onBlur={() => validateComment(reviewItem)}
                                  value={reviewItem.comment}
                                  rows={5}
                                  name={'comment'}/>
                        <span className="errorMessage">{errorComment}</span>
                    </div>
                </form>
                <button className='submitReviewButton'
                        type='button'
                        onClick={e => handleSubmit(e)}
                >Submit
                </button>
            </div>

        );
    }

    return (
        <div className='Details'>
            <h1>Leave a review</h1>
            {renderReviewForm()}
        </div>
    );
}

export default ReviewForm;
