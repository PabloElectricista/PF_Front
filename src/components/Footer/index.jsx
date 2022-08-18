import './Footer.css';
import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <hr />
                <div className="contactLinks">
                    <p>Terms & Conditions</p>
                    <p>Your Privacy Rights</p>
                    <p>©2022 B. Goode</p>
                </div>
            </div>
        );
    }
}
export default Footer;
