import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return(
        <NavBar>
            <div style={{width: '50%'}}>
                <H1>Conway's Game of Life</H1>
            </div>
            <LinkDiv>
                <NavLink className='link' to='/' exact={true}>Home</NavLink>
                <NavLink className='link' to='/about'>About</NavLink>
            </LinkDiv>
        </NavBar>
    )
}

export default Nav

const LinkDiv = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end

`;

const NavBar = styled.nav`
    // padding: 1.5%;
    display: flex;
    justify-content: space-around;
    background: #1C1C1C;
    box-shadow: 0.3em 0.3em 1em rgba(255,255,255,1);
    // margin-bottom: .5%;
`;

const H1 = styled.h1`
    color: white;
    @media(max-width: 550px){
        font-size: 1.2rem;
        padding-left: 15px;
    }

    @media(max-width: 450px){
        font-size: 1rem;
        padding-left: 10px;
    }
`;