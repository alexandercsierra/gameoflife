import React from 'react'
import styled from 'styled-components'

const About = () => {
    return(
        <Container>
            <h1>About</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Para>Conway's Game of Life was born from the mind of John Conway, a British mathematicion in 1970. It is said to be a 'zero player' game, since once started, it requires no further input to run. </Para>
                <Para>The game of life is made up of cellular automata, or cells within a grid that each hold a finite state. Each cell is affected by it's surrounding cells, and will follow a specific ruleset to advance the game to the next frame or generation. In this implementation, a cell is denoted as being alive if it has a darkened (black) color, and dead if it is has a lighter (white) color.</Para>
                <Para>The rules which govern the life and death of each cell are as follows:</Para>
                <Ul>
                    <li>If a cell is itself alive, and has either 2 or 3 live neighbors, it will live to the next generation</li>
                    <li>A live cell that does not meet the above criterion will die</li>
                    <li>A dead cell with 3 live neighbors is reborn in the next generation</li>
                    
                </Ul>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <p>Examples of possible formations:</p>
                    <ImgDiv>
                        <img style={{maxWidth: '100%'}} src='https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif'/>
                    </ImgDiv>
                    <a style={{color: 'dodgerblue', textDecoration:'none'}} href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">from Wikipedia</a>
                </div>
            </div>
        </Container>
    )
}

export default About

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1C1C1C;
  color: white;
  height: 100vh;
  padding-bottom: 30%;
`;

const Para = styled.p`
    padding: 0 15%; 
`;

const Ul = styled.ul`
    margin-left: 15%;
`;

const ImgDiv = styled.div`
    @media(max-width: 600px){
        width: 90%;
    }
`;