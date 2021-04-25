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
import React, {useRef, useEffect} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'
import {drawRect} from "./utility"
import * as cocossd from "@tensorflow-models/coco-ssd";
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
//runcoco
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net  = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 2000);
  };
  
//cocossd


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
  //coco functon

  const detect2 = async (net) => {
    // Check data is available
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
        const obj = await net.detect(video);
        console.log(obj)
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
       
      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj, ctx)
      //count how many bbox there are
      //classify if a material is dangerous
     
      if(obj[0]['class'] === "cell phone"){
        alert('Put your distractions away! Never get distracted from getting your work done!')
     
      }
      //posture
      
    }
  };
  const correctposture = async(posedetect) => { //if nose level is below 315 of y, then alert.
    //text to speech
     //alert
     //show a line everytime the 
     //const ctx = canvasref.current.getContext("2d");
     const prediction = posedetect['keypoints'][0]['position']['y']
   if(prediction >= 250){
     alert("Fix your posture");
     //if right/left shoulders are detected
     //distance detection
   }
  }


  // } //draw a dot on the nose and a line across the video
  
  posenetload();
  useEffect(()=>{runCoco()},[detect2()]);
  return (
    <div className="App">
     <Webcam ref = {webcamref} style = {{position: "absolute", marginLeft: "-300px"}}/> 
     <canvas ref = {canvasref} style = {{position: "absolute", marginLeft: "-300px", width: "640px", height: "480px"}}> 

     </canvas>
    </div>
  );
}

