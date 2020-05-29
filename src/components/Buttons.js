import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import party from '../partyshort.ogg'

const Buttons = ({generations, speedText, started, setStarted, startedRef, startGame, clearGrid, randomize, setNumCols, setNumRows, setSpeed, setSpeedText, partyMode, setPartyMode}) => {


  useEffect(()=>{
    if(partyMode){
      setIsDisabled(true)
    } else{
      setIsDisabled(false)
    }
    
  },[partyMode])


  
  const [isDisabled, setIsDisabled] = useState(false)
  const [canParty, setCanParty] = useState(false)
  const [play, {pause}] = useSound(party)
    return(
        <BtnContainer>
          
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <h2>{`Generations: ${generations}`}</h2>
            <h2>{`Speed: ${speedText}`}</h2>

          </div>
          <BtnDivider>

            <Button disabled={isDisabled} onClick={()=>{
        setStarted(!started)
        if (!started){
          startedRef.current = true;
          startGame();
        } 
      }}>{started ? 'Stop' : 'Start'}</Button>
      <Button disabled={isDisabled} onClick={()=>{
        setStarted(false)
        clearGrid()

      }}>Clear</Button>
      <Button disabled={isDisabled} onClick={()=>{
        setStarted(false)
        randomize()
        
        
        }}>Randomize</Button>
          </BtnDivider>
          <BtnDivider>
            <Button disabled={isDisabled} onClick={()=>{
              setNumCols(20)
              setNumRows(20)
              clearGrid()
            }}>20 x 20</Button>
            <Button disabled={isDisabled} onClick={()=>{
              setNumCols(50)
              setNumRows(50)
              clearGrid()
            }}>50 x 50</Button>
            <Button disabled={isDisabled} onClick={()=>{
              setNumCols(75)
              setNumRows(75)
              clearGrid()
            }}>75 x 75</Button>

          </BtnDivider>
          <BtnDivider>
            <Button disabled={isDisabled} onClick={()=>{
              setSpeed(500)
              setSpeedText('1x speed')
            //   clearGrid()
            }}>1x Speed</Button>
            <Button disabled={isDisabled} onClick={()=>{
              setSpeed(250)
              setSpeedText('2x speed')
            //   clearGrid()
            }}>2x Speed</Button>
            <Button disabled={isDisabled} onClick={()=>{
              setSpeed(1000)
              setSpeedText('1/2x speed')
            //   clearGrid()
            }}>1/2x Speed</Button>

          </BtnDivider>
          <BtnDivider>
            <Button disabled={isDisabled} style={{width:'40%'}} onClick={()=>{
              setStarted(true)
              startedRef.current = true;
              startGame();
              setPartyMode(!partyMode)
              setSpeed(350)
              randomize()
              play()
            }} disabled={partyMode}>Party Mode 🎉</Button>
            <Button onClick={()=>{
              setStarted(false)
              startedRef.current = false;
              setPartyMode(false)
              pause()
            }}>Stop Partying</Button>
          </BtnDivider>
        </BtnContainer>
        // </div>
    )
}

export default Buttons

const BtnContainer = styled.div`
    width: 100%;
    max-width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: rgba(68, 148, 201, .5);
    border-radius: 5px;

    @media(max-width: 1400px){
      justify-content: center;
      // align-items: center;
      height: 285px;
      
    }
`;

const Button = styled.button`
    padding: 1% 2%;
    border: none;
    font-size: 1rem;
    margin: 4% 2%;
    width: 30%;
    
    @media(max-width: 1400px){
      margin: 1%;
      width: 20%; 
      
    }


`;

const BtnDivider = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;


`;