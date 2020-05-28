import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import produce from 'immer'

// const numRows = 50;
// const numCols = 50;


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

  const [numRows, setNumRows] = useState(50)
  const [numCols, setNumCols] = useState(50)
  const [speed, setSpeed] = useState(1000)
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
      <h1>Conway's Game of Life</h1>
      <h2>{`Generations: ${generations}`}</h2>
      <h2>{`Speed: ${speedText}`}</h2>
      <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
        {grid.map((rows, i)=>rows.map((col, j) => <div key={`${i}_${j}`} style={{width: '20px', height: '20px', border: '1px solid black', background: grid[i][j] ? 'black' : 'white'}} onClick={()=>updateGrid(i,j)}></div>))}
      </div>


    </div>
  );
}

export default App;
