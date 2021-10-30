import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
            <Link to="/" className="navbar-brand">Pantry Tracker</Link>
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Pantry Items</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/add" className="nav-link">Add item</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/recipes" className="nav-link">Recipes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;