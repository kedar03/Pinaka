import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';

import './ConfirmForm.css';

import { BASE_API_URL } from '../../utils/constant';

/**
 * Show the user information in the text box and
 * you can edit them if you want for the order.
 *  
 * Pass the order info to the server and save them into the database.
 */
class ConfirmForm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('customer_name'),
            email: localStorage.getItem('customer_email'),
            phone: localStorage.getItem('customer_phone'),
        };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({ name:  e.target.value });
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handlePhone(e) {
        this.setState({ phone: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        //get current timestamp
        const time_zone = moment().tz('Asia/Kolkata');
        const prescription_order_no = time_zone.format('YYYYMMDDHHmmss');
        const order_date = time_zone.format('DD/MM/YYYY');
        const order_time = time_zone.format('HH:mm:ss');

        const formData = new FormData();
         
        formData.append('prescription_order_no', prescription_order_no);
        formData.append('customer_id', this.props.order.customer.customer_id);
        formData.append('customer_name', this.state.name);
        formData.append('customer_email', this.state.email);
        formData.append('customer_phone', this.state.phone);
        formData.append('order_date', order_date);
        formData.append('order_time', order_time);
        formData.append('token_no', this.props.order.customer.token_no);
        formData.append('pharm_name', this.props.order.pharmacy.pharm_name);
        formData.append('pharm_email', this.props.order.pharmacy.pharm_email);
        formData.append('pharm_phone', this.props.order.pharmacy.pharm_phone);
        formData.append('pharm_addr', this.props.order.pharmacy.pharm_addr);

        formData.append('file', this.props.order.presc); //image

        axios.post(BASE_API_URL + '/users/insert_prescription_order', formData)
            .then(res => {
                if (this._isMounted) {
                    this.setState(res.data, () => {
                        if (this.state.isSuccess) {
                            alert("request has been submitted");
                            this.props.history.push("/thanksForOrdering");
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="confirmForm-style">
                <input
                    type="text"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.handleName}
                    className="confirmForm-text"
                    required
                /><br/>
                <input
                    type="text"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={this.handleEmail}
                    className="confirmForm-text"
                    required
                /><br/>
                <input
                    type="text"
                    value={this.state.phone}
                    placeholder="Phone"
                    onChange={this.handlePhone}
                    className="confirmForm-text"
                    required
                /><br/>
                <input type="submit" value="Submit" className="confirmForm-submit" />
            </form>
        );
    }
}

export default withRouter(ConfirmForm);