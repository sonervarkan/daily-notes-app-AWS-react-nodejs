// frontend/src/components/LoginForm.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from "../api/authApi";


const LoginForm = () => {
    const [user_email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const { login } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!user_email || !password) {
            setMessage('E-posta ve şifre gereklidir.');
        return;
        }

        try 
        {
            const data = await loginUser({ user_email, password });
            
            
            login(
                data.user,   // {id, name, email}
                data.token   // JWT token
            );

            setMessage('✅ Login Successful');
            } catch (error) {
            const errMsg = error?.response?.data?.message || error.message || String(error);
            setMessage(`❌ Login Error: ${errMsg}`);
            console.error('Login Error:', error);
        }
    };


    return (
        <div class="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={user_email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};


export default LoginForm;