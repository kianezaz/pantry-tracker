import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'

const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLink to="/">
                    <h1>Pantry Tracker</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/">
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
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    );
}

export default Navbar;