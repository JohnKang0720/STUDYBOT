import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from 'react-webcam'
import Timer from "./Timer"
import Typewriter from "./utility"
import ReactDOM from 'react-dom'
import { Howl, Howler } from "howler"
import alarm from './zapsplat_household_alarm_clock_digital_beeps_001_60068.mp3'
import music1 from './acoustic-guitars-ambient-uplifting-background-music-for-videos-5642.mp3'
import music2 from './cancion-triste-1502.mp3'
import music3 from './chilled-acoustic-indie-folk-instrumental-background-music-for-videos-5720.mp3'
import music4 from './in-the-forest-ambient-acoustic-guitar-instrumental-background-music-for-videos-5718.mp3'
import music5 from './melody-of-nature-main-6672.mp3'
import Modal from './Modal'
import db from './firebase'
import firebase from 'firebase'

const tracks = [
  { sound: alarm, label: 'Alarm Sound' },
]

const tracks2 = [
  { sound: music1 },
  { sound: music2 },
  { sound: music3 },
  { sound: music4 },
  { sound: music5 }
]

function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);
  //enables usage and declares reference
  const [msg, setMsg] = useState('')
  const [click, setClick] = useState(false)
  const [num, setNum] = useState(0)
  const [quote, setQuote] = useState({
    text: '',
    author: ''
  })
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpen(true)
    }, 2000)
  }, [])

  useEffect(() => {
    setNum(Math.floor(Math.random() * 500))

    fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(data => {
        setQuote({
          text: data[num].text,
          author: data[num].author
        })
      })
  }, [click])

  const soundPlay = (src) => {
    const howl = new Howl({
      src,
      html5: true,
    })
    howl.play()
  }

  const soundStop = () => {
    Howler.stop()
  }


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
    if (prediction >= 270) {
      alert("Fix your posture! Posture is crucial for a healthy body and long term studying!");
      soundPlay(tracks[0].sound)
      setCount(prev => prev + 1)
    }
    if (prediction2 <= 0.1) {
      alert("Don't get distracted! Focus Please!")
      soundPlay(tracks[0].sound)
      setCount(prev => prev + 1)
    }
  }

  posenetload();


  //Speech reocgnition


  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  var recognition = new SpeechRecognition()

  function clicked() {
    setClick(!click)
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

  function read(m) {
    const speech = new SpeechSynthesisUtterance()
    if (m.includes('quotes')) {
      speech.text = `${quote.text} by ${quote.author}`;
    }
    else if (m.includes('music play')) {
      let number = Math.floor(Math.random() * 4)
      soundPlay(tracks2[number].sound)
    } else if (m.includes('music stop')) {
      soundStop()
    }else if(m.includes("resources")){
      
    }else if(m.includes("todos")){

    }else if(m.includes("synonyms")){
      getSynonyms()
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
  }

  function getSynonyms(){
  }



  return (

    <div className="App">
      {open && <Modal state={[open, setOpen]} />}
      <h1 id="heading1" style={{ color: "orange", fontWeight: 800 }}>  Let's get work done.</h1>
      <Typewriter text="Better Focus, Better Health." > </Typewriter>

      <div class="robot" onMouseover={() => setMsg('Need some help? Click me!')} onMouseLeave={() => setMsg('')} onClick={clicked}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
          <g id="hover">
            <ellipse id="shadow_2_" opacity="0.4" fill="#2C3332" cx="300" cy="703.375" rx="88.971" ry="30.625"></ellipse>
          </g>
          <g id="arms">
            <g id="left">
              <path id="arm_1_" fill="#BABEB7" d="M183.975,430.936c-50.27-21.595-96.437,29.654-96.132,54.383
				c0.06,4.868,7.836,11.424,11.509,7.079c12.145-14.369,36.979-35.733,55.676-16.486
				C156.498,477.423,189.086,433.132,183.975,430.936z"></path>
              <g id="hand_1_">
                <path id="shadow" fill="#BABEB7" d="M63.712,520.545l5.657-7.071c0,0-11.453-8.997-9.402-12.554
					c4.469-7.751,15.935-9.515,25.612-3.936c9.676,5.579,13.898,16.385,9.43,24.136c-1.736,3.013-7.363,0.091-7.363,0.091
					l-5.657,7.071l0.058,6.027c8.473,0.83,16.454-1.564,21.692-6.847c1.235-1.245,6.329-7.287,7.229-8.85
					c1.826-3.166-7.579-26.607-18.73-33.036c-8.361-4.82-31.172-5.074-31.172-5.074s-5.691,5.814-8.805,11.216
					c-5.77,10.006-2.253,23.271,7.678,32.486L63.712,520.545z"></path>
                <path id="top" fill="#DCE0DA" d="M69.37,513.474c-5.443-5.817-7.202-13.631-3.746-19.625c4.469-7.751,15.935-9.514,25.612-3.935
					c9.676,5.578,13.899,16.385,9.43,24.135c-2.575,4.468-7.478,6.932-13.02,7.162l0.058,6.027
					c10.471,1.026,20.192-2.873,24.911-11.06c6.976-12.099,0.385-28.965-14.719-37.673c-15.104-8.708-33.002-5.957-39.977,6.142
					c-5.769,10.007-2.253,23.271,7.679,32.486L69.37,513.474z"></path>
              </g>
            </g>
            <g id="right">
              <path id="arm" fill="#DCE0DA" d="M416.025,430.936c50.27-21.595,96.437,29.654,96.131,54.383
				c-0.059,4.868-7.836,11.424-11.509,7.079c-12.145-14.369-36.979-35.733-55.676-16.486
				C443.502,477.423,410.914,433.132,416.025,430.936z"></path>
              <g id="hand">
                <path id="shadow_1_" fill="#BABEB7" d="M536.287,520.545l-5.656-7.071c0,0,11.453-8.997,9.402-12.554
					c-4.469-7.751-15.936-9.515-25.612-3.936s-13.898,16.385-9.43,24.136c1.736,3.013,7.362,0.091,7.362,0.091l5.657,7.071
					l-0.058,6.027c-8.474,0.83-16.455-1.564-21.692-6.847c-1.235-1.245-6.329-7.287-7.229-8.85
					c-1.826-3.166,7.578-26.607,18.73-33.036c8.361-4.82,31.172-5.074,31.172-5.074s5.691,5.814,8.805,11.216
					c5.77,10.006,2.253,23.271-7.678,32.486L536.287,520.545z"></path>
                <path id="top_1_" fill="#DCE0DA" d="M530.631,513.474c5.443-5.817,7.201-13.631,3.745-19.625
					c-4.469-7.751-15.935-9.514-25.612-3.935c-9.676,5.578-13.898,16.385-9.43,24.135c2.575,4.468,7.479,6.932,13.02,7.162
					l-0.058,6.027c-10.472,1.026-20.192-2.873-24.911-11.06c-6.975-12.099-0.385-28.965,14.72-37.673s33.003-5.957,39.978,6.142
					c5.769,10.007,2.252,23.271-7.68,32.486L530.631,513.474z"></path>
              </g>
            </g>
          </g>
          <g id="body">
            <g id="chassie">
              <g id="base">
                <path fill="#DCE0DA" d="M137.424,525.622c0-47.887,60.669-219.342,162.576-219.342c101.907,0,162.576,171.854,162.576,219.342
					c0,47.489-137.88,56.438-162.576,56.438C275.303,582.06,137.424,573.511,137.424,525.622z"></path>
              </g>
              <g id="highlight">
                <defs>
                  <path id="SVGID_1_" d="M137.424,525.622c0-47.887,60.669-219.342,162.576-219.342c101.907,0,162.576,171.854,162.576,219.342
						c0,47.489-137.88,56.438-162.576,56.438C275.303,582.06,137.424,573.511,137.424,525.622z"></path>
                </defs>
                <clipPath id="SVGID_2_">
                  <use href="#SVGID_1_" overflow="visible"></use>
                </clipPath>
                <path clip-path="url(#SVGID_2_)" fill="#BABEB7" d="M455.667,419c0,0-38.299,61.503-156.983,61.503
					c-67.685,0-86.351,14.831-96.684,39.164S203.368,588,298.684,588s1.816,21.923,1.816,21.923s-198.833-42.589-198.833-43.589
					s54.333-215,54.333-215L455.667,419z"></path>
              </g>
            </g>
            <g id="progress-indicator">
              <g id="divet">
                <path id="highlight-bottom" fill="#EAECE8" d="M425.182,524.775l-4.682-21.211c0,0-48.18,19.563-120.34,19.563
					s-120.82-19.079-120.82-19.079l-4.542,20.636c0,0,37.523,20.052,125.363,20.052S425.182,524.775,425.182,524.775z"></path>
                <path id="divet-bottom" fill="#4C4C4C" d="M420.682,521.823l-4.514-16.654c0,0-46.447,17.959-116.014,17.959
					c-69.566,0-116.477-17.551-116.477-17.551l-4.379,16.159c0,0,36.174,18.597,120.856,18.597
					C384.837,540.333,420.682,521.823,420.682,521.823z"></path>
                <polygon id="shadow-right_1_" fill="#BABEB7" points="416.168,505.169 420.5,503.564 425.182,524.775 420.682,521.823 			"></polygon>
                <polygon id="shadow-left" fill="#8F918D" points="183.677,505.577 179.34,504.049 174.797,524.685 179.297,521.736 			"></polygon>
                <path id="shadow-bottom" fill="#BABEB7" d="M204.738,530.305l-5.786,2.959c0,0-8.125-2.072-14.702-4.556
					s-9.453-4.023-9.453-4.023l4.5-2.948c0,0,4.039,2.192,11.313,4.463S204.738,530.305,204.738,530.305z"></path>
              </g>
              <g id="completed">
                <path id="blue" fill="#84D3E8" d="M300.154,523.128c-69.566,0-116.477-17.551-116.477-17.551l-4.379,16.159
					c0,0,36.174,18.597,120.856,18.597c28.812,0,51.965-2.144,69.983-4.971l-1.808-18.073
					C349.822,520.518,326.67,523.128,300.154,523.128z"></path>
                <path id="blue-shadow" fill="#6DADBC" d="M208.568,512.712c-15.682-3.741-24.93-7.135-24.93-7.135l-4.437,16.159
					c0,0,8.037,4.175,25.537,8.568C205.625,524.125,206,520.875,208.568,512.712z"></path>
              </g>
            </g>
          </g>

          <g id="head">
            <g id="face">
              <path id="screen-shadow" fill="#9AB2B0" d="M418.268,235.276C377.932,233.144,327.52,232,300.003,232
				c-27.517,0-77.766,1.144-118.102,3.276c-34.071,1.801-41.222,17.035-41.222,69.742s3.15,88.311,24.65,107.819
				c35.831,32.511,101.258,47.829,134.673,47.829c33.832,0,99.06-15.318,134.891-47.829c21.5-19.508,24.758-55.112,24.758-107.819
				S452.338,237.078,418.268,235.276z"></path>
              <path id="screen" fill="#A4BCB9" d="M164.381,353.965c0,55.225,107.043,76.693,135.619,76.693
				c28.576,0,135.618-21.469,135.618-76.693c0-100.027-60.717-123.293-135.618-123.293
				C225.101,230.671,164.381,253.938,164.381,353.965z"></path>
              <path id="case_x5F_shadow" fill="#EAECE8" d="M300,239c27.54,0,78.739,1.16,119.383,3.309c15.837,0.837,18.06,4.715,19.388,7.032
				c5.026,8.771,5.671,29.167,5.671,45.955c0,49.954-0.156,81.738-16.287,96.374c-31.639,28.708-96.014,44.997-128.154,44.997
				c-32.048,0-95.295-16.289-126.934-44.997c-16.039-14.552-17.176-46.356-17.176-96.374c0-16.825,0.638-37.258,5.614-46
				c1.395-2.45,3.503-6.153,19.279-6.987C221.426,240.16,272.541,239,300,239 M300,210.5c-80.5,0-160.11,7.167-160.11,60.795
				S141.095,385.151,162.971,405C199.429,438.08,266,453.666,300,453.666c34.424,0,100.792-15.586,137.25-48.666
				c21.876-19.849,23.191-80.076,23.191-133.705S380.5,210.5,300,210.5z"></path>
              <path id="case" fill="#DCE0DA" d="M300,248c27.54,0,78.739,1.16,119.383,3.309c15.837,0.837,18.06,4.715,19.388,7.032
				c5.026,8.771,5.671,29.167,5.671,45.955c0,49.954-3.156,81.738-19.287,96.374c-31.639,28.708-93.014,43.997-125.154,43.997
				c-32.048,0-93.295-15.289-124.934-43.997c-16.039-14.552-19.176-46.356-19.176-96.374c0-16.825,0.638-37.258,5.614-46
				c1.395-2.45,3.503-6.153,19.279-6.987C221.426,249.16,272.541,248,300,248 M300,230c-27.999,0-79.126,1.164-120.167,3.333
				c-34.667,1.833-41.943,17.333-41.943,70.962s3.205,89.856,25.081,109.705C199.429,447.08,266,462.666,300,462.666
				c34.424,0,100.792-15.586,137.25-48.666c21.876-19.849,25.191-56.076,25.191-109.705s-7.441-69.129-42.108-70.962
				C379.292,231.164,327.998,230,300,230L300,230z"></path>
            </g>
            <g id="eyes">
              <ellipse id="left_1_" fill="#2C3332" cx="231" cy="316.667" rx="6.333" ry="17"></ellipse>
              <ellipse id="right_1_" fill="#2C3332" cx="369" cy="316.667" rx="6.334" ry="17"></ellipse>
            </g>
            <g id="indicators">
              <path id="mount" fill="#DCE0DA" d="M354.333,220.333c0-29.916-24.252-54.167-54.167-54.167c-29.916,0-54.167,24.251-54.167,54.167
				c0,4.667,24.251,4.667,54.167,4.667C330.081,225,354.333,225,354.333,220.333z"></path>
              <g id="leds">
                <circle id="yellow" fill="#F0C419" cx="300.418" cy="207" r="8.084"></circle>
                <circle id="red" fill="#E64C3C" cx="324.67" cy="206" r="8.084"></circle>
                <circle id="green" fill="#4EBA64" cx="275.33" cy="206" r="8.083"></circle>
              </g>
            </g>
          </g>
        </svg>
        <div className="commands">
          <div className="command-list">
            <p> <strong> Bot Commands: </strong>
              <li> "Quotes"</li>
              <li> "Music Play"</li>
              <li> "Music Stop"</li>
              <li> "Resources" </li>
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="video-container">
          <Webcam ref={webcamref} style={{ width: '60%', borderRadius: '15px' }} />
          <canvas ref={canvasref}>
          </canvas>
          
          <TodoList/>
     
        </div>

        <div className="Timer">
          <Timer> </Timer>
        </div>
      </div>
    </div>
  );
}

function TodoList(){
  const [todos, setTodos] = useState([])
   const [input, setInput] = useState('')

   useEffect(() => {
    db.collection('todos').onSnapshot(snapshot => {
      console.log(snapshot.docs.map((doc) => doc.data().todo))
      setTodos(snapshot.docs.map((doc) => doc.data().todo))
    })
   }, [input])

  const handleAdd = () => {
    if(input !== ''){
      setTodos([...todos, input])
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }

  const handleClear = () => {
    setTodos([])
  }
  
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleDelete = () => {
   
  }

  return(
    <div>
      <input placeholder="Enter a Todo" onChange={handleChange}/>
      <button className="add" onClick={handleAdd}> Add Todos </button>
      <button className="clear" onClick={handleClear}> Clear Todos </button>

      {todos.length === 0 ? <p> Add your todos! </p> : 
      <ul className="todo-container">
         {todos.map((todo) => {
           return <li> {todo} <button className="add"> Delete </button></li>
         })}
      </ul>}
    </div>
  )
}

export default App;


//Allow the bot to get resources through api or webscrape
//perforance tracker -- # of bad posture and highest concentration score and graph*