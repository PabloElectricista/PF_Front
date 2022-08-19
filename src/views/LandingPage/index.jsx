import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';


export default function LandingPage(){

    return(
        <div className='container'>
            <div className='best'>
                <h4>THE BEST VIRTUAL STORE OF MUSICAL INSTRUMENTS</h4>
            </div>
            <Link to='/home'>
            <button type="button" class="slide">
                <div>Shop Now</div>
                <i class="icon-arrow-right"></i>
            </button>
            </Link>
            <div className='eslogan'>
                <span>B. GOODE, Enjoy music only as we can offer you</span>
            </div>
        </div>
        )
}