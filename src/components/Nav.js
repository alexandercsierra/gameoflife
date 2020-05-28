import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return(
        <NavBar>
            <Links to='/' exact={true}>Home</Links>
            <Links to='/about'>About</Links>
        </NavBar>
    )
}

export default Nav

const Links = styled(NavLink)`
    text-decoration: none;
    font-size: 1.2rem;
    padding: 0 2%;
    color: white;
`;

const NavBar = styled.nav`
    display: flex;
    justify-content: flex-end;
    background: #1C1C1C
`;