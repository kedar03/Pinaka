import React from 'react';
import { Helmet } from 'react-helmet';

import './OrderView.css';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import OrderViewBody from '../../components/order_view/OrderViewBody';

/**
 * Receive the order information from my orders page 
 * and display it.
 * 
 * @param {*} props 
 */
const OrderView = (props) => {
    return (
        <div className="order_view_style">
            <Helmet>
                <style>{'body { background-color: #e7e5e5; }'}</style>
            </Helmet>
            <DashboardHeader />
            <OrderViewBody order={props.location.order} />
        </div>
    );
}

export default OrderView;