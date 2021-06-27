import React from 'react';
import './UploadSubHeader.css'

/**
 * Logo of upload page's header.
 * @param {*} props 
 */
const UploadSubHeader = (props) => {
    return (
        <div id="up-pinaka-header-style">
            <span id="pin-header">PIN</span>
                <img src="/Pinaka_Upload_Webapp_logo_2.png" alt="logo1" id="up-pinaka-logo"/>
            <span id="ka-header">KA</span>
        </div>
    );
}

export default UploadSubHeader;