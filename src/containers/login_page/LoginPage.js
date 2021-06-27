import React from 'react';
import { Helmet } from 'react-helmet';

import './login.css';

import LoginLogo from '../../components/login_page/LoginLogo';
import LoginLink from '../../components/login_page/LoginLink';
import LoginForm from '../../components/login_page/loginForm/LoginForm';
import LoginSocial from '../../components/login_page/loginSocial/LoginSocial';
import LoginFooter from '../../components/login_page/LoginFooter';

/**
 * Login to our web app
 */
const LoginPage = () => {
    return (
        <div className="login-style">
            <Helmet>
                <style>{'body { background-image: url("/Pinaka_webapp_pics_1.png"); }'}</style>
            </Helmet>
            <LoginLogo />
            <LoginLink />
            <LoginForm />
            <LoginSocial />
            <LoginFooter />
        </div>
    )
}

//<LoginSocial />

export default LoginPage;