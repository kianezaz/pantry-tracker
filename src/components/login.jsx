import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthService from '../services/authService';

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    let history = useHistory();

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        AuthService.login(username, password)
        .then(res => {
            history.push({
                pathname: "/pantry",
                state: {
                    userId: res.id
                }
            });
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
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
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

            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
          )}
        </div>
    )
}

export default Login;