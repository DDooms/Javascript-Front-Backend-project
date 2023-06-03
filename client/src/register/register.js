import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            successMessage: '',
        };
    }

    handleBackClick = () => {
        this.props.onToggle();
    };

    handleRegisterClick = async () => {
        const emailValidator = /^[^@]+@[^@]+\.[^.]+$/;

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm-password').value;

        if (username.length < 3) {
            return this.setState({ errorMessage: 'Username must be at least 3 symbols!', successMessage: ''});
        }

        if (!email.match(emailValidator)) {
            return this.setState({ errorMessage: 'Invalid email!', successMessage: ''});
        }

        if (password.length < 8) {
            return this.setState({ errorMessage: 'Password must be at least 8 symbols!', successMessage: ''});
        }

        if (password !== confirm_password) {
            return this.setState({ errorMessage: 'Passwords do not match', successMessage: '' });
        }

        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, confirm_password }),
        });

        if (response.ok) {
            this.setState({ successMessage: 'User registered successfully', errorMessage: '' });
        } else {
            const errorMessage = await response.text();
            this.setState({ errorMessage });
        }
    };

    render() {
        return (
            <div className="main-page">

                <div className="user-input">
                    <label htmlFor="username">
                        <img src="https://imageshack.com/i/pmoR8X3cp" alt="User Icon" className="user-icon" />
                        <div className="line"></div>
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </label>
                </div>
                <div className="user-input">
                    <label htmlFor="email">
                        <img src="https://imageshack.com/i/po92oMvKp" alt="User Icon" className="user-icon" />
                        <div className="line"></div>
                        <input type="email" id="email" name="email" placeholder="Email" />
                    </label>
                </div>
                <div className="password-input">
                    <label htmlFor="password">
                        <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                        <div className="line"></div>
                        <input type="password" id="password" name="password" placeholder="Password" />
                    </label>
                </div>
                <div className="password-input">
                    <label htmlFor="confirm-password">
                        <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                        <div className="line"></div>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" />
                    </label>
                </div>

                {this.state.errorMessage && (
                    <p className="error-message">{this.state.errorMessage}</p>
                )}
                {this.state.successMessage && (
                    <p className="success-message">{this.state.successMessage}</p>
                )}

                <button type="button" className="sign-in" onClick={this.handleRegisterClick}>
                    REGISTER
                </button>
                <br />
                <div className="line-horizontal"></div>
                <button type="button" onClick={this.handleBackClick} className="sign-up">
                    BACK
                </button>
            </div>
        );
    }
}

export default Register;
