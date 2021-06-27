import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import LoginInfo from '../login_page/loginForm/LoginInfo';
import { auth, messaging } from '../login_page/loginSocial/Firebase';
import { BASE_API_URL } from '../utils/constant';

/**
 * Including text boxes for the user to sign up.
 * (Name, Phone, Email, Password)
 * 
 * Create an user acount in the firebase.
 * If success, insert a new user into our database.
 */
class SignupForm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNo: '',
            userEmail: '',
            password: '',
            isSuccess: false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(fullName) {
        this.setState ({fullName: fullName});
    }

    handleChangePhone(phoneNo) {
        this.setState ({phoneNo: phoneNo});
    }

    handleChangeEmail(userEmail) {
        this.setState ({userEmail: userEmail});
    }

    handleChangePassword(password) {
        this.setState ({password: password});
    }


    handleSubmit(e) {
        e.preventDefault();
        const name = this.state.fullName;
        const phone= this.state.phoneNo;
        const email = this.state.userEmail;
        const password = this.state.password;

        const user = {
            fullName: name,
            phoneNo: phone,
            userEmail: email,
            password: password,
        };
        
        //create an user in the firebase
        auth.createUserWithEmailAndPassword(user.userEmail, user.password)
            .then(res => {
                //get token for FCM
                const vapidKey = process.env.REACT_APP_VAPIDKEY;
                messaging.getToken({vapidKey: vapidKey})
                    .then(currentToken => {
                        if (currentToken) {
                            const customer = {
                                customer_id: res.user.uid,
                                customer_name: user.fullName,
                                customer_email: user.userEmail,
                                customer_phone: user.phoneNo,
                                customer_password: user.password,
                                customer_token: currentToken,
                            };

                            //Insert an new user to the database
                            axios.post(BASE_API_URL + '/users/signup', customer)
                                .then(res => {
                                    //updater: to get the updated state value immediately
                                    if (this._isMounted) {
                                        this.setState(res.data, () => {
                                            //if success, link back to the login page 
                                            if (this.state.isSuccess) {
                                                alert('Signup Successfully');
                                                this.props.history.push('/login');
                                            }
                                            else
                                                alert('The User has already exist');
                                        });
                                    }
                                })
                                .catch(error => {
                                    alert(error);
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                alert("The email address is already been used.");
            });

        this.setState({
            fullName: '',
            phoneNo: '',
            userEmail: '',
            password: '',
            isSuccess: false,
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
                        placeHolder="FULLNAME" 
                        value={this.state.fullName} 
                        onChange={this.handleChangeName} 
                    />
                </p>
                <p>
                    <LoginInfo  
                        typeName="email"  
                        placeHolder="EMAIL" 
                        value={this.state.userEmail} 
                        onChange={this.handleChangeEmail} 
                    />
                </p>
                <p>
                    <LoginInfo  
                        typeName="text"  
                        placeHolder="PHONE" 
                        value={this.state.phoneNo} 
                        onChange={this.handleChangePhone} 
                    />
                </p>
                <p>
                    <LoginInfo  
                        typeName="password"  
                        placeHolder="PASSWORD" 
                        value={this.state.password} 
                        onChange={this.handleChangePassword} 
                    />
                </p>
                <img src="/assets/signup/icon/Pinaka_Login_Webapp_icon_1.png" alt="icon1" id="image-icon1"/>
                <img src="/assets/signup/icon/Pinaka_Login_Webapp_icon_2.png" alt="icon2" id="image-icon2"/>
                <img src="/assets/signup/icon/Pinaka_Login_Webapp_icon_3.png" alt="icon3" id="image-icon3"/>
                <img src="/assets/signup/icon/Pinaka_Login_Webapp_icon_4.png" alt="icon4" id="image-icon4"/>
                <div id="signup-control">
                    <input id="create-account" type="submit" value="Create Account" ></input>
                </div>
            </form>
        );
    }
}

export default withRouter(SignupForm);