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
import React, { useRef} from 'react'
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
  
// function datechanger(){
//   const a = document.getElementById('#heading1')
//   const b= document.getElementById('#heading2')
//  var d = new Date()
//  var hour = d.getHours() 
//  if(hour >= 12){ //afternoon
//   a.style.opacity = 1;
//   b.style.opacity = 0;
//  }
//  if(hour <= 12){ //morning
//   a.style.opacity = 0;
//   b.style.opacity = 1;
//  }
// }
// datechanger()
const App3 = () => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);
  App3();
  posenetload();
  return (
    <div className="App">
     <Webcam ref = {webcamref} style = {{position: "absolute", marginLeft: "-250px", marginTop: "350px"}}/> 
     <canvas ref = {canvasref} style = {{position: "absolute", marginLeft: "-250px", width: "640px", height: "480px", marginTop: "350px"}}> 

     </canvas>
     <button onClick={themechange}> Dark Theme </button>
     <button onClick={themechange2}> Light Theme </button>
     
     <h2 id = "heading1"> Good Afternoon! Let's get work done.</h2>
     <h2 id = "heading2"> Good Morning! Let's get work done.</h2>

     <div className="Timers">
      <h2>Stopwatch</h2>
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
    </div>
  
    </div>
  );
}

export default App;
