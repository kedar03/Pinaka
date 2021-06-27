import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './User.css';

import { BASE_API_URL } from '../utils/constant';

/**
 * Display the user's account information and editable for name and phone.
 * Update the user information to the database when the user leave this page.
 */
class User extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            email: '',
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSetName = this.handleSetName.bind(this);
        this.handleSetPhone = this.handleSetPhone.bind(this);

    }

    handleUpdate(e) {
        e.preventDefault();

        const userInfo = {
            customer_name: this.state.name,
            customer_phone: this.state.phone,
            customer_id: localStorage.getItem('customer_id')
        };
    
        axios.post(BASE_API_URL + '/users/updateInfo', userInfo)
            .then(res => {
                localStorage.setItem("customer_name", this.state.name);
                localStorage.setItem("customer_phone", this.state.phone);
                alert("The account information is updated!");
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSetName(e) {
        this.setState({ 
            name: e.target.value,
        });
    }

    handleSetPhone(e) {
        this.setState({ 
            phone: e.target.value,
        });
    }

    //fetch data from database everytime it refresh the page or jumo into the page
    componentDidMount(){
        if (!localStorage.getItem('customer_id')) {
            alert("Please login first.");
            this.props.history.push("/login");
        }

        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                name: localStorage.getItem('customer_name'),
                phone: localStorage.getItem('customer_phone'),
                email: localStorage.getItem('customer_email'),
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="user_style">
                <div className="user_subheader">
                    <span id="user_subheader_text">Account Details</span>
                </div>
                <div className="userInfo_style">
                    <form className="userInfo_details">
                        <img src="/assets/my_account/Pinaka_Signup_Webapp_icon_1.png" alt="name" id="user_name_icon" />
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleSetName}
                            id="user_name_text"
                        />
                    </form>
                    <form className="userInfo_details">
                        <img src="/assets/my_account/Pinaka_Signup_Webapp_icon_3.png" alt="phone" id="user_phone_icon" />
                        <input
                            type="text"
                            value={this.state.phone}
                            onChange={this.handleSetPhone}
                            id="user_phone_text"
                        />
                    </form>
                    <div className="userInfo_details">
                        <img src="/assets/my_account/Pinaka_Signup_Webapp_icon_2.png" alt="email" id="user_email_icon" />
                        <span id="user_email_text">{this.state.email}</span>
                    </div>
                    <button onClick={this.handleUpdate} id="user_update_button" >Update</button>
                </div>  
            </div>
            
        );
    }
}

export default withRouter(User);