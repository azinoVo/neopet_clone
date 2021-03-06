import React from 'react';
import { NavLink } from 'react-router-dom';

const GameTabs = () => {
         return (
            <>
            <ul className='mainTab'>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/character">Character</NavLink></li>
                <li><NavLink to="/inventory">Inventory</NavLink></li>
                <li><NavLink to="/shop">Shop</NavLink></li>
                <li><NavLink to="/main">Main Garden</NavLink></li>
                <li><NavLink to="/orchard">Orchard</NavLink></li>
                {/* <li><NavLink to="/hanging">Hanging Garden</NavLink></li> */}
                <li><NavLink to="/forest">Forest</NavLink></li>
                {/* <li><NavLink to="/sculpture">Sculpture Garden</NavLink></li> */}
            </ul>
            </>
        );
}

export default GameTabs;