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

//1.
import React, {useRef} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'

function App() {
  return (
    <div className="App">
     <Webcam style = {{position: "absolute", marginLeft: "-300px"}}/> 
     <canvas style = {{position: "absolute", marginLeft: "-300px", width: "640px", height: "480px"}}>

     </canvas>
    </div>
  );
}

export default App;
