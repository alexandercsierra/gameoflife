import React, {useState, useCallback, useRef, useEffect} from 'react';
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

  const [divWidth, setDivWidth] = useState(700)
  const [numRows, setNumRows] = useState(50)
  const [numCols, setNumCols] = useState(50)
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  //listens for window resize to set above state. 
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    if (dimensions.width <= 900){
      setDivWidth(500)
    } else if (dimensions.width <= 550){
      setNumRows(20)
      setNumCols(20)
      setDivWidth(250)
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
    },[])




  const [speed, setSpeed] = useState(100)
  const [speedText, setSpeedText] = useState('1x Speed')
  const [generations, setGenerations] = useState(0)
  const [started, setStarted] = useState(false);
  const [partyMode, setPartyMode] = useState(false)
  
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
    if (!startedRef.current){
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
      setGrid(newGrid)
    }
  }

  const randomize = () => {
    const rows = [];
    for (let i=0; i<numRows; i++){
      rows.push(Array.from(Array(numCols), ()=> {
        let random = Math.random()
        return random >= .9 ? 1 : 0
      }))
    }
    setGrid(rows)
    setGenerations(0)
  }


  const audioRef = useRef('green')
  audioRef.current = 'green'


  const GridContainer = styled.div`
  width: ${divWidth + 5};
  height: ${divWidth + 5};
  max-width: 100%;
  margin-bottom: 4%;

  @media(max-width: 500px){
    width: ${divWidth-5};
    height: ${divWidth-5};
  }

`;

  return (
    <>
    <Nav/>
    <Route exact path="/">
      <Container>
        {/* <h1>Conway's Game of Life</h1> */}
        {/* <h2>{`Generations: ${generations}`}</h2>
        <h2>{`Speed: ${speedText}`}</h2> */}

        <GameContainer>

          {/* <div style={{width: divWidth+5, height: divWidth+5, maxWidth: '100%', marginBottom: '4%'}}> */}
          <GridContainer>

            <Square numRows={numRows} numCols={numCols} grid={grid} updateGrid={updateGrid} divWidth={divWidth} divHeight={divWidth} partyMode={partyMode}/>
          </GridContainer>
          {/* </div> */}
          <BtnContainer>
            <Buttons generations={generations} speedText={speedText} partyMode={partyMode} setPartyMode={setPartyMode} started={started} setStarted={setStarted} startedRef={startedRef} startGame={startGame} clearGrid={clearGrid} randomize={randomize} setNumCols={setNumCols} setNumRows={setNumRows} setSpeed={setSpeed} setSpeedText={setSpeedText}/>
          </BtnContainer>
        </GameContainer>

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



const GameContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  align-items: center;
  padding-top: 4%;
  padding-bottom: 5%;

  @media(max-width: 1400px){
    flex-direction: column;
  }
  @media(max-width: 550px){
    width: 100%;
  }

`;

const BtnContainer = styled.div`
  width: 40%;

  @media(max-width: 1400px){
    width: 80%;
  }

  @media(max-width: 900px){
    width: 100%;
  }
`;
