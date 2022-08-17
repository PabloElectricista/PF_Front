import "./NavBar.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div>
                    <Link className='linkItem' to="/login">Login</Link>
                    <Link className='linkItem' to="/">Home</Link>
                    <Link className='linkItem' to="/contact">Contact Us</Link>
                    <Link className='linkItem' to="/create">Create Product</Link>
                    <Link className='linkItem' to="/profile">User Profile</Link>
                    <Link className='linkItem' to="/payment">Payment</Link>
                </div>
            </div>
        );
    }
}

export default NavBar;
