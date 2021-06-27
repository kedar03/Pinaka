import React from 'react';
import { Link } from 'react-router-dom';

import './dashboardUpload.css';

/**
 * Handle upload the prescription.
 * Redirect the user to the upload page.
 */
const DashboardUpload = () => {
    return (
        <div id="main-upload">
            <div>
                <span id="main-upload-text-top">Please Upload Images</span><br/>
                <span id="main-upload-text-bottom">of Your Prescription</span>
            </div>
            <div id="main-upload-images">
                <Link to='/upload_prescription'>
                    <button id="main-upload-button">
                        <img src="/assets/main/Pinaka_Upload_Webapp_logo.png" alt="upload_presciption" id="main-upload-logo"/>
                    </button>
                </Link>
                <div>
                    <img src="/assets/main/p_1.png" alt="step_1" id="main-upload-step1" /><br/>
                    <span id="main-upload-step1-text">Upload</span>
                </div>
                <div>
                    <img src="/assets/main/p_2.png" alt="step_2" id="main-upload-step2" /><br/>
                    <span id="main-upload-step2-text">Order</span>
                </div>
                <div>
                    <img src="/assets/main/p_3.png" alt="step_3" id="main-upload-step3" /><br/>
                    <span id="main-upload-step3-text-top">Pick it from</span><br/>
                    <span id="main-upload-step3-text-bottom">Medbox</span>
                </div>
            </div>
        </div>
    );
}

export default DashboardUpload;