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

import React, { useRef , useState, useEffect} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'
import Timer from "./Timer"
import Typewriter from "./utility"
import ReactDOM from 'react-dom'



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
       console.log(posedetect)

       correctposture(posedetect)
     }

  }
 
  const correctposture = async(posedetect) => { //if nose level is below 315 of y, then alert.
    //text to speech
     //alert
     //show a line everytime the 
     //const ctx = canvasref.current.getContext("2d");
     const prediction = posedetect['keypoints'][0]['position']['y']
     const prediction2 = posedetect['keypoints'][0]['score']
   if(prediction >= 250){
     alert("Fix your posture! Posture is crucial for a healthy body and long term studying!");
    

    
   }
   if(prediction2 <= 0.1){
    alert("Don't get distracted! Focus Please!")
   
   }
  }

//integrate water, stretching, theme
function themechange(){
document.body.style.background = "black"
}
function themechange2(){
  document.body.style.background = "white"
  }

  posenetload();


  //Speech reocgnition
  

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition()

function clicked(){
  recognition.start()
}

recognition.onstart = function(){
  console.log("Voice activated")
}
recognition.onresult = function(e){
const current = e.resultIndex;
const transcript = e.results[current][0].transcript;
console.log(transcript)
if(transcript === "I am tired "){
 const message = "Keep Pushing! I believe in you!"
 read(message)
}
// if(transcript === "Tell me a joke"){
// const message2 = "Why do bicycles fall over? Because they are tired"
// read(message2)

// }

}
function read(m){
const speech = new SpeechSynthesisUtterance()
speech.text = m;
speech.volume = 1;

window.speechSynthesis.speak(speech)
}


    

  return (
    
    <div className="App">
     <Webcam ref = {webcamref} style = {{position: "absolute", marginLeft: "-250px", marginTop: "450px"}}/> 
     <canvas ref = {canvasref} style = {{position: "absolute", marginLeft: "-250px", width: "440px", height: "380px", marginTop: "450px"}}> 

     </canvas>
     <button onClick={themechange}> Dark Theme </button>
     <button onClick={themechange2}> Light Theme </button>
     
     <h1 id = "heading1" style ={{color: "orange"}} >  Let's get work done.</h1>
    <Typewriter text = "Better Focus, Better Health." > </Typewriter>
    
   <Timer> </Timer>
   <button onClick = {clicked}> Voice Command </button>
 
    </div>
  );
  }

export default App;

