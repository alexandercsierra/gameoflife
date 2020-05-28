import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import produce from 'immer'

const numRows = 50;
const numCols = 50;


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

  const [grid, setGrid] = useState(()=>{
    const rows = [];
    for (let i=0; i<numRows; i++){
      rows.push(Array.from(Array(numCols), ()=> 0))
    }
    return rows
  })

  const [started, setStarted] = useState(false);

  const startedRef = useRef(started)
  startedRef.current = started

  const startGame = useCallback(() => {
    console.log('started from game', started)
    if (!startedRef.current){
      console.log('stopped')
      return
    }

    setGrid((currGrid)=>{
      return produce(currGrid, gridCopy=>{
       
        for (let i=0; i<numRows; i++){
          for (let j=0; j<numCols; j++){
            let neighbors = 0;

            operations.forEach(([x,y])=>{
              const newI = i + x;
              const newJ = j + x;

              //checking boundaries
              if (newI >= 0 && newI < numRows && newJ >=0 && newJ < numCols){
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
    setTimeout(startGame, 1000)

  },[])



  const updateGrid = (i, j) => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
    })

    setGrid(newGrid)
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
      <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
        {grid.map((rows, i)=>rows.map((col, j) => <div key={`${i}_${j}`} style={{width: '20px', height: '20px', border: '1px solid black', background: grid[i][j] ? 'black' : 'white'}} onClick={()=>updateGrid(i,j)}></div>))}
      </div>


    </div>
  );
}

export default App;
