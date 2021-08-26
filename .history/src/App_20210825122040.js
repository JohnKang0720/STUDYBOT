import logo from './logo.svg';
import './App.css';

import React, { useRef, useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'
import Timer from "./Timer"
import Typewriter from "./utility"
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Projects from '.Projects';
import Embeds from './Embeds';
import Goalhelp from './Goalhelp';
import Project from './Project';


function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);
  //enables usage and declares reference
  const [redirect, setRedirect] = useState('')
  //load posenet
  const posenetload = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5
    })
    setInterval(() => {
      detect(net)
    }, 1000)
  }


  //actual detection
  const detect = async (net) => {
    if (typeof webcamref.current !== "undefined" && webcamref.current !== null && webcamref.current.video.readyState === 4) {
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

  const correctposture = async (posedetect) => { //if nose level is below 315 of y, then alert.
    //text to speech
    //alert
    //show a line everytime the 
    //const ctx = canvasref.current.getContext("2d");
    const prediction = posedetect['keypoints'][0]['position']['y']
    const prediction2 = posedetect['keypoints'][0]['score']

    if (prediction >= 250) {
      alert("Fix your posture! Posture is crucial for a healthy body and long term studying!");
    }

    if (prediction2 <= 0.1) {
      alert("Don't get distracted! Focus Please!")

    }
  }

  //integrate water, stretching, theme
  function themechange() {
    document.body.style.background = "black"
  }
  function themechange2() {
    document.body.style.background = "white"
  }

  posenetload();


  //Speech reocgnition


  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  var recognition = new SpeechRecognition()

  function clicked() {
    recognition.start()
  }

  recognition.onstart = function () {
    console.log("Voice activated")
  }
  recognition.onresult = function (e) {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    console.log(transcript)
    read(transcript)
  }
  // if(transcript === "Tell me a joke"){
  // const message2 = "Why do bicycles fall over? Because they are tired"
  // read(message2)

  // }


  function read(m) {
    const speech = new SpeechSynthesisUtterance()
    if (m.includes('I am tired')) {
      const msg = "Keep pushing! I believe in you!"
      speech.text = msg;
    } else if (m.includes('tell me a joke')) {
      const msg = "Why do bicycles fall over? Because they are two tired"
      speech.text = msg;
    } else if (m.includes('give me some advice')) {
      const msg = "If you feel like giving up, never do it. Because you can do it."
      speech.text = msg;
    }


    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
  }


  //audio



  return (
<Router> 
    <div className="App">
      <Webcam ref={webcamref}/>
      <canvas ref={canvasref}>
      </canvas>
      <button onClick={themechange}> Dark Theme </button>
      <button onClick={themechange2}> Light Theme </button>

      <h1 id="heading1" style={{ color: "orange" }} >  Let's get work done.</h1>
      <Typewriter text="Better Focus, Better Health." > </Typewriter>

      <Timer> </Timer>
      <button onClick={clicked}> Voice Command </button>
      
    </div>
    <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/projects" component={() => <Projects link={[setRedirect]}/>} />
            <Route exact path="/goalhelp" exact component={() => <Goalhelp/>}/>
            <Route path={`/${redirect}`} component={() => <Embeds info={[redirect]}/>}/>
            <Route path='/projectslist' exact component={Project} />
          </Switch>
    </Router>
  );
}

export default App;

