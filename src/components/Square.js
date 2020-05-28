import React from 'react'


const Square = ({numCols, grid, updateGrid, divWidth, divHeight}) => {
    console.log('grid size', divWidth/numCols)
    return <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, ${divWidth/numCols}px)`, maxWidth: '100%'}}>
    {grid.map((rows, i)=>rows.map((col, j) => <div key={`${i}_${j}`} style={{ height: `${divWidth/numCols}px`, border: '1px solid black', background: grid[i][j] ? 'black' : 'white', margin: 0}} onClick={()=>updateGrid(i,j)}></div>))}
  </div>
}

export default Square