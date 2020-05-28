import React from 'react'
import styled from 'styled-components'

const About = () => {
    return(
        <Container>
            <h1>About</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <p>Conway's Game of Life utilizes a grid which follows particular rules.</p>
                <img src='https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif'/>
                <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">from Wikipedia</a>
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
`;