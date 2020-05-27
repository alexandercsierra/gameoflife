import React, {useRef, useEffect} from 'react'
import {useAnimation} from '../hooks/useAnimation'

const Animated = () => {

    useEffect(()=>{
        if (canvasRef){
            const canvas = document.getElementById('my-canvas')
            console.log('canvas', canvasRef)
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0,0,canvas.width, canvas.height)
            console.log('width', canvas.width)
            //2D array with 25 rows and 25 columns
            let masterArr = Array(25).fill(null).map(i=>Array(25).fill(null).map(i=>Math.floor(Math.random()*2)))
            console.log(masterArr)
            
            if(imageData){
                ctx.putImageData(imageData, 0, 0);
                // ctx.fillS tyle = "#FF0000";
                // ctx.fillRect(0, 0, canvas.width/25, canvas.width/25);
                let color = "000"
                for (let i=0; i<500; i+=25){
                    for (let j=0; j<500; j+=25){
                        masterArr[i/25][j/25] == 1 ? color = "#FF0000" : color = "#000"
                        ctx.fillStyle = color
                        ctx.fillRect(j, i, canvas.width/25, canvas.width/25);
                        
                    }

                }
            }
            
            
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
            <canvas id='my-canvas' ref={canvasRef} width={500} height={500} style={{background: 'white', border: '1px solid red'}}/>
        </div>

    )
}

export default Animated