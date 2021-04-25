import logo from './logo.svg';
import './App.css';
//1. Install all dependencies(npm install @tensorflow/tfjs @tensorflow-models/posenet react-webcam )
//2. Import the dependencies
//3. Setup camera (react) and canvas
//4. Define references
//5. Load posenet 
//6. Detection function
//7. drawing utilities (canvas)
//8. drawing function to draw on video.
//CANVAS IS WHERE THE DRAWING GOES
//1.
import React, {useRef} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'

function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null); 
  //enables usage and declares reference

  //load posenet
  const posenetload = async () => {
    const net = await posenet.load({
      inputResolution: {width: 640, height: 480},
      scale: 0.5
    })
    setInterval(() => {
    detect(net)
    },1000)
  }


  //actual detection
  const detect = async (net) => {
     if( typeof webcamref.current !== "undefined" && webcamref.current !== null && webcamref.current.video.readyState === 4){
       const video = webcamref.current.video
       const videowidth = webcamref.current.video.videoWidth
       const videoheight = webcamref.current.video.videoHeight

       webcamref.current.video.width = videowidth;
       webcamref.current.video.height = videoheight;

       const posedetect = await net.estimateSinglePose(video); //connects to method
       console.log(posedetect)
     }

  }
  posenetload();
  return (
    <div className="App">
     <Webcam style = {{position: "absolute", marginLeft: "-300px"}}/> 
     <canvas style = {{position: "absolute", marginLeft: "-300px", width: "640px", height: "480px"}}> 

     </canvas>
    </div>
  );
}

export default App;
