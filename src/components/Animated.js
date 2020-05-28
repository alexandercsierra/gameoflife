import React, {useState, useEffect} from 'react'
import {useAnimation} from '../hooks/useAnimation'
// import {Square} from './Square'
import Box from './Box'

const Animated = () => {

    const [masterArr, setMasterArr] = useState([])
    const [next, setNext] = useState(masterArr)

    useEffect(()=>{
            setMasterArr(Array(25).fill(null).map((sq, i)=>Array(25).fill(null).map((sq, j)=>{return 0})))

    },[])
    

    // const canvasRef = useRef(null);
    
    const doAnimation = (elapsedTime) => {
        
        // console.log('elapsed time:', elapsedTime);
        /*
        directly above = [i-1][j]
        directly below = [i+1][j]

        directly left =  [i][j-1]
        directly right = [i][j+1]

        top left =       [i-1][j-1]
        top right =      [i-1][j+1]

        bottom left =    [i+1][j-1]
        bottom right =   [i+1][j+1]

        */

                /*
        directly above = [i-1][j]
        directly below = [i+1][j]

        directly left =  [i][j-1]
        directly right = [i][j+1]

        top left =       [i-1][j-1]
        top right =      [i-1][j+1]

        bottom left =    [i+1][j-1]
        bottom right =   [i+1][j+1]

        */
        for(let i=0; i<masterArr.length; i++){
            for(let j=0; j<masterArr[i].length; j++){


                let topi = i-1
                let topj = j

                let btmi = i+1
                let btmj = j

                // let lefti = i
                // let leftj = j-1

                // let righti = i
                // let rightj = j+1

                // let topLefti = i-1
                // let topLeftj = j-1

                // let topRighti = i-1
                // let topRightj = j+1

                // let btmLefti = i+1
                // let btmLeftij = j-1

                // let btmRighti = i+1
                // let btmRightj = j+1

                let count = 0
                if(masterArr[topi]){
                    if (masterArr[topi][topj] === 1){
                        count++
                    }

                }
                if(masterArr[btmi]){
                    if(masterArr[btmi][btmj] === 1){
                        count++
                    }

                }
                
                if(count < 2){
                    let arr = masterArr
                    arr[i][j] = 0
                    setNext(arr)

                }

            }
        }//end outer loop

            
    }

    const toggleStatus = (i, j) => {
        console.log('clicked')
        let copy = JSON.parse(JSON.stringify(masterArr))
        copy[i][j] = !copy[i][j]
        setMasterArr(copy)
    }
    
    const [cancelAnimation, startAnimation] = useAnimation(Date.now(), doAnimation);
    

    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
            <h3>Testing Animations</h3>
            <div style={{margin: '2px'}}>
                {masterArr && masterArr.map((row, i)=>{
                    return (
                        <div style={{display: 'flex', margin: '2px'}}>
                            {row.map((col, j)=>{
                            
                                return <Box key={`${i}_${j}`} toggleStatus={toggleStatus} status={masterArr[i][j]} i={i} j={j} />
                            })}
                        </div>
                    )
                })}
            </div>
            <button style={{background: 'white', color: '#1C1C1C', border: 'none', borderRadius: '5px', fontSize: '1.2rem'}} onClick={startAnimation}>Start</button>
            <button style={{background: 'white', color: '#1C1C1C', border: 'none', borderRadius: '5px', fontSize: '1.2rem'}} onClick={cancelAnimation}>Cancel</button>
        </div>

    )
}

export default Animated