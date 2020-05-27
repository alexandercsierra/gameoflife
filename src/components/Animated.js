import React, {useState, useRef, useEffect} from 'react'
import {useAnimation} from '../hooks/useAnimation'
import {Square} from './Square'

const Animated = () => {

    
    const [colors, setColors] = useState({
        main: "black",
        alt: "white"
    })

    const [canvasWidth, setCanvasWidth] = useState(625)
    const [divisor, setDivisor] = useState(Math.sqrt(canvasWidth))
    useEffect(()=>{
        if (canvasRef){
            const canvas = document.getElementById('my-canvas')
            console.log('canvas', canvasRef)
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0,0,canvas.width, canvas.height)
            //2D array with 25 rows and 25 columns
            let masterArr = Array(divisor).fill(null).map((sq, i)=>Array(divisor).fill(null).map((sq, j)=>{
                let square = new Square(0, colors.main, colors.alt, i, j)
                square.status = Math.floor(Math.random()*2)
                square.findColor()
                return square
            }))
            console.log(masterArr)
            
            if(imageData){
                ctx.putImageData(imageData, 0, 0);
                let color;
                
                for (let i=0; i<canvasWidth; i+=divisor){
                    for (let j=0; j<canvasWidth; j+=divisor){
                        masterArr[i/divisor][j/divisor].status == 1 ? masterArr[i/divisor][j/divisor].activeColor = colors.main : masterArr[i/divisor][j/divisor].activeColor = colors.alt
                        ctx.fillStyle = masterArr[i/divisor][j/divisor].activeColor
                        
                        ctx.fillRect(j, i, canvas.width/divisor, canvas.width/divisor);
                        
                    }//end inner for
                }//end outer for

                // for (let i=0; i<500; i+=divisor){
                //     for (let j=0; j<500; j+=divisor){
                //         let curr = masterArr[i/divisor][j/divisor]
                //         if(curr.status == 1){
                //             if (masterArr[curr.btmi][curr.btmj]){
                //                 masterArr[curr.btmi][curr.btmj].activeColor = 'red'
                //             }

                //         } 
                //         ctx.fillStyle = masterArr[i/divisor][j/divisor].activeColor
                        
                //         ctx.fillRect(j, i, canvas.width/divisor, canvas.width/divisor);
                        
                //     }//end inner for
                // }//end outer for

                
            }//end if imageData
        }//end if canvasRef
    },[colors])
    
    const changeColors = (colors) => {
        if (colors.main == 'black'){
            setColors({
                main: 'blue',
                alt: 'green'
            })
        }
        else{
            setColors({
                main: 'black',
                alt: 'white'
            })
        }
        console.log('color', colors.main)
    }
    const canvasRef = useRef(null);
    
    const doAnimation = (elapsedTime) => {
            console.log('elapsed time:', elapsedTime);
            console.log('current ref', canvasRef.current);
            
    }
    
    const [cancelAnimation] = useAnimation(Date.now(), doAnimation);
    

    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
            <h3>Testing Animations</h3>
            <canvas id='my-canvas' ref={canvasRef} width={canvasWidth} height={canvasWidth} style={{background: '#4f4f4f', margin: '4%'}}/>
            <button style={{background: 'white', color: '#1C1C1C', border: 'none', borderRadius: '5px', fontSize: '1.2rem'}} onClick={()=>changeColors(colors)}>Change</button>
        </div>

    )
}

export default Animated