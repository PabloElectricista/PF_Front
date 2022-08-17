import './Footer.css';
import React, { Component } from "react";
import {BsGithub, BsLinkedin} from 'react-icons/bs';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <hr />
                <div className="contactLinks">
                    <BsGithub className='contactLink' />
                    <p>Johnny B.Goode</p>
                    <BsLinkedin className='contactLink' />
                </div>
            </div>
        );
    }
}
export default Footer;
