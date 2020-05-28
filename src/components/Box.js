import React from 'react'

const Box = (props) => {
    
    return (<div style={{margin: '2px', width: '25px', height: '25px', backgroundColor: props.status == 1 ? 'black': 'white'}}></div>)
}

export default Box