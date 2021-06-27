import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './ConfirmInfo.css';

/**
 * Display the prescription and the pharmacy's information
 * according to the pharmacy you chose.
 */
class ConfirmInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pharm_name: '',
            pharm_addr: '',
            presc: '/assets/confirm_pharmacy/p_2.png',
            presc_style: 'confirmInfo-logo'
        };
    }

    componentDidMount() {
        if (!this.props.order)
            this.props.history.push("/");
        else
            this.setState({
                pharm_name: this.props.order.pharmacy.pharm_name,
                pharm_addr: this.props.order.pharmacy.pharm_addr,
                presc: sessionStorage.getItem("presc_image"),
                presc_style: "confirmInfo-presc",
            });
    }

    render() {
        return (
            <div className="confirmInfo-style">
                <div className="confirmInfo-logo-style">
                    <span className="confirmInfo-subheader">Confirm Pharmacy</span><br/>
                    <img src={this.state.presc} alt="pharmacy_logo" className={this.state.presc_style}/>
                </div>
                <div className="confirmInfo-contact-style">
                    <div>
                        <img src="/assets/confirm_pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_2.png" alt="pharmacy_icon" className="confirmInfo_pharmacy_icon"/>
                        <span className="confirmInfo-pharmacyName">{this.state.pharm_name}</span>
                    </div>
                    <div>
                        <img src="/assets/confirm_pharmacy/p1.png" alt="marker_icon" className="confirmInfo_marker_icon"/>
                        <span className="confirmInfo-pharmacyAddr">{this.state.pharm_addr}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ConfirmInfo);