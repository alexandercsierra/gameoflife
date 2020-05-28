import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import produce from 'immer'
import Square from './components/Square'
import Buttons from './components/Buttons'
import About from './components/About'
import styled from 'styled-components'
import Nav from './components/Nav'
import {Route} from 'react-router-dom'


const operations = [
  [0,1],
  [0,-1],
  [1,-1],
  [-1,1],
  [1,1],
  [-1,-1],
  [1,0],
  [-1,0],
]


function App() {
  const [divWidth, setDivWidth] = useState(400)
  const [numRows, setNumRows] = useState(40)
  const [numCols, setNumCols] = useState(40)
  const [speed, setSpeed] = useState(500)
  const [speedText, setSpeedText] = useState('1x Speed')
  const [generations, setGenerations] = useState(0)
  const [started, setStarted] = useState(false);
  
  const genRef = useRef(generations)
  genRef.current = generations
  
  const startedRef = useRef(started)
  startedRef.current = started
  
  const numRowsRef = useRef(numRows)
  numRowsRef.current = numRows
  
  const numColsRef = useRef(numCols)
  numColsRef.current = numCols

  const speedRef = useRef(speed)
  speedRef.current = speed


  
  const emptyGrid = ()=>{
    const rows = [];
    for (let i=0; i<numRowsRef.current; i++){
      rows.push(Array.from(Array(numColsRef.current), ()=> 0))
    }
    return rows
  }



  const [grid, setGrid] = useState(()=>emptyGrid())



  const startGame = useCallback(() => {
    console.log('started from game', started)
    if (!startedRef.current){
      console.log('stopped')
      return
    }
    setGenerations(genRef.current + 1)
    setGrid((currGrid)=>{
      return produce(currGrid, gridCopy=>{
       
        for (let i=0; i<numRowsRef.current; i++){
          for (let j=0; j<numColsRef.current; j++){
            let neighbors = 0;

            operations.forEach(([x,y])=>{
              const newI = i + x;
              const newJ = j + y;

              //checking boundaries
              if (newI >= 0 && newI < numRowsRef.current && newJ >=0 && newJ < numColsRef.current){
                //if surrounding cell is alive, will add 1 to neighbors. If 0 will add 0
                neighbors+= currGrid[newI][newJ]
              }

            })

            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][j] = 0
            } else if (currGrid[i][j] == 0 && neighbors === 3){
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    })

    console.log('running the game')
    setTimeout(startGame, speedRef.current)
    

  },[])

  const clearGrid = () => {
    setGrid(()=>emptyGrid())
    setGenerations(0)
  }

  const updateGrid = (i, j) => {
    if(!started){
      const newGrid = produce(grid, gridCopy => {
        gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
      })
      console.log(`i: ${i}, j:${j}`)
      setGrid(newGrid)
    }
  }

  const randomize = () => {
    const rows = [];
    for (let i=0; i<numRows; i++){
      rows.push(Array.from(Array(numCols), ()=> Math.floor(Math.random()*2)))
    }
    setGrid(rows)
    setGenerations(0)
  }


  return (
    <>
    <Nav/>
    <Route exact path="/">
      <Container>
        <h1>Conway's Game of Life</h1>
        <h2>{`Generations: ${generations}`}</h2>
        <h2>{`Speed: ${speedText}`}</h2>
        <div style={{width: divWidth+5, height: divWidth+5, maxWidth: '100%', marginBottom: '4%'}}>
          <Square numRows={numRows} numCols={numCols} grid={grid} updateGrid={updateGrid} divWidth={divWidth} divHeight={divWidth}/>
        </div>
        <Buttons started={started} setStarted={setStarted} startedRef={startedRef} startGame={startGame} clearGrid={clearGrid} randomize={randomize} setNumCols={setNumCols} setNumRows={setNumRows} setSpeed={setSpeed} setSpeedText={setSpeedText}/>
      </Container>
    </Route>
    <Route path="/about">
      <About/>
    </Route>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1C1C1C;
  color: white;
`;
