import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import goode_logo from '../../components/img/assets/ChuckBerry.png'
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {
    
    render() {
        return (
            <nav className="navbar shadow-lg mb-2 bg-light p-2 bg-body sticky-top rounded">
                <div className="container-fluid justify-content-around ">
                    <div className="d-flex align-items-center">
                        <div className="me-5">
                            <img src={goode_logo} alt="Logo B. Goode" width="40" height='40'/>
                            <Link className="navbar-brand " to="/">B. Goode</Link>
                        </div>
                        <div className="navbar-nav hstack gap-3">
                            <Link to='/home' className="nav-link" >Home</Link>
                            <Link to='/create' className="nav-link" >Sell</Link>
                            <Link to='/contact' className="nav-link" >Contact us</Link>
                            <Link to='/favorites' className="nav-link" >Favorites</Link>
                        </div>
                    </div>
                    <SearchBar />
                    <div>
                        <Link to="profile">
                            <button className="btn btn-outline-success me-2" type="button">Profile</button>
                        </Link>
                        <Link to="login">
                            <button className="btn btn-outline-success me-2" type="button">Log in</button>
                        </Link>
                        <button className="btn btn-sm btn-outline-secondary" type="button">Sign in</button>
                        </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;