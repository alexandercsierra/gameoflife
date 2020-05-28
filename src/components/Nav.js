import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return(
        <NavBar>
            <NavLink className='link' to='/' exact={true}>Home</NavLink>
            <NavLink className='link' to='/about'>About</NavLink>
        </NavBar>
    )
}

export default Nav

const Links = styled(NavLink)`
    text-decoration: none;
    font-size: 1.2rem;
    padding: 1.5% 2%;
    color: white;
    
`;

const NavBar = styled.nav`
    // padding: 1.5%;
    display: flex;
    justify-content: flex-end;
    background: #1C1C1C;
    box-shadow: 0.3em 0.3em 1em rgba(255,255,255,1);
    // margin-bottom: .5%;
`;