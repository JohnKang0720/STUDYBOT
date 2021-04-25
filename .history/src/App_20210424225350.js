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

import React, { useRef} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'
import Typical from 'react-typical'

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

       const posedetect = await net.estimateSinglePose(video); //connects to method //250
       
       correctposture(posedetect)
     }

  }
  const correctposture = async(posedetect) => { //if nose level is below 315 of y, then alert.
    //text to speech
     //alert
     //show a line everytime the 
     //const ctx = canvasref.current.getContext("2d");
     const prediction = posedetect['keypoints'][0]['position']['y']
   if(prediction >= 250){
     alert("Fix your posture! Posture is crucial for a healthy body and long term studying!");
     
     //if right/left shoulders are detected
     //distance detection
   }
  }

//integrate water, stretching, theme
function themechange(){
document.body.style.background = "black"
}
function themechange2(){
  document.body.style.background = "white"
  }
  //clock
  function timer(){

  }
  var i = 0;
var txt = 'Lorem ipsum dummy text blabla.';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter()
//water reminder system
  //typewriting effect 
  //game effect
  posenetload();
  return (
    <div className="App">
     <Webcam ref = {webcamref} style = {{position: "absolute", marginLeft: "-250px", marginTop: "350px"}}/> 
     <canvas ref = {canvasref} style = {{position: "absolute", marginLeft: "-250px", width: "640px", height: "480px", marginTop: "350px"}}> 

     </canvas>
     <button onClick={themechange}> Dark Theme </button>
     <button onClick={themechange2}> Light Theme </button>
     
     <h1 id = "heading1" >  Let's get work done.</h1>
     <p> The ultimate web for </p>
    {/* <Typical loop = {Infinity}
        wrapper = "b"
        steps = {[
         'healthy habits',
         1000,
         'better grades',
         1000,
         'a better life',
         1000
        ]}
         > 

    </Typical>
</p> */}

     
  
    </div>
  );
}

export default App;
