import './login.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import background from '../assets/grocery-produce.jpg'

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
            history.push({ pathname: "/pantry" });
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

    function onRegister(e) {
        e.preventDefault()
        window.location="/signup"
    }

    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}>

            <div className="form-container">
                <form onSubmit={onSubmit}>
                    <div className="inputs-container">
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
                            <label id="password">Password: </label>
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
                                id="submit-button" 
                                type="submit"
                                className="btn btn-primary"
                                value="Log in"
                            />
                        </div>
                        <button id="register-button" onClick={onRegister}>New user? Sign up</button>
                    </div>
                    
                </form>

            </div>
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