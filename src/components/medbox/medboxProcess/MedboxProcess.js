import React from 'react';

import './MedboxProcess.css';

/**
 * Medbox user guide
 * 
 * @param {*} props 
 */
const MedboxProcess = (props) => {
    return (
        <div className="medbox-process-style">
            <img src="/assets/medbox/p5.png" alt="process" id="medbox-process-logo"/><br/>
            <span id="medbox-process-text-left">Get it delivered to your nearest Medbox</span>
            <span id="medbox-process-text-mid">Receive an OTP on your registered mobile number</span>
            <span id="medbox-process-text-right">Feed OTP and retrieve the order</span>
        </div>
    );
}

export default MedboxProcess;