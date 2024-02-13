import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UserDetailsForm from './UserDetailsForm/UserDetailsForm';
import './userauth.css';


const UserAuth = () => {
  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { cognitoUser, signIn, signOut } = useAuth();

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    console.log('password reset email function fired');
  }

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
    console.log('login function fired');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleCancelError = () => {
    setError('');
  }

  const handleSendVerificationEmail = () => {
    console.log('verification email function fired');
  }

  const handleToggleView = (view) => {
    setView(view);
    setError('');
  }

  return (
    <div className="auth-wrapper">
      <div className='error-container'>
        {error && <ErrorMessage error={error} cancelError={handleCancelError} />}
      </div>
      <div className="auth-container">
        {view === 'login' && (
          <div className="fields-container">
            <form className="login" onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className='input-container'>
                <i className="fas fa-envelope"></i>
                <input id="email" type="email" placeholder="Your Email Address" value={email} onChange={handleChange} name="email" required />
              </div>

              <div className='input-container'>
                <i className="fas fa-lock"></i>
                <input id="password" type="password" placeholder="Your Password" value={password} onChange={handleChange} name="password" required />
              </div>

              <div className='btn-container'>
                <button className='sub-btn' type="submit">Login</button>
                <button className='forgot-pass-btn' onClick={() => handleToggleView('forgot')}>Forgot Password?</button>
                <button onClick={() => handleToggleView('register')}>Not a member? <strong>Join now</strong></button>
              </div>
            </form>
          </div>
        )}

        {view === 'forgot' && (
          <form className="forgotPassForm" onSubmit={handleSendResetEmail}>
            {error && <ErrorMessage error={error} cancelError={handleCancelError} />}
            <p>Please submit the email address associated with your account</p>
            <input type="email" placeholder="Email" value={email} onChange={handleChange} name="email" />
            <div className='btn-container'>
              <button type="submit">Send Password Reset</button>
              <button onClick={() => handleToggleView('login')}>Back to Login</button>
            </div>
          </form>
        )}

        {view === 'register' && (
          <UserDetailsForm handleToggle={() => handleToggleView('login')} />
        )}
      </div>
    </div>
  );
}

export default UserAuth;
