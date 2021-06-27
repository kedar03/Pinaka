import React from 'react';
import { Link } from 'react-router-dom';

import './dashboardHelp.css';

/**
 * Link to contact us page or medbox page.
 */
const DashboardHelp = () => {
    return (
        <div className="main-help">
            <div id="main-right-top">
                <Link to='/contact_us' >
                    <button id="main-without-presciption-button">
                        <img src="/assets/main/p_8.png" alt="without_prescription?" id="main-without-presciption-image"/>
                    </button><br/>
                </Link>
                <span id="main-right-top-text">Don't Have Presciption?</span>
            </div>
            <div id="main-right-bottom">
                <Link to='/medbox' >
                    <button id="main-medbox-button">
                        <img src="/assets/main/p_9.png" alt="medbox" id="main-medbox-image"/>
                    </button><br/>
                </Link>
                <span id="main-right-bottom-text">Medbox</span>
            </div>
        </div>
    );
}

export default DashboardHelp;