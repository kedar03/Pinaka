import React from 'react';
import './ThankPage.css';
import ThankPageHeader from '../../components/thank_page/thankPage_Header/thankPageHeader';
import ThankPageBody from '../../components/thank_page/thankPage_Body/thankPageBody';

/**
 * Display the thank words after submitting the order
 * and redirect the user to the dashboard after few seconds.
 * @param {*} props 
 */
const ThankPage = props => {
    
    return(
    <div> 
        <ThankPageHeader />
        <ThankPageBody />
    </div>
);
}
export default ThankPage;