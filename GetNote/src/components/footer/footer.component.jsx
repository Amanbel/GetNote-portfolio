import React from "react";
import FaceBook from "../../assets/facebook(1).png";
import Instagram from "../../assets/instagram(1).png";
import Telegram from "../../assets/telegram.png";
import Twitter from "../../assets/twitter.png";
import "./footer.styles.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="company_name">
                    <h1>GetNote</h1>
                </div>
                <div className="contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>GetNoteofficial@gmail.com</li>
                        <li>+251 926892027</li>
                        <li>+251 941828279</li>
                    </ul>
                </div>
                <div className="services">
                    <h3>Services</h3>
                    <ul>
                        <li>Find Notes</li>
                        <li>Share Notes</li>
                    </ul>
                </div>
            </div>
            <div className="socials-container">
                <h3>Follow Us</h3>
                <div className="socials">
                    <img src={FaceBook} />
                    <img src={Instagram} />
                    <img src={Telegram} />
                    <img src={Twitter} />
                </div>
            </div>
        </div>
    )
}

export default Footer;