import React from 'react'
import styled from 'styled-components'

const Buttons = ({started, setStarted, startedRef, startGame, clearGrid, randomize, setNumCols, setNumRows, setSpeed, setSpeedText}) => {
    return(
        <BtnContainer>
            <Button onClick={()=>{
        setStarted(!started)
        if (!started){
          startedRef.current = true;
          startGame();
        } 
      }}>{started ? 'Stop' : 'Start'}</Button>
      <Button onClick={()=>{
        setStarted(false)
        clearGrid()

      }}>Clear</Button>
      <Button onClick={()=>{
        setStarted(false)
        randomize()
        
        
        }}>Randomize</Button>
        <Button onClick={()=>{
          setNumCols(20)
          setNumRows(20)
          clearGrid()
        }}>20 x 20</Button>
        <Button onClick={()=>{
          setNumCols(50)
          setNumRows(50)
          clearGrid()
        }}>50 x 50</Button>
        <Button onClick={()=>{
          setSpeed(500)
          setSpeedText('1x speed')
        //   clearGrid()
        }}>1x Speed</Button>
        <Button onClick={()=>{
          setSpeed(250)
          setSpeedText('2x speed')
        //   clearGrid()
        }}>2x Speed</Button>
        <Button onClick={()=>{
          setSpeed(1000)
          setSpeedText('1/2x speed')
        //   clearGrid()
        }}>1/2x Speed</Button>
        </BtnContainer>
    )
}

export default Buttons

const BtnContainer = styled.div`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Button = styled.button`
    padding: 1% 2%;
    border: none;
    font-size: 1rem;
    margin: 4% 2%;
    width: 25%
`;