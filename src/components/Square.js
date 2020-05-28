import React from 'react'

const Square = ({numCols, grid, updateGrid}) => {
    return <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
    {grid.map((rows, i)=>rows.map((col, j) => <div key={`${i}_${j}`} style={{width: '20px', height: '20px', border: '1px solid black', background: grid[i][j] ? 'black' : 'white'}} onClick={()=>updateGrid(i,j)}></div>))}
  </div>
}

export default Square