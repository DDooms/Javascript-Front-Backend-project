import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            setSuccessMessage('Login successful');
            setErrorMessage('');

            setTimeout(() => {
                navigate('/main');
            }, 2000);
        } else {
            const errorMessage = await response.text();
            setErrorMessage(errorMessage);
        }
    };

    return (
        <div className="main-page">
            <div className="user-input">
                <label htmlFor="email">
                    <img src="https://imageshack.com/i/pmoR8X3cp" alt="User Icon" className="user-icon" />
                    <div className="line"></div>
                    <input type="email" id="email" name="email" placeholder="Email"
                           value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div className="password-input">
                <label htmlFor="password">
                    <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                    <div className="line"></div>
                    <input type="password" id="password" name="password" placeholder="Password"
                           value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button type="button" className="sign-in" onClick={handleLoginClick}>
                LOG IN
            </button>
            <br />
            <div className="line-horizontal"></div>
            <p id="no-account">Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="sign-up">
                SIGN UP
            </button>
        </div>
    );
}

export default Login;