import React from 'react';

import LoginGoogleBase from './LoginGoogleBase';
import LoginFacebookBase from './LoginFacebookBase';

/**
 * Handle login with google account and facebook account.
 */
const LoginSocial = () => {
    return (
        <div className="firebase-login">
            <LoginGoogleBase />
            <LoginFacebookBase />
        </div>
    );
}

export default LoginSocial;