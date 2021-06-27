import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone';

import './MedboxBody.css';

import { BASE_API_URL } from '../../utils/constant';
/**
 * Show the description of the medbox and the button for request.
 * 
 * Pass the user information (including location) to the server for mailing. 
 */
class MedboxBody extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!localStorage.getItem('customer_id')) {
            alert("Please login first.");
            this.props.history.push("/login");
        }
        else {
            const time_zone = moment().tz('Asia/Kolkata');
            const date = time_zone.format('YYYY-MM-DD HH:mm:ss')

            const customer = {
                customer_name: localStorage.getItem("customer_name"),
                customer_email: localStorage.getItem("customer_email"),
                customer_phone: localStorage.getItem("customer_phone"),
                glatitude: localStorage.getItem("lat"),
                glongitude: localStorage.getItem("lng"),
                request_for: "Medbox",
                date: date,
                city: localStorage.getItem("city")
            };

            axios.post(BASE_API_URL + '/users/request_pharmacy_by_your_location', customer)
                .then(res => {
                    if (res.data.isSuccess) {
                        alert("request received");
                        this.props.history.push("/");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="medbox-body-style">
                <div className="medbox-banner-style">
                    <span id="medbox-banner">MEDBOX</span>
                </div>
                <div className="medbox-bottom-style">
                    <img src="/assets/medbox/medbox_x_factor_image.jpg" alt="medbox" id="medbox-box-logo"/>
                    <div>
                        <div className="medbox-description-style">
                            <span className="medbox-description-thick">MEDBOX </span>
                            <span className="medbox-description-thin">
                                is a locker-system incorporated in public communities such as apartments, IT parks, 
                                co-working spaces, metro depots, etc., that ensures the secure delivery of medications, You
                                can order medicines from your nearest pharmacy, and the pharmacy guy would deliver the 
                                package to the Medbox near you. 
                            </span>
                            <span className="medbox-description-thick"> MEDBOX </span>
                            <span className="medbox-description-thin">
                                consumers can retrieve their order from the 
                                locker by feeding in an OTP on the locker screen, which would be sent to their personal 
                                mobile devices.
                            </span>
                        </div>
                        <div onClick={this.handleClick} id="medbox-select-button">
                            <span id="medbox-select-button-text">
                                SELECT NEAREST MEDBOX
                            </span>
                            <img src="/assets/medbox/p4.png" alt="shop" id="medbox-shop-logo"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MedboxBody);