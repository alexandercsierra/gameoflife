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
    let masterArr = Array(divisor).fill(null).map((sq, i)=>Array(divisor).fill(null).map((sq, j)=>{
        let square = new Square(0, colors.main, colors.alt, i, j)
        square.status = Math.floor(Math.random()*2)
        return square
    }))
    
    console.log(masterArr)
    useEffect(()=>{
        if (canvasRef){
            const canvas = document.getElementById('my-canvas')
            console.log('top', canvasRef.current.getBoundingClientRect().top)
            console.log('left', canvasRef.current.getBoundingClientRect().left)
            canvas.addEventListener('click', (e)=>{
                let top = canvasRef.current.getBoundingClientRect().top
                let left = canvasRef.current.getBoundingClientRect().left
                let x = e.clientX;
                let y = e.clientY;

                if (e.clientY >= top + divisor && e.clientX >= left + (divisor *3)){
                    alert(`x is ${e.clientX}, and y is ${e.clientY}`)
                }

                //determine which row y position is in, then x position, return that square and toggle it's status
            })
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0,0,canvas.width, canvas.height)
            //2D array with 25 rows and 25 columns
            
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

                for (let i=0; i<canvasWidth-1; i+=divisor){
                    for (let j=0; j<canvasWidth-1; j+=divisor){
                        let curr = masterArr[i/divisor][j/divisor]
                        if(curr.status == 1){
                            console.log('curr', curr.btmi, curr.btmj)
                            if (masterArr[curr.btmi]){
                                if(masterArr[curr.btmj]){
                                        masterArr[curr.btmi][curr.btmj].activeColor = 'red'

                                }
                            }
                        } 
                        ctx.fillStyle = curr.activeColor
                        
                        ctx.fillRect(j, i, canvas.width/divisor, canvas.width/divisor);
                        
                    }//end inner for
                }//end outer for

                
            }//end if imageData
        }//end if canvasRef
    },[colors])
    
    const changeColors = (colors) => {
        if (colors.main == 'black'){
            setColors({
                main: 'blue',
                alt: 'white'
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
            // changeColors(colors)
            console.log('elapsed time:', elapsedTime);
            console.log('current ref', canvasRef.current);
            
    }

    const updateGame = () => {

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