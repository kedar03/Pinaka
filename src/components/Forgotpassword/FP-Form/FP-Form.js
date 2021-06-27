import React, { Component } from 'react';
import  './FP-Form.css';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../../login_page/loginSocial/Firebase';

/**
 * Send the email by firebase to the email address which you input to the text box.
 * Change the password by the link inside the mail.
 */
class FPForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            sentEmail: false,
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handleResetEmail = this.handleResetEmail.bind(this);
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handleResetEmail(e) {
        e.preventDefault();
        auth.sendPasswordResetEmail(this.state.email)
            .then(() => {
                alert("Reset Password Email has been sent to you. Please check your email");
                this.setState({
                    sentEmail: true,
                });
                setTimeout(() => {
                    this.setState({
                        sentEmail: false,
                    });
                }, 3000);
                this.props.history.push("/login");
            })
            .catch((error) => {
                alert("Error resetting password");
                console.error(error)
            });
    }

    render() {
        return (
            <div className = "FP-Form">
                <div>
                    <form className="FP-Input-style">
                        <input 
                            type="email"
                            placeholder="Email Id"
                            className="Input-Email"
                            onChange={this.handleEmail}
                        /><br/>
                        <button className = "Change-Password-Button" onClick={this.handleResetEmail}>Change Password</button>
                    </form>
                </div>
                <div className="FP-Bottom">
                    <br/>
                    <Link to="/login" style={{ textDecoration: 'none' }}>Go to Login</Link>
                </div>
            </div>
        );
    }
}

/*

return (
        <div className = "FP-Form">
                 
                <p>
                <input type = "email" placeholder="Email Id" className="Input-Email"/></p>
                <p><button className = "Change-Password-Button" onClick={handleResetEmail()}>Change Password</button></p>
               
                <p className="FP-Bottom">
                    <Link to="/login" style = {{textDecoration: 'none'}}>Go to Login</Link>
                </p> 
                
        </div>
    );

*/


export default withRouter(FPForm);