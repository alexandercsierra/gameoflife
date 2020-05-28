import React from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import party from '../party.mp3'

const Buttons = ({started, setStarted, startedRef, startGame, clearGrid, randomize, setNumCols, setNumRows, setSpeed, setSpeedText, partyMode, setPartyMode}) => {
  

  const [play] = useSound(party)
    return(
        <BtnContainer>
          <BtnDivider>

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
          </BtnDivider>
          <BtnDivider>
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
              setNumCols(100)
              setNumRows(100)
              clearGrid()
            }}>100 x 100</Button>

          </BtnDivider>
          <BtnDivider>
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

          </BtnDivider>
          <BtnDivider>
            <Button style={{width:'40%'}} onClick={()=>{
              setStarted(true)
              startedRef.current = true;
              startGame();
              setPartyMode(!partyMode)
              setSpeed(350)
              randomize()
              play()
            }} disabled={partyMode}>Party Mode 🎉</Button>
          </BtnDivider>
        </BtnContainer>
    )
}

export default Buttons

const BtnContainer = styled.div`
    width: 25%;
    max-width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: rgba(68, 148, 201, .5);
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 1% 2%;
    border: none;
    font-size: 1rem;
    margin: 4% 2%;
    width: 30%
`;

const BtnDivider = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;