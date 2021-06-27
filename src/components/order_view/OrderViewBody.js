import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './OrderViewBody.css';

/**
 * Show the order information which is selected in my orders page.
 */
class OrderViewBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presc_image: '/assets/order_view/p4.png',
            customer_name: '',
            order_date: '',
            order_time: '',
            pharm_name: '',
            pharm_addr: '',
            pharm_phone: '',
        };
    }

    componentDidMount() {
        if (!this.props.order)
            this.props.history.push("/");
        else
            this.setState({
                presc_image: this.props.order.presc_image,
                customer_name: this.props.order.customer_name,
                order_date: this.props.order.order_date,
                order_time: this.props.order.order_time,
                pharm_name: this.props.order.pharm_name,
                pharm_addr: this.props.order.pharm_addr,
                pharm_phone: this.props.order.pharm_phone,
            });
    }

    render() {
        return (
            <div>
                <div className="order_view_subheader_style">
                    <span className="order_view_subheader_text">Order View</span>
                </div>
                <div className="order_view_presc_style">
                    <img src={this.state.presc_image} alt="prescription" className="order_view_presc"/>
                </div>
                <div className="order_view_Info_style">
                    <div>
                        <img src="/assets/order_view/Pinaka_Signup_Webapp_icon_1.png" alt="user_icon" id="order_view_user_icon"/>
                        <span id="order_view_customer_name">{this.state.customer_name}</span>
                    </div>
                    <div>
                        <img src="/assets/order_view/p2.png" alt="date_icon" id="order_view_date_icon"/>
                        <span id="order_view_order_date">{this.state.order_date}</span>
                    </div>
                    <div>
                        <img src="/assets/order_view/p3.png" alt="time_icon" id="order_view_time_icon"/>
                        <span id="order_view_order_time">{this.state.order_time}</span>
                    </div>
                </div>
                <div className="order_view_Info_style">
                    <div>
                        <img src="/assets/order_view/Pinaka_Webapp_Select_Pharmacy_Source_2.png" alt="pharm_icon" id="order_view_pharm_icon"/>
                        <span id="order_view_pharm_name">{this.state.pharm_name}</span>
                    </div>
                    <div>
                        <img src="/assets/order_view/p1.png" alt="location_icon" id="order_view_location_icon"/>
                        <span id="order_view_pharm_addr">{this.state.pharm_addr}</span>
                    </div>
                    <div>
                        <img src="/assets/order_view/Pinaka_Signup_Webapp_icon_3.png" alt="phone_icon" id="order_view_phone_icon"/>
                        <span id="order_view_pharm_phone">{this.state.pharm_phone}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OrderViewBody);