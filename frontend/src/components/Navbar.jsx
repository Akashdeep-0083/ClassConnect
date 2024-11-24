import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a separate CSS file for Navbar styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>ClassConnect</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;