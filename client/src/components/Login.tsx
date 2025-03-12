//imports 
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const login = authContext?.login;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (login) {
                await login(email, password);
            } else {
                setError('Login function is not available');
            }
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;