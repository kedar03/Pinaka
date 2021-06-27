import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import ContactUsBody from '../../components/contact_us/contactUs_Body/ContactUsBody';

/**
 * If the user don't have prescription or any question,
 * fill in the information and they will contact you.
 */
const ContactUs = () => {
    return (
        <div className="contact-style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader />
            <ContactUsBody />
        </div>
    );
}

export default ContactUs;