import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

import { doSignInWithFacebook, messaging } from './Firebase';
import { BASE_API_URL } from '../../utils/constant';

/**
 * Sign in with facebook account.
 * If it already exists, update some neccesary information to the database;
 * otherwise, sign up for the account.
 * 
 * Redirect to the dashboard page after the process above.
 */
class LoginFacebookBase extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLogin: false,
        };

        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    handleFacebookLogin(e) {
        doSignInWithFacebook()
            .then(result => {
                const vapidKey = process.env.REACT_APP_VAPIDKEY;
                messaging.getToken({vapidKey: vapidKey})
                    .then(currentToken => {
                        if (currentToken) {
                            //create a customer object
                            const customer = {
                                customer_id: result.user.uid,
                                customer_name: result.user.displayName,
                                customer_email: result.user.email,
                                customer_phone: '',
                                customer_password: '',
                                customer_token: currentToken,
                            };
                            
                            axios.post(BASE_API_URL + '/users/userDetail', customer)
                                .then(res => {
                                    if (this._isMounted) {
                                        this.setState({
                                            user: [res.data]
                                        }, () => {
                                            //do signup if not already exist
                                            if (res.data.length === 0) {
                                                axios.post(BASE_API_URL + '/users/signup', customer)
                                                    .then(res => {
                                                        this.setState(res.data, () => {
                                                            if (this.state.isSuccess) {
                                                                localStorage.setItem('customer_id', customer.customer_id);
                                                                localStorage.setItem('customer_token', customer.customer_token);
                                                                localStorage.setItem('customer_name', customer.customer_name);
                                                                localStorage.setItem('customer_email', customer.customer_email);
                                                                localStorage.setItem('customer_phone', customer.customer_phone);
                                                                alert('Welcome to Pinaka!!!');
                                                                this.props.history.push('/');
                                                            }
                                                            else
                                                                alert('Error with sign up the user in the database.');
                                                        });
                                                    })
                                                .catch(error => {
                                                    alert(error);
                                                    console.log(error);
                                                });
                                            }
                                            else {
                                                this.state.user.map((data, i) => {
                                                    //set userEmail as a info for looking up the database's data
                                                    localStorage.setItem('customer_id', customer.customer_id);
                                                    localStorage.setItem('customer_token', customer.customer_token);
                                                    localStorage.setItem('customer_name', data.customer_name);
                                                    localStorage.setItem('customer_email', data.customer_email);
                                                    localStorage.setItem('customer_phone', data.customer_phone);
                                                
                                                    return localStorage;
                                                });

                                                alert('Welcome to Pinaka!!!');
                                                this.props.history.push('/');
                                            }
                                        });
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    alert("The user is not exist.")
                })
                
        e.preventDefault();
    }
    
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    

    render() {
        //facebook icon
        library.add(faFacebookF);

        return (
            <div>
            {
                this.state.isLogin ?
                (   
                    <div className="facebook-login">
                        <button onClick={this.handleSignOut} id="facebook-login-button">
                            <span id="facebook-login-text">Sign Out</span>
                        </button><br/>
                        <FontAwesomeIcon icon={faFacebookF} id="facebook-login-icon"/>
                    </div>
                ) :
                (
                    <div className="facebook-login">
                        <button onClick={this.handleFacebookLogin} id="facebook-login-button">
                            <span id="facebook-login-text">Login with Facebook</span>
                        </button><br/>
                        <FontAwesomeIcon icon={faFacebookF} id="facebook-login-icon"/>
                    </div>
                )
            }
            </div>
        );
    }
}

export default withRouter(LoginFacebookBase);