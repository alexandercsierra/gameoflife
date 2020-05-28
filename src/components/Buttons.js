import React from 'react'

const Buttons = ({started, setStarted, startedRef, startGame, clearGrid, randomize, setNumCols, setNumRows, setSpeed, setSpeedText}) => {
    return(
        <div>
            <button onClick={()=>{
        setStarted(!started)
        if (!started){
          startedRef.current = true;
          startGame();
        } 
      }}>{started ? 'Stop' : 'Start'}</button>
      <button onClick={()=>{
        setStarted(false)
        clearGrid()

      }}>Clear</button>
      <button onClick={()=>{
        setStarted(false)
        randomize()
        
        
        }}>Randomize</button>
        <button onClick={()=>{
          setNumCols(20)
          setNumRows(20)
          clearGrid()
        }}>20 x 20</button>
        <button onClick={()=>{
          setNumCols(50)
          setNumRows(50)
          clearGrid()
        }}>50 x 50</button>
        <button onClick={()=>{
          setSpeed(1000)
          setSpeedText('1x speed')
          clearGrid()
        }}>1x Speed</button>
        <button onClick={()=>{
          setSpeed(500)
          setSpeedText('2x speed')
          clearGrid()
        }}>2x Speed</button>
        <button onClick={()=>{
          setSpeed(2000)
          setSpeedText('1/2x speed')
          clearGrid()
        }}>1/2x Speed</button>
        </div>
    )
}

export default Buttons