import React from "react";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
import {connect} from "react-redux";
import {getReviewsByProduct} from "../../redux/actions";
import './ReviewList.css';

class ReviewList extends React.Component {

    componentDidMount() {
        if (!this.props.productReviewList ||
            this.props.productReviewList.length === 0
        ) {
            this.props.getReviewsByProduct(this.props.productId);
        }
    }

    renderReviewItem(reviewList) {
        return (
            reviewList.map((item, index) => {
                return (
                    <div className='reviewItem' key={index}>
                        <h1>{item.userName}</h1>
                        <p><b>Rating: </b></p>
                        <ReactStars
                            value={item.rating}
                            edit={false}
                            size={30}
                            color1={'#888'}
                            color2={'#169E85'}
                        />
                        <p><b>Comment: </b>{item.comment}</p>
                    </div>
                )
            })
        );
    }

    renderReviewList() {
        let reviewList;
        if(!this.props.productReviewList || this.props.productReviewList.length === 0) {
            reviewList = [{ //default object
                userName: 'Admin User',
                rating: 2.5,
                comment: 'Be the first one to add a review!'
            }];
        } else {
            reviewList = this.props.productReviewList;
        }
        return (
            <div className='reviewListContainer'>
                {this.renderReviewItem(reviewList)}
            </div>
        );
    }

    render() {
        return (
            <div className='Details'>
                <h1>Review List</h1>
                {this.renderReviewList()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productReviewList: state.productReviewList
    }
}

export const mapDispatchToProps = {getReviewsByProduct};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
