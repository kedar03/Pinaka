import React from 'react';
import { Helmet } from 'react-helmet';

import './dashboard.css';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import DashboardBody from '../../components/dashboard/dashboard_body/DashboardBody';

/**
 * The dashboard of our web app which contains lots of functionalities.
 */
const DashBoard = () => {
    

    return (
        <div className="main-style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader loc="True"/>
            <DashboardBody />
        </div>
    );
}

export default DashBoard;