import React, {useState, useEffect} from 'react'
import {useAnimation} from '../hooks/useAnimation'
// import {Square} from './Square'
import Box from './Box'

const Animated = () => {

    const [masterArr, setMasterArr] = useState([])
    const [next, setNext] = useState([])

    useEffect(()=>{
            setMasterArr(Array(25).fill(null).map((sq, i)=>Array(25).fill(null).map((sq, j)=>{return 0})))

            setNext(Array(25).fill(null).map((sq, i)=>Array(25).fill(null).map((sq, j)=>{return 0})))

    },[])
    

    
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
       let arr = []
        for(let i=0; i<masterArr.length; i++){
            for(let j=0; j<masterArr[i].length; j++){
                let count = 0

                let topi = i-1
                let topj = j

                let btmi = i+1
                let btmj = j

                if(masterArr[i][j] == 1){
                    if(masterArr[topi]){
                        if (masterArr[topi][topj] == 1){
                            console.log('found a top', topi, topj)
                            count++
                        }
    
                    }

                    if(masterArr[btmi]){
                        if(masterArr[btmi][btmj] == 1){
                            console.log('found a bottom', btmi, btmj)
                            count++
                        }
    
                    }
                    console.log('count', count)
                }
                // if(count > 0 && masterArr[i][j] == 1){
                //     console.log('in the if')
                //     arr = JSON.parse(JSON.stringify(masterArr))
                //     arr[i][j] = 1
                    
                //     if(arr){
                //         setMasterArr(arr)
                //         console.log(arr)

                //     }
                // } else 
                if (count == 0 && masterArr[i][j] == 1){
                    console.log('in the if', 'i', i, 'j', j)
                    arr = JSON.parse(JSON.stringify(masterArr))
                    console.log('masterArr pos', masterArr[i][j])
                    arr[i][j] = 0
                    console.log('arr pos', arr[i][j])
                    setMasterArr(arr)
                    console.log('arr in the if', arr)

                }
                
                

            }
            
        }//end outer loop
        // console.log('next', next)
        // setMasterArr(arr)
        console.log('masterArr outside the loops', masterArr)

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