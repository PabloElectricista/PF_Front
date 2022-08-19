import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import goode_logo from '../../components/img/assets/ChuckBerry.png'
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {
    
    render() {
        return (
            <nav class="navbar shadow-lg mb-2 bg-light p-2 bg-body rounded">
                <div class="container-fluid justify-content-around ">
                    <div class="d-flex align-items-center">
                        <div class="me-5">
                            <img src={goode_logo} alt="Logo B. Goode" width="40" height='40'/>
                            <Link class="navbar-brand " to="/">B. Goode</Link>
                        </div>
                        <div class="navbar-nav hstack gap-3">
                            <Link to='/home' class="nav-link" >Home</Link>
                            <Link to='/create' class="nav-link" >Sell</Link>
                            <Link to='/contact' class="nav-link" >Contact us</Link>
                        </div>
                    </div>
                    <SearchBar />
                    <div>
                        <button class="btn btn-outline-success me-2" type="button">Log in</button>
                        <button class="btn btn-sm btn-outline-secondary" type="button">Sign in</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;