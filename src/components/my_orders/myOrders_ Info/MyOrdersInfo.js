import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './MyOrdersInfo.css';

/**
 * Display different colors according to their status.
 * If the user clicks the order, it will pass the order information
 * to the order view page.
 */
class MyOrdersInfo extends Component {
    constructor(props) {
        super(props);

        this.handleOrderView = this.handleOrderView.bind(this);
        this.handleOrderStatus = this.handleOrderStatus.bind(this);
        this.handlePharmLength = this.handlePharmLength.bind(this);
    }

    handleOrderView() {
        //push to Order View page
        this.props.history.push({
            pathname: "/order_view",
            order: this.props.obj
        });
    }

    handleOrderStatus() {
        //color determination
        if (this.props.obj.order_status === "Processing")
            return "my_orders_Processing";
        else if (this.props.obj.order_status === "Accepted")
            return "my_orders_Accepted";
        else if (this.props.obj.order_status === "Declined" || this.props.obj.order_status === "Cancelled")
            return "my_orders_Declined";
        else if (this.props.obj.order_status === "Delivered")
            return "my_orders_Delivered";
        else
            return ""; //no style (can add a normal style without color)
    }

    handlePharmLength() {
        const pharm_name = this.props.obj.pharm_name;
        if (pharm_name.length >= 30)
            return pharm_name.substring(0, 30) + "...";
        else
            return pharm_name;
    }


    render() {
        return (
            <div onClick={this.handleOrderView} className="my_orders_info_style">
                <div className={this.handleOrderStatus()}>
                    <span className="my_orders_status_text">{this.props.obj.order_status}</span>
                </div>
                <div className="my_orders_orderDetails_style">
                    <div id="my_orders_orderDetails_no">{this.props.obj.prescription_order_no}</div>
                    <div id="my_orders_orderDetails_date">{this.props.obj.order_date}</div>
                    <div id="my_orders_orderDetails_pharm">{this.handlePharmLength()}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyOrdersInfo);

