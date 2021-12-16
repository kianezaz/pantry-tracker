import React, { useState, useEffect } from 'react';

import AuthService from '../services/authService';

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        setMessage("");
        setSuccess(false);

        AuthService.register(username, email, password)
        .then(res => {
            setMessage(res.data.message);
            setSuccess(true);
        },
            err => {
                const resMessage = (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                    ) ||
                    err.message ||
                    err.toString();

                setMessage(resMessage);
                setSuccess(false);
            }
        );
    }

    return (
        <div>
            {!success && (
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                            required 
                            type="email" 
                            className="form-control"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            required 
                            type="text" 
                            className="form-control"
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                            required 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            )}
            
            {message && (
                <div className="form-group">
                    <div
                        className={ success ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register;