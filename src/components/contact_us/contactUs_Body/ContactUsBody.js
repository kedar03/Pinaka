import React from "react";
import ContactUsForm from '../contactUs_Form/ContactUsForm';

import './ContactUsBody.css';

/**
 * Contact page's user guide
 */
const ContactUsBody = () => {
    return (
        <div className="contact-body-style">
            <div className="contact-subheader-style">
                <span className="contact-subheader-text">Contact Us</span>
            </div>
            <div className="contact-care-style">
                <span id="contact-care-text">Worried about something? We're just a phone call away!</span>
            </div>
            <div className="contact-info-style">
                <span id="contact-info-top">Reach us at:</span><br/>
                <span id="contact-info-mid">+91-9035000041</span><br/>
                <span id="contact-info-bottom">From 10AM to 6PM, Monday to Saturday.</span>
            </div>
            <div className="contact-icon-style">
                <img src="/assets/contact_us/P1.png" alt="phone_icon" id="contact-icon"/>
            </div>
            <ContactUsForm />
        </div>
    );
}

export default ContactUsBody;