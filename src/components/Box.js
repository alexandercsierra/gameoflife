import React from 'react'

const Box = (props) => {
    
    return (
    <div onClick={()=>props.toggleStatus(props.i, props.j)} style={{margin: '2px', width: '25px', height: '25px', backgroundColor: props.status == 1 ? 'black': 'white'}}>{`i${props.i}, j${props.j}`}</div>
    )
}

export default Box