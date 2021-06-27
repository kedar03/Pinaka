import React from 'react';
import { Helmet } from 'react-helmet';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import User from '../../components/my_account/User';

import './MyAccount.css';

/**
 * Show the user's account information and 
 * editable for name and phone.
 */
const MyAccount = () => {
    return (
        <div className="my_account_style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader />
            <User />
        </div>
    );
}

export default MyAccount;