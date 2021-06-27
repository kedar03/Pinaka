import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The link connects between login page and sign up page.
 */
const LoginLink = () => {
    return (
        <div className="loginPage-link">
            <span id="login-text">Login </span>
            <span id="login-dotted-line">| </span>
            <span><Link to="/signup" id="signup-link">Signup</Link></span>
        </div>
    );
}

export default LoginLink;