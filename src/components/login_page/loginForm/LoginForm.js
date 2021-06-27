import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import LoginInfo from './LoginInfo';
import { auth, messaging } from '../loginSocial/Firebase';
import { BASE_API_URL } from '../../utils/constant';

/**
 * Sign in with the email and password.
 * If this is your first time to login, the verification link will be sent to your email.
 * After click on the link, the user will be able to login to our web app.
 */
class LoginForm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            userEmail: '',
            password: '',
            isExist: false,
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(userEmail) {
        this.setState ({userEmail: userEmail});
    }

    handleChangePassword(password) {
        this.setState ({password: password});
    } 

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.userEmail;
        const password = this.state.password;

        const user = {
            userEmail: email,
            password: password,
        };
        
        auth.signInWithEmailAndPassword(user.userEmail, user.password)
            .then(res => {
                //verify your state
                if (!res.user.emailVerified) {
                    res.user.sendEmailVerification(/*actionCodeSettings*/)
                        .then(() => {
                            alert("Verify Your Email Address\n\n" + 
                                  "Congratulations! You are now registerd with Pinaka successfully.\n" + 
                                  "To verify your email address with us, we have sent a link on your email id.\n" +
                                  "Please click on the link to continue with Pinaka.");
                                                        
                        })
                        .catch(error => {
                            alert("Error on sending the verification mail.")
                        });
                }
                else {
                    const vapidKey = process.env.REACT_APP_VAPIDKEY;
                    messaging.getToken({vapidKey: vapidKey})
                        .then(currentToken => {
                            if (currentToken) {
                                const customer = {
                                    customer_id: res.user.uid,
                                    customer_token: currentToken,
                                    customer_password: user.password,
                                };

                                axios.post(BASE_API_URL + '/users/userDetail', customer)
                                    .then(res => {
                                        if (this._isMounted) {
                                            this.setState({
                                                user: [res.data] //should be array
                                            }, () => {
                                            
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

                }
            })
            .catch(error => {
                alert("The user is not exist.")
            })        

        this.setState({
            userEmail: '',
            password: '',
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
            <form onSubmit={this.handleSubmit} className="login-form-style">
                <p>
                    <LoginInfo  
                        typeName="text"  
                        placeHolder="USERNAME" 
                        value={this.state.userEmail} 
                        onChange={this.handleChangeEmail} />
                </p>
                <p>
                    <LoginInfo  
                        typeName="password" 
                        placeHolder="PASSWORD"  
                        value={this.state.password} 
                        onChange={this.handleChangePassword} />
                </p>
                <img src="/assets/login/icon/Pinaka_Login_Webapp_icon_1.png" alt="icon1" id="login-user-icon"/>
                <img src="/assets/login/icon/Pinaka_Login_Webapp_icon_4.png" alt="icon1" id="login-pw-icon"/>  
                <div id="login-control">
                    <input id="login-submit-button" type="submit" value="Submit" /><br/>
                    <span><Link to="/forgot_password" id="forgot-pwd-text">Forgot Password?</Link></span>
                </div>
            </form>
        );
    }
}

export default withRouter(LoginForm);