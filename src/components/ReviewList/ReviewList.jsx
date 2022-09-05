// React Utilities
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
// Components 
import CardReview from "../ReviewListCard/ReviewListCard";
// Actions
import { getReviewsByProduct } from "../../redux/actions";
// Style
import './ReviewList.css';

// class ReviewList extends React.Component {

//     state = {reviews: 0, rating: 0.0};

//     componentDidMount() {
//         if (!this.props.productReviewList ||
//             this.props.productReviewList.length === 0
//         ) {
//             this.props.getReviewsByProduct(this.props.productId);
//         }
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         const {productReviewList} = this.props;
//         if (prevProps.productReviewList.length !== productReviewList.length &&
//             productReviewList &&
//             productReviewList.length !== 0
//         ) {
//             const reviewCount = productReviewList.length;
//             const reviewSum = productReviewList.reduce((sum, item) => sum + item.rating, 0);
//             this.setState({
//                 reviews: productReviewList.length,
//                 rating: (reviewSum / reviewCount)
//             })
//         }
//     }

//     renderReviewItem(reviewList) {
//         return (
//             reviewList.map((item, index) => {
//                 const milliseconds = Date.parse(item.updatedAt);
//                 const itemDate = new Date(milliseconds).toLocaleString()
//                 return (
//                     <div className='reviewItem' key={index}>
//                         <h4>{item.userName}</h4>
//                         <div className="ratingUserItem">
//                             <h6 className='ratingText'><b>Rating: {item.rating.toFixed(1)}</b></h6>
//                             <ReactStars
//                                 value={item.rating}
//                                 edit={false}
//                                 size={20}
//                                 color1={'#888'}
//                                 color2={'#169E85'}
//                             />
//                         </div>
//                         {item.updatedAt && <p><b>Date: </b>{itemDate}</p>}
//                         <p><b>Comment: </b>{item.comment}</p>
//                     </div>
//                 )
//             })
//         );
//     }

//     renderReviewList() {
//         let reviewList;
//         if (!this.props.productReviewList || this.props.productReviewList.length === 0) {
//             reviewList = [{ //default object
//                 userName: 'Admin User',
//                 rating: 2.5,
//                 comment: 'Be the first one to add a review!'
//             }];
//         } else {
//             reviewList = this.props.productReviewList;
//         }
//         return (
//             <div className='reviewListContainer'>
//                 <div className="ratingTotal">
//                     <h4>Rating: {this.state.rating.toFixed(1)}</h4>
//                     <ReactStars
//                         value={this.state.rating}
//                         edit={false}
//                         size={30}
//                         color1={'#888'}
//                         color2={'#169E85'}
//                     />
//                     <h4>({this.state.reviews} reviews)</h4>
//                 </div>
//                 <div className='reviewListGrid'>
//                     {this.renderReviewItem(reviewList)}
//                 </div>
//             </div>
//         );
//     }

//     render() {
//         return (
//             <div className='Details'>
//                 <h1>Review List</h1>
//                 {this.renderReviewList()}
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         productReviewList: state.productReviewList
//     }
// }

// export const mapDispatchToProps = {getReviewsByProduct};

// export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

export default function ReviewList ({ productId }) {

    // Hooks
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.productReviewList);
    const [rating, setRating] = useState(0); 

    useEffect(() => {
        dispatch(getReviewsByProduct(productId));
    }, [dispatch, productId])

    useEffect(() => {
        if( reviews.length ) {
            const allRating = reviews.map(review => review.rating);
            const sumRating = (allRating.reduce((prev, curr) => curr += prev));
            const avrRating = sumRating / allRating.length;
            console.log(avrRating);
            setRating(avrRating);
        }
    }, [reviews]);

    return (
        <div className="reviewListContainer">
            {
                reviews.length ? 
                <>
                    <div className="titleRating">
                        <h2>Rating</h2>
                        <ReactStars
                            className="stars"
                            value={rating}
                            edit={false}
                            size={20}
                            color1={'#888'}
                            color2={'#169E85'}
                        />
                        <p><span>{rating}</span> ({reviews.length} reviews)</p>
                    </div>

                    <div className="contentReviews">
                        {
                            reviews.map(review => {
                                return (
                                    <CardReview 
                                        userName = {review.userName}
                                        rating = {review.rating}
                                        comment = {review.comment}
                                    />
                                )
                            })
                        }
                    </div>
                </> 
                : <h2>No hay reviews</h2>
            }
        </div>
    )
}