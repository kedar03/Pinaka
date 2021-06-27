import React from 'react';
import { Helmet } from 'react-helmet';

import './MyOrders.css';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import MyOrdersBody from '../../components/my_orders/myOrders_Body/MyOrdersBody';

/**
 * Show all the orders the user has submitted before.
 */
const MyOrders = () => {
    return (
        <div className="my_orders_style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader />
            <MyOrdersBody />
        </div>
    );
}

export default MyOrders;