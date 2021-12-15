import axios from 'axios';

const API_URL = 'http://localhost:5000/user/';

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username: username,
        password: password
    })
    .then(res => {
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }

        return res.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username: username,
        email: email,
        password: password
    });
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default { login, logout, register, getCurrentUser };