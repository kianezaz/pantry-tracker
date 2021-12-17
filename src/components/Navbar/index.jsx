import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'

const Navbar = (props) => {
    if (!props.isLoggedIn) {
        console.log("here");
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
                    <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    );
}

export default Navbar;