import React from 'react'
import SearchBar from './SearchBar.jsx'
import './NavBar.modules.css'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div >
            <nav>
                <ul>

                <li> About</li>
                <li > <Link to='/catalogue' style={{ textDecoration: 'none', color: 'white' }}>Catalogue</Link></li>
                <li>Contact</li>
                </ul>
            <SearchBar></SearchBar>
            </nav>
        </div>
    )
}

export default NavBar
