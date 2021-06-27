import React from 'react';

import './ConfirmPharmacy.css';
import { Helmet } from 'react-helmet';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import ConfirmInfo from '../../components/confirm_pharmacy/confirmInfo/ConfirmInfo';
import ConfirmForm from '../../components/confirm_pharmacy/comfirmForm/ConfirmForm';

/**
 * Show the comfirm page after selecting the pharmacy 
 * in the pharmacy selection page
 */
const ConfirmPharmacy = (props) => {
    return (
        <div className="confirm-style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader />
            <ConfirmInfo order={props.location.order}/>
            <ConfirmForm order={props.location.order}/>
        </div>
    );
}

export default ConfirmPharmacy;