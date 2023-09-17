import React from "react"
import "./contact-us.styles.scss"


const ContactUs = () => {
    return (
        <div className="contact">
            <div className="contact-container">
                {/* <div className="inner-shadow"> */}
                    <h2>Contact Us</h2>
                    <form>
                        <label>Full Name</label>
                        <input type="text" name="full-name"/>
                        <label>Email</label>
                        <input type="email" name="email"/>
                        <textarea placeholder="Message" name="message"></textarea>
                        <button>Send</button>
                    </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default ContactUs