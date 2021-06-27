import React from 'react';
import { Link } from 'react-router-dom';
import UploadSubHeader from '../../upload_prescription/uploadHeader/UploadSubHeader';
import './thankPageHeader.css';

/**
 * Thank page Header
 * @param {*} props 
 */
const ThankPageHeader = (props) => {
  const  path = '/';
        
    return (
        <div id="thank-header">
            <Link to={path}>
                <button id="thank-prepage" >&#x2B05;</button>
            </Link>
            <UploadSubHeader id = "thank-subHeader"/> 
        </div>
    );
}

export default ThankPageHeader;