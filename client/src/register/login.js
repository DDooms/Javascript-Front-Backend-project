import React from 'react';

class Login extends React.Component {
    handleRegisterClick = () => {
        this.props.onToggle();
    };

    handleLoginClick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            console.log('Login successful');

        } else {
            const errorMessage = await response.text();
            console.error(`Login failed: ${errorMessage}`);

        }
    };

    render() {
        return (
            <div className="main-page">
                <div className="user-input">
                    <label htmlFor="email">
                        <img src="https://imageshack.com/i/pmoR8X3cp" alt="User Icon" className="user-icon" />
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
                <button type="button" className="sign-in" onClick={this.handleLoginClick}>
                    LOG IN
                </button>
                <br />
                <div className="line-horizontal"></div>
                <p id="no-account">Don't have an account?</p>
                <button type="button" onClick={this.handleRegisterClick} className="sign-up">
                    SIGN UP
                </button>
            </div>
        );
    }
}

export default Login;
