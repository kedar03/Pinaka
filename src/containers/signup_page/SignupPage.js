import React from 'react';
import { Helmet } from 'react-helmet';

import '../login_page/login.css';
import './signup.css';

import LoginLogo from '../../components/login_page/LoginLogo';
import SignupLink from '../../components/signup_page/SignupLink';
import SignupForm from '../../components/signup_page/SignupForm';
import SignupFooter from '../../components/signup_page/SignupFooter';

/**
 * Sign up for the web app
 */
const SignupPage = () => {
    return (
        <div className="login-style">
            <Helmet>
                <style>{'body { background-image: url("/Pinaka_webapp_pics_1.png"); }'}</style>
            </Helmet>
            <LoginLogo />
            <SignupLink />
            <SignupForm />
            <SignupFooter />
        </div>
    );
}

export default SignupPage;