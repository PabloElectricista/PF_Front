import React, {useState} from "react";
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
    const defaultErrorInfo = {
        rating: '',
        comment: '',
    }
    const [reviewItem, setReviewItem] = useState(defaultReview);
    const [errorInfo, setErrorInfo] = useState(defaultErrorInfo); //todo - create one element for review error and another for comment error.

    function handleChange(event) {
        setReviewItem({...reviewItem, [event.target.name]: event.target.value})
    }

    function validateRating(reviewItem) {
        if (reviewItem.rating === 0) {
            setErrorInfo({
                ...errorInfo,
                rating: 'Please assign a rating before clicking the submit button.'
            });
            return true;
        } else {
            setErrorInfo({
                ...errorInfo,
                rating: ''
            });
            return false;
        }
    }

    function validateComment(reviewItem) {
        if (reviewItem.comment.length === 0) {
            setErrorInfo({
                ...errorInfo,
                comment: 'Please write a review clicking the submit button.'
            });
            return true;
        } else {
            setErrorInfo({
                ...errorInfo,
                comment: ''
            });
            return false;
        }
    }

    function validateReview(reviewItem) {
        const resultComment = validateComment(reviewItem);
        const resultRating = validateRating(reviewItem);
        return resultRating || resultComment;
    }

    function handleSubmit(event) {
        console.log("handle submit", reviewItem)
        event.preventDefault();
        const error = validateReview(reviewItem);
        if (error) {
            return;
        }
        dispatch(addReview(reviewItem));
        setReviewItem(defaultReview);
        setErrorInfo(defaultErrorInfo)
    }

    function renderReviewForm() {
        return (
            <div className='ratingContainer'>
                <form>
                    <div className='starRating'>
                        <label>Rating: </label>
                        <fieldset className="starability-basic">
                            <legend>First rating:</legend>
                            <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" checked
                                   aria-label="No rating." onChange={(e) => handleChange(e)}/>
                            <input type="radio" id="first-rate1" name="rating" value="1"
                                   onChange={(e) => handleChange(e)}/>
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="rating" value="2"
                                   onChange={(e) => handleChange(e)}/>
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="rating" value="3"
                                   onChange={(e) => handleChange(e)}/>
                            <label htmlFor="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="rating" value="4"
                                   onChange={(e) => handleChange(e)}/>
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="rating" value="5"
                                   onChange={(e) => handleChange(e)}/>
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                        <span className="errorMessage">{errorInfo.rating}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Review: </label>
                        <textarea placeholder='Write a review comment...'
                                  onChange={(e) => handleChange(e)}
                                  onBlur={() => validateReview(reviewItem)}
                                  value={reviewItem.comment}
                                  rows={5}
                                  name={'comment'}/>
                        <span className="errorMessage">{errorInfo.comment}</span>
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
