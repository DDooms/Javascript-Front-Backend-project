import React from 'react';

class Register extends React.Component {
    handleBackClick = () => {
        this.props.onToggle();
    };

    handleRegisterClick = async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm-password').value;

        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, confirm_password }),
        });

        if (response.ok) {
            console.log('User registered successfully');

        } else {
            const errorMessage = await response.text();
            console.error(`Registration failed: ${errorMessage}`);

        }
    };

    render() {
        return (
            <div className="main-page">
                <form id="form">
                    <div className="username-input">
                        <label htmlFor="username">
                            <img src="https://imageshack.com/i/pmoR8X3cp" alt="User Icon" className="user-icon" />
                            <div className="line"></div>
                            <input type="text" id="username" name="username" placeholder="Username" maxLength="20" />
                        </label>
                    </div>
                    <div className="user-input">
                        <label htmlFor="email">
                            <img src="https://imageshack.com/i/po92oMvKp" alt="Mail Icon" className="mail-icon" />
                            <div className="line"></div>
                            <input type="email" id="email" name="email" placeholder="Email" maxLength="40" />
                        </label>
                    </div>
                    <div className="password-input">
                        <label htmlFor="password">
                            <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                            <div className="line"></div>
                            <input type="password" id="password" name="password" placeholder="Password" minLength="6" maxLength="30" />
                        </label>
                    </div>
                    <div className="confirm-password-input">
                        <label htmlFor="confirm-password">
                            <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                            <div className="line"></div>
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" maxLength="30" />
                        </label>
                    </div>
                    <div className="line-horizontal"></div>
                    <button type="button" className="sign-up" onClick={this.handleRegisterClick}>
                        REGISTER
                    </button>
                    <button type="button" onClick={this.handleBackClick} className="back">
                        BACK
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;
