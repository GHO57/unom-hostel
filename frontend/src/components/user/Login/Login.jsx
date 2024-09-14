import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../features/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';
import { LoginLoader } from '../../../layouts';

const Login = ({ trigger, setTrigger }) => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated, isLoggingIn } = useSelector((state) => state.user);

    const closeLogin = () => {
        setTrigger(false);
    };

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

        dispatch(login(loginForm))
    };

    useEffect(() => {
        if (trigger) {
            setEmail('');
            setPassword('');
        }
    }, [trigger]);

    useEffect(() => {
        if (isAuthenticated && isLoggingIn) {
            setTrigger(false);
            navigate('/');
        }
    }, [isAuthenticated, isLoggingIn]);

    return (
        <>
            {trigger && (
                <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.7)] flex-center backdrop-blur-[6px]">
                    <div className="relative w-auto h-auto rounded-[4px] bg-white shadow-[0_4px_30px_-5px_rgba(0,0,0,0.4)]">
                        <FontAwesomeIcon
                            className="z-[100] absolute top-2 right-2 cursor-pointer hover:text-mediumGray2"
                            onClick={closeLogin}
                            icon={faClose}
                        />
                        <div className="flex">
                            <div className="flex justify-between items-center flex-col bg-primary px-[3rem] py-[4rem] rounded-[4px_0_0_4px]">
                                <h2 className="flex-center w-full select-none cursor-default font-extrabold text-[30px] text-white text-center">
                                    <img className="w-[200px]" src="/genie-logo-white.svg" alt="Logo" />
                                </h2>
                                <p className="max-w-[200px] text-[11px] text-dimWhite">
                                    By logging into your account, you accept{' '}
                                    <Link className="underline hover:text-white" to="/terms-and-conditions">
                                        Terms & Conditions
                                    </Link>{' '}
                                    &{' '}
                                    <Link className="underline hover:text-white" to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="relative px-[3.5rem] py-[5rem] flex flex-col gap-[3rem]">
                                {loading && (
                                    <div className="z-[1000] absolute top-0 right-0 w-full h-full rounded-[0_4px_4px_0] flex-center bg-white">
                                        <LoginLoader />
                                    </div>
                                )}
                                <h3 className="font-semibold text-[20px] text-mediumGray">Login</h3>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="flex flex-col gap-[3rem]">
                                        <div className="relative">
                                            <input
                                                className="input-theme"
                                                type="email"
                                                value={Email}
                                                onChange={handleEmailChange}
                                                required
                                            />
                                            <div className={`placeholder ${Email.length > 0 ? 'active' : ''}`}>Email</div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                className="input-theme"
                                                type="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                            <div className={`placeholder ${password.length > 0 ? 'active' : ''}`}>
                                                Password
                                            </div>
                                        </div>
                                        <div>
                                            {loading ? (
                                                <button disabled className="btn-fill rounded-[3px] text-[15px] w-full">
                                                    Login
                                                </button>
                                            ) : (
                                                <button className="btn-fill rounded-[3px] text-[15px] w-full">Login</button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
