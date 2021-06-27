import React from 'react';
import { Helmet } from 'react-helmet';

import './Medbox.css';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import MedboxProcess from '../../components/medbox/medboxProcess/MedboxProcess';
import MedboxBody from '../../components/medbox/medboxBody/MedboxBody';

/**
 * Request the medbox according the city you chose in the dashboard
 * or the city you are.
 */
const Medbox = () => {
    return (
        <div className="medbox-style">
            <Helmet>
                <style>{'body { background: none; }'}</style>
            </Helmet>
            <DashboardHeader />
            <MedboxProcess />
            <MedboxBody />
        </div>
    );
}

export default Medbox;