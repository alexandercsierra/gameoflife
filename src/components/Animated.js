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
            if(imageData){
                makeVerticalLines(imageData, ctx)
                makeHorizontalLines(imageData, ctx)
                makeBlackSquare(imageData, ctx)
            }
            
            
        }
    },[])
    
    const makeVerticalLines = (imageData, context) => {
            let data = imageData.data
            console.log('data', data)
            let numPixels = data.length/4
            for (let i=0; i< numPixels; i +=25){
                data[i*4 + 3] = 255;
            }
            
        context.putImageData(imageData, 0, 0);

    }

    const makeHorizontalLines = (imageData, context) => {
            let data = imageData.data
            console.log('data', data)
            let numPixels = data.length/500
            for (let i = 10000; i< 500000; i+=10000){

                for (let j=i; j< i+500; j++ ){
                    data[j*4+3] = 255;
                }
            }
            
        context.putImageData(imageData, 0, 0);

    }

    const makeBlackSquare = (imageData, context) => {
        // let data = imageData.data
        // let numPixels = data.length/40000
        // for (let i=0; i< numPixels; i++){
        //     data[i*4+3] = 255;

        // }

        context.beginPath();
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();

        context.putImageData(imageData, 0, 0);
    }
    
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