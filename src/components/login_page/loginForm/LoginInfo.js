import React, { Component } from 'react';

/**
 * text box for the login page (signup page)
 */
class LoginInfo extends Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }


    render() {
        return (
            <input 
                placeholder={this.props.placeHolder}
                type={this.props.typeName}
                value={this.props.value} 
                onChange={this.handleChange}
                className="login-textBox"
                required
            />
        );
    }
}

export default LoginInfo;