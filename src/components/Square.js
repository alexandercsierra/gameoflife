import React from 'react'


const Square = ({numRows, numCols, grid, updateGrid, divWidth, divHeight, partyMode}) => {

  const randomColor = () => {
    const hexValues = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
      let hex = "#";
  
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * hexValues.length);
        hex += hexValues[index];
      }
      return hex
  }

  const backgroundColor = (i, j) => {
    if (partyMode){
      return grid[i][j] ? randomColor() : 'transparent'
    } else{
      return grid[i][j] ? 'black' : 'white'
    }
  }


    return <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, ${divWidth/numCols}px)`, maxWidth: '100%'}}>
    {grid.map((rows, i)=>rows.map((col, j) => <div key={`${i}_${j}`} style={{ height: `${divWidth/numRows-2}px`, border: '1px solid black', background: backgroundColor(i, j), margin: 0}} onClick={()=>updateGrid(i,j)}></div>))}
  </div>
}

export default Square


