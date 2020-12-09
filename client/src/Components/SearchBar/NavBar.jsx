import React from 'react'
import SearchBar from './SearchBar.jsx'
import './NavBar.modules.css'
function NavBar() {
    return (
        <div >
            <nav>
                <ul>

                <li> About</li>
                <li>Catalogue</li>
                <li>Contact</li>
                </ul>
            <SearchBar></SearchBar>
            </nav>
        </div>
    )
}

export default NavBar
