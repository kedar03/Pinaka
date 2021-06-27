import React from 'react';
import { Helmet } from 'react-helmet';

import './upload.css';

import UploadHeader from '../../components/upload_prescription/uploadHeader/UploadHeader';
import UploadBody from '../../components/upload_prescription/uploadBody/UploadBody';

/**
 * Upload prescription from your device and continue to choose the pharmacy 
 * after pressing the continue button.
 * 
 * Or, press "Past Uploaded Prescriptions" to see the orders which you submitted before.
 * @param {*} props 
 */
const UploadPrescription = (props) => {
    return (
        <div className="upload-style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <UploadHeader fileName="UploadPrescription"/>
            <UploadBody />
        </div>
    );
}

export default UploadPrescription;