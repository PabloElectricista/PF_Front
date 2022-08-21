import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer () {

    const handlerClick = () => {
        setTimeout(function () {
            window.scrollTo({ behavior: 'smooth', top: '0px' });  
        }, 100)
    }

    return (
        <div className="Footer">
            <div className="contactLinks">
                <p>Terms & Conditions</p>
                <p>Your Privacy Rights</p>
                <p>©2022 B. Goode</p>
                <Link to="/about" onClick={(e) => handlerClick(e)}>
                    <p>About us</p>
                </Link>
            </div>
        </div>
    );
}