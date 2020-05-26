import React, {useRef, useEffect} from 'react'
import {useAnimation} from '../hooks/useAnimation'

const Animated = () => {

    useEffect(()=>{
        if (canvasRef){
            const canvas = document.getElementById('my-canvas')
            console.log('canvas', canvasRef)
            const context = canvas.getContext('2d');
            const imageData = context.getImageData(0,0,canvas.width, canvas.height)
            const screenBuffer = imageData.data;
            console.log('screenbuffer', imageData)


            context.putImageData(imageData, 0, 0)
            
    
        }
    },[])
    
    const canvasRef = useRef(null);
    
    const doAnimation = (elapsedTime) => {
            console.log('elapsed time:', elapsedTime);
            console.log('current ref', canvasRef.current);
            
    }
    
    const [cancelAnimation] = useAnimation(Date.now(), doAnimation);
    

    return(
        <div>
            <h3>Testing Animations</h3>
            <canvas id='my-canvas' ref={canvasRef} width={500} height={500} style={{background: 'black'}}/>
        </div>

    )
}

export default Animated