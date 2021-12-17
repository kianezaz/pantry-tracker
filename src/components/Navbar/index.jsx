import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, NavLink, Bars, NavMenu, NavBtn, SignOutBtn} from './NavbarElements'
import AuthService from '../../services/authService';

const Navbar = (props) => {
    function onSignOut(e) {
        AuthService.logout();
        window.location = "/login";
    }

    if (!props.isLoggedIn) {
        return null;
    }
    return (
        <div>
            <Nav>
                <NavLink to="/">
                    <h1>Pantry Tracker</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/pantry">
                        Home
                    </NavLink>
                    <NavLink to="/add">
                        Add Item
                    </NavLink>
                    <NavLink to="/recipes">
                        Recipes
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <SignOutBtn onClick={onSignOut}>Sign Out</SignOutBtn>
                </NavBtn>
            </Nav>
        </div>
    );
}

export default Navbar;