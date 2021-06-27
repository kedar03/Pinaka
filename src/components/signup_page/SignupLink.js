import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The link connects between login page and sign up page.
 */
const SignupLink = () => {
    return (
        <div className="loginPage-link">
            <span><Link to="/login" id="login-link">Login </Link></span>
            <span id="login-dotted-line">| </span>
            <span id="signup-text">Signup</span>
        </div>
    );
}

export default SignupLink;