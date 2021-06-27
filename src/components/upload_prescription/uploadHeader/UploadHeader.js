import React from 'react';
import { Link } from 'react-router-dom';
import UploadSubHeader from './UploadSubHeader';
import './UploadHeader.css';

/**
 * Upload Header include previous arrow.
 * @param {*} props 
 */
const UploadHeader = (props) => {
    let path = '';
    if (props.fileName === 'ForgotPassword')
        path = '/login';
    else if (props.fileName === 'UploadPrescription')
        path = '/';
        
    return (
        <div id="up-header">
            <Link to={path}>
                <button id="up-prepage" >&#x2B05;</button>
            </Link>
            <UploadSubHeader />
        </div>
    );
}

export default UploadHeader;