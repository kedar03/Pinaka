import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './ContactUsForm.css';

import { BASE_API_URL } from '../../utils/constant';

/**
 * Fill in name, phone, and message in the textbox.
 * Pass those information to the server for mailing.
 */
class ContactUsForm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            message: '',
        };

        this.handleName =this.handleName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({ name: e.target.value });
    }

    handlePhone(e) {
        this.setState({ phone: e.target.value });
    }

    handleMessage(e) {
        this.setState({ message: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            phone: this.state.phone,
            message: this.state.message
        };

        //sent the data to the server for mailing
        axios.post(BASE_API_URL + '/users/contact_us', user)
            .then(res => {
                alert("Submit successfully.")
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
            })

    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="contact-form-style">
                <div className="contact-form-label-style">
                    <span id="contact-form-label">Enter your Query in the form below and we will get back to you:</span>
                </div>
                <form onSubmit={this.handleSubmit} className="contact-form">
                    <input 
                        type="text"
                        value={this.state.name}
                        placeholder="Name"
                        onChange={this.handleName}
                        className="contact-form-text"
                    /><br/>
                    <input 
                        type="text"
                        value={this.state.phone}
                        placeholder="Phone"
                        onChange={this.handlePhone}
                        className="contact-form-text"
                    /><br/>
                    <input 
                        type="text"
                        value={this.state.message}
                        placeholder="Message"
                        onChange={this.handleMessage}
                        className="contact-form-text"
                    /><br/>
                    <input type="submit" value="Submit" id="contact-form-submit"/>
                </form>
            </div>
        );
    }
}

export default withRouter(ContactUsForm);