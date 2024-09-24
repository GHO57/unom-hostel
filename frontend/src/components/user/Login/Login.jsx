import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../features/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';
import { LoginLoader } from '../../../layouts';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated, isLoggingIn } = useSelector((state) => state.user);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginForm = new FormData();
        loginForm.set('email', Email);
        loginForm.set('password', password);
        dispatch(login(loginForm));
    };

    useEffect(() => {
        if (isAuthenticated && isLoggingIn) {
            navigate('/');
        }
    }, [isAuthenticated, isLoggingIn]);

    return (
        <div className="flex-center w-full h-full bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-lg font-semibold">Login</h3>
                {loading && <LoginLoader />}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="input-theme w-full"
                            type="email"
                            value={Email}
                            onChange={handleEmailChange}
                            required
                        />
                        <label className="placeholder">Email</label>
                    </div>
                    <div className="mb-4">
                        <input
                            className="input-theme w-full"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label className="placeholder">Password</label>
                    </div>
                    <button type="submit" className="btn-fill w-full">
                        Login
                    </button>
                    {error && <p className="text-red-500">{error.message}</p>}
                </form>
                
            </div>
        </div>
    );
};

export default Login;
