import { useEffect, useState } from "react";

// custom hook for using animation frame
export const useAnimation = ( timestamp, doAnimationCallBack ) => {
  
  // set the prev time stamp
  const [ prevTimeStamp, setTimeStamp ] = useState( timestamp - 30 );
  const [ continueAnimation, setContinueAnimation ] = useState( false );
  const [ started, setStarted ] = useState( false );
  
  useEffect( () => {
    console.log('in the useffect', continueAnimation)
    // only start the animation frame if we haven't in the past
    if( !started && continueAnimation ){
      setStarted( true );
      requestAnimationFrame( onFrame );
    }
  }, [ started, continueAnimation ] );
  
  // Request the first animation frame to kick things off
  const onFrame = ( timestamp ) => {
    
    // if we want to do more ask for the next frame
    if( continueAnimation ){
      setTimeout(()=>{requestAnimationFrame( onFrame )},1000)
      // requestAnimationFrame( onFrame );
    }
    const elapsed = prevTimeStamp - timestamp;
    setTimeStamp( timestamp );
    console.log( `Current time: ${ timestamp } ms, frame time: ${ elapsed } ms` );
    
    //call callback and pass it the elapsed time
    
    doAnimationCallBack( elapsed )

  };
  
  // this will stop the hook from calling the next animation frame
  const cancelAnimation = () => {
      console.log(continueAnimation);
    setContinueAnimation( false );
    // setStarted(true)
  };

  const startAnimation = () => {
    setContinueAnimation(true)
    // setStarted(false)
  }
  
  return [ cancelAnimation, startAnimation ];
  
};