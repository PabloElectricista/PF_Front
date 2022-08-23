import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import goode_logo from '../../components/img/assets/ChuckBerry.png'
import toTheTop from '../../customScripts';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';
import LogInBtn from "../LogInBtn";
import LogOutBtn from "../LogOutBtn";
import { useAuth0 } from '@auth0/auth0-react'


export default function NavBar() {
    const { user, isAuthenticated, isLoading } = useAuth0()

    return (
        <nav className="navbar mb-2 p-2 bg-dark sticky-top rounded">
            <div className="container-fluid justify-content-around ">
                <div className="d-flex align-items-center">
                    <div className="d-flex me-5">
                        <img className="navbarLogo" src={goode_logo} alt="Logo B. Goode" width="40" height='40' />
                        <Link className="navbar-brand" to="/" onClick={() => toTheTop()}>
                            B. Goode
                        </Link>
                    </div>
                    <div className="navbar-nav hstack gap-3">
                        <Link to='/home' className="nav-link" onClick={() => toTheTop()} >Home</Link>
                        <Link to='/create' className="nav-link" onClick={() => toTheTop()}>Sell</Link>
                        <Link to='/contact' className="nav-link" onClick={() => toTheTop()}>Contact us</Link>
                        <Link to='/favorites' className="nav-link" onClick={() => toTheTop()}>Favorites</Link>
                    </div>
                </div>
                <SearchBar />
                <div>
                    {isAuthenticated ?
                        <>
                            <img className="ProfileImg" src={user.picture} alt="user" />
                            <Link to="profile">
                                <button className="btn btn-outline-success me-2" onClick={() => toTheTop()} type="button">Profile</button>
                            </Link>
                            <LogOutBtn />
                        </>
                        : (!isLoading && <LogInBtn />)}
                </div>
            </div>
        </nav>
    );
}