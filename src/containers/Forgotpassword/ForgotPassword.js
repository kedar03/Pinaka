import React from 'react';

import './ForgotPassword.css';

import UploadHeader from '../../components/upload_prescription/uploadHeader/UploadHeader';
import SubHeader from '../../components/Forgotpassword/FP-Header/Sub-Header';
import FPForm from '../../components/Forgotpassword/FP-Form/FP-Form';


/**
 * Input the email which corresponding to the password you forgot,
 * and the firebase will send an email to the account.
 * Change the password with the link inside the mail.
 * @param {*} props 
 */
const ForgotPassword = props => {
     
   
        return (
            <div className = "ForgotPassword"> 
             <UploadHeader fileName="ForgotPassword"/>
             <SubHeader/>
             <FPForm />
            </div>
        );
    
}
export default ForgotPassword;