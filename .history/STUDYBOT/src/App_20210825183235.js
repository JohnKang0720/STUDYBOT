import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react'
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





  return (

    <div className="App">
      <h1 id="heading1" style={{ color: "orange" }}>  Let's get work done.</h1>
      <Typewriter text="Better Focus, Better Health." > </Typewriter>
      <div className="video-container">
        <Webcam ref={webcamref} style={{width: '40%'}}/>
        <canvas ref={canvasref}>
        </canvas>
        <svg id="robo2" version="1.1" id="Layer_1" viewBox="0 0 800 800" >

<ellipse id="sombra" opacity="0.5" fill="#767A5D" cx="399.87" cy="674.53" rx="72.199" ry="7.22"/>
<g id="finger-2-left">
    <polygon fill="#939598" points="273.164,468.763 275.571,505.665 292.417,497.643 286,463.95  "/>
    <polygon fill="#A7A9AC" points="277.977,498.846 275.571,505.665 304.852,501.253 309.264,481.598 289.208,486.412     "/>
</g>
<g id="finger-2-right">
    <path fill="#808285" d="M287.203,459.136c1.203-0.802,25.671-22.061,25.671-22.061l-9.364-5.886l-4.675-2.938l-18.451,24.063
        L287.203,459.136z"/>
    <polygon fill="#939598" points="304.45,453.922 316.484,459.136 312.874,437.076 298.835,428.251  "/>
</g>
<g id="arm-left">
    <path fill="#FBBC5D" d="M281.237,473.25c-6.43,0-21.354-4.794-31.524-14.375c-9.222-8.689-13.187-19.823-11.469-32.197
        c4.442-31.978,40.269-79.554,120.757-79.554c4.71,0,8.527,3.818,8.527,8.528c0,4.71-3.817,8.528-8.527,8.528
        c-69.104,0-100.381,39.774-103.864,64.844c-0.787,5.664,0.451,10.482,3.786,14.734c6.35,8.093,18.778,11.986,22.118,12.467
        c0.049-0.001,0.101-0.001,0.153-0.001c3.981,0,7.54,2.801,8.353,6.854c0.924,4.619-2.071,9.111-6.689,10.037
        C282.408,473.203,281.862,473.25,281.237,473.25z"/>
    <g>
        <path fill="#F7941E" d="M258.924,443.757c-0.634-0.808-1.168-1.644-1.651-2.495c-3.233,6.411-5.061,13.088-5.011,19.821
            c2.463,2,5.108,3.761,7.796,5.267c-1.401-6.663-0.787-13.355,1.391-19.865C260.539,445.634,259.686,444.727,258.924,443.757z"/>
        <path fill="#F7941E" d="M255.404,427.464c0.374-2.077,0.929-4.239,1.676-6.466c-3.722,2.179-6.956,5.667-10.349,8.79
            c-3.345,3.079-5.992,6.629-7.97,10.483c0.714,3.126,1.891,6.105,3.449,8.943c0.665-3.341,1.772-6.601,3.332-9.854
            c1.95-4.065,5.136-7.391,8.405-10.4C254.309,428.627,254.816,428.088,255.404,427.464z"/>
        <path fill="#F7941E" d="M253.192,406.031c-3.448,1.132-6.865,2.403-10.148,3.919c-0.685,1.606-1.305,3.2-1.853,4.779
            c2.81-1.749,5.842-3.156,9.071-4.493c4.825-1.997,8.701-2.145,12.512-1.339c0.772-1.272,1.601-2.546,2.491-3.819
            C261.464,404.459,257.565,404.596,253.192,406.031z"/>
        <path fill="#F7941E" d="M257.941,386.608c-1.02,1.161-2.004,2.331-2.942,3.509c5.856,1.169,10.653,4.587,15.011,8.875
            c1.363-1.584,2.816-3.153,4.373-4.698c-2.16-1.922-4.487-3.657-7.131-5.031C264.341,387.751,261.173,386.937,257.941,386.608z"/>
        <path fill="#F7941E" d="M283.065,374.249c-1.941-1.266-4.263-2.793-6.718-4.005c-1.717,1.198-3.374,2.424-4.969,3.679
            c0.809,0.465,1.587,0.92,2.255,1.266c3.325,1.718,6.311,3.888,9.112,6.348c1.123,0.986,2.128,2.067,3.036,3.213
            c1.746-1.231,3.592-2.417,5.496-3.574C288.929,378.547,286.124,376.244,283.065,374.249z"/>
        <path fill="#F7941E" d="M292.756,360.743c4.283,3.844,7.026,9.224,8.555,15.069c2.135-0.993,4.359-1.929,6.653-2.818
            c-1.72-5.842-4.663-11.099-9.037-14.971C296.811,358.889,294.751,359.794,292.756,360.743z"/>
        <path fill="#F7941E" d="M323.086,358.342c-0.875-2.05-2.102-4.536-3.629-6.862c-2.4,0.565-4.76,1.164-7.045,1.825
            c2.037,3.066,3.614,6.702,4.524,8.834c0.994,2.328,1.687,4.743,2.033,7.182c2.235-0.624,4.556-1.178,6.918-1.698
            C325.386,364.489,324.384,361.385,323.086,358.342z"/>
    </g>
    <path opacity="0.2" fill="#638194" d="M245.066,433.499c-1.443,10.395,1.174,19.894,7.5,27.825
        c9.936,7.939,22.818,11.926,28.671,11.926c0.625,0,1.17-0.047,1.622-0.136c4.58-0.918,7.551-5.343,6.7-9.921
        c-0.504-0.093-1.018-0.148-1.542-0.148c-0.052,0-0.103,0-0.153,0.001c-3.34-0.481-15.768-4.374-22.118-12.467
        c-0.369-0.47-0.702-0.95-1.02-1.435c-2.161-1.532-4.181-3.321-5.802-5.387c-3.335-4.252-4.574-9.07-3.786-14.734
        c3.483-25.07,34.76-64.844,103.864-64.844c4.71,0,8.527-3.818,8.527-8.528c0-0.531-0.063-1.046-0.156-1.55
        c-0.504-0.093-1.018-0.156-1.549-0.156C285.335,353.945,249.508,401.521,245.066,433.499z"/>
    <circle fill="#15D498" cx="280.384" cy="464.348" r="12.033"/>
    <circle opacity="0.5" fill="#15D498" cx="280.578" cy="464.755" r="9.326"/>
    <path opacity="0.5" fill="#15D498" d="M280.384,452.314c-1.295,0-2.518,0.258-3.687,0.636c5.528,1.087,9.701,5.951,9.701,11.798
        c0,5.351-3.516,9.833-8.346,11.397c0.755,0.149,1.534,0.235,2.333,0.235c6.646,0,12.033-5.387,12.033-12.033
        S287.03,452.314,280.384,452.314z"/>
</g>
<g id="legs">
    <polygon fill="#58595B" points="375.378,621.101 370.361,629.31 358.96,641.623 381.763,642.991 392.252,628.398   "/>
    <polygon fill="#6D6E71" points="364.889,605.139 375.378,606.051 392.252,628.398 370.361,629.31 360.328,606.963  "/>
    <polygon fill="#6D6E71" points="355.308,618.882 358.686,637.618 367.552,648.859 346.863,646.986 337.152,630.124 
        349.397,620.131     "/>
    <path fill="#939598" d="M356.997,608.749c1.989,0.204,15.2,1.689,15.2,1.689l-13.933,26.6l-21.533-5.067L356.997,608.749z"/>
    <path fill="#808285" d="M419.928,617.172l-9.627,4.011l10.83,20.857c0,0,18.451-1.203,18.05-2.407
        c-0.401-1.203-9.225-18.451-9.225-18.451L419.928,617.172z"/>
    <polygon fill="#6D6E71" points="446,603.534 429.956,621.183 410.302,621.183 433.165,601.529     "/>
    <polygon fill="#939598" points="435.167,605.54 446.118,604.337 464.043,628.403 443.131,629.606  "/>
    <polygon fill="#6D6E71" points="439.48,646.854 457.404,646.453 464.043,627.2 443.131,628.403    "/>
    <g>
        <path fill="#FBBC5D" d="M436.083,615.271c-0.895,0-1.805-0.141-2.7-0.442c-4.035-1.347-6.393-5.417-5.713-9.483
            c0.458-6.383,0.176-68.135-0.113-106.033c-0.038-4.71,3.751-8.557,8.461-8.592c0.023,0,0.045,0,0.068,0
            c4.679,0,8.489,3.774,8.524,8.461c0.816,106.508,0.12,108.59-0.44,110.261C442.978,613.015,439.653,615.271,436.083,615.271z"/>
    </g>
    <path opacity="0.2" fill="#638194" d="M434.819,605.346c0.458-6.383,0.176-68.135-0.113-106.033
        c-0.028-3.517,2.079-6.549,5.108-7.876c-1.044-0.455-2.19-0.717-3.401-0.717c-0.023,0-0.045,0-0.068,0
        c-4.71,0.035-8.498,3.883-8.461,8.592c0.289,37.897,0.571,99.65,0.113,106.033c-0.679,4.066,1.678,8.136,5.713,9.483
        c0.895,0.301,1.805,0.442,2.7,0.442c1.197,0,2.358-0.274,3.429-0.745C436.244,612.961,434.181,609.167,434.819,605.346z"/>
    <g>
        <path fill="#F7941E" d="M427.888,581.192c-0.002,3.174-0.008,6.125-0.019,8.811c4.656,3.396,10.26,5.773,16.395,7.458
            c0.153,0.042,0.353,0.05,0.571,0.044c0.02-1.323,0.038-2.805,0.054-4.459C437.925,590.487,432.03,586.746,427.888,581.192z"/>
        <path fill="#F7941E" d="M428.506,567.014c4.779,4.36,10.046,7.773,16.455,8.664c0.001-1.42,0-2.898-0.001-4.444
            c-3.659-1.52-6.841-4.022-9.917-6.724c-2.563-2.251-5.213-4.604-7.191-7.368c0.01,3.173,0.018,6.279,0.024,9.299
            C428.086,566.632,428.297,566.824,428.506,567.014z"/>
        <path fill="#F7941E" d="M444.914,552.743c-0.007-1.924-0.016-3.919-0.025-5.98c-3.047-1.507-5.897-3.319-8.784-5.604
            c-2.57-2.033-5.822-4.085-8.347-6.601c0.014,2.669,0.026,5.342,0.038,8.008c0.404,0.308,0.813,0.616,1.199,0.924
            C434.125,547.577,439.061,550.523,444.914,552.743z"/>
        <path fill="#F7941E" d="M444.734,531.833c0.022,0.02,0.054,0.032,0.078,0.051c-0.016-2.734-0.033-5.564-0.052-8.497
            c-6.354-5.657-12.801-11.651-17.185-18.762c0.026,3.576,0.051,7.309,0.076,11.154
            C432.943,521.567,439.141,526.703,444.734,531.833z"/>
    </g>
    <g>
        <path fill="#FBBC5D" d="M367.863,615.271c-0.895,0-1.805-0.141-2.7-0.442c-4.035-1.347-6.393-5.417-5.713-9.483
            c0.458-6.383,0.176-68.135-0.113-106.033c-0.038-4.71,3.751-8.557,8.461-8.592c0.023,0,0.045,0,0.068,0
            c4.679,0,8.489,3.774,8.524,8.461c0.816,106.508,0.12,108.59-0.44,110.261C374.759,613.015,371.433,615.271,367.863,615.271z"/>
    </g>
    <path opacity="0.2" fill="#638194" d="M366.6,605.346c0.458-6.383,0.176-68.135-0.113-106.033
        c-0.028-3.517,2.079-6.549,5.108-7.876c-1.044-0.455-2.19-0.717-3.401-0.717c-0.023,0-0.045,0-0.068,0
        c-4.71,0.035-8.498,3.883-8.461,8.592c0.289,37.897,0.571,99.65,0.113,106.033c-0.679,4.066,1.678,8.136,5.713,9.483
        c0.895,0.301,1.805,0.442,2.7,0.442c1.197,0,2.358-0.274,3.429-0.745C368.025,612.961,365.962,609.167,366.6,605.346z"/>
    <g>
        <path fill="#F7941E" d="M359.669,581.192c-0.002,3.174-0.008,6.125-0.019,8.811c4.656,3.396,10.26,5.773,16.395,7.458
            c0.153,0.042,0.353,0.05,0.571,0.044c0.02-1.323,0.038-2.805,0.054-4.459C369.706,590.487,363.81,586.746,359.669,581.192z"/>
        <path fill="#F7941E" d="M360.286,567.014c4.779,4.36,10.046,7.773,16.455,8.664c0.001-1.42,0-2.898-0.001-4.444
            c-3.659-1.52-6.841-4.022-9.917-6.724c-2.563-2.251-5.213-4.604-7.191-7.368c0.01,3.173,0.018,6.279,0.024,9.299
            C359.867,566.632,360.078,566.824,360.286,567.014z"/>
        <path fill="#F7941E" d="M376.695,552.743c-0.008-1.924-0.016-3.919-0.025-5.98c-3.047-1.507-5.897-3.319-8.784-5.604
            c-2.57-2.033-5.822-4.085-8.347-6.601c0.014,2.669,0.026,5.342,0.038,8.008c0.404,0.308,0.813,0.616,1.199,0.924
            C365.906,547.577,370.841,550.523,376.695,552.743z"/>
        <path fill="#F7941E" d="M376.514,531.833c0.022,0.02,0.054,0.032,0.078,0.051c-0.016-2.734-0.033-5.564-0.052-8.497
            c-6.354-5.657-12.801-11.651-17.185-18.762c0.026,3.576,0.051,7.309,0.076,11.154
            C364.724,521.567,370.921,526.703,376.514,531.833z"/>
    </g>
    <g>
        <circle fill="#15D498" cx="368.048" cy="551.187" r="11.03"/>
        <path opacity="0.5" fill="#15D498" d="M368.048,557.401c-5.262,0-9.648-3.692-10.749-8.622c-0.174,0.777-0.282,1.579-0.282,2.408
            c0,6.092,4.939,11.03,11.031,11.03c6.092,0,11.03-4.939,11.03-11.03c0-0.83-0.108-1.631-0.282-2.408
            C377.695,553.709,373.31,557.401,368.048,557.401z"/>
        <path opacity="0.5" fill="#15D498" d="M369.105,545.675c3.495,0,6.505,1.946,8.102,4.791c0.003-0.09,0.027-0.175,0.027-0.266
            c0-5.15-4.175-9.326-9.326-9.326s-9.326,4.175-9.326,9.326c0,1.655,0.468,3.187,1.224,4.535
            C359.95,549.71,364.045,545.675,369.105,545.675z"/>
    </g>
    <g>
        <circle fill="#15D498" cx="436.227" cy="605.838" r="11.833"/>
        <path opacity="0.5" fill="#15D498" d="M436.227,612.503c-5.645,0-10.349-3.96-11.531-9.249c-0.186,0.834-0.302,1.693-0.302,2.583
            c0,6.535,5.298,11.833,11.833,11.833c6.535,0,11.833-5.298,11.833-11.833c0-0.89-0.116-1.75-0.302-2.583
            C446.576,608.543,441.872,612.503,436.227,612.503z"/>
        <path opacity="0.5" fill="#15D498" d="M437.36,599.924c3.749,0,6.978,2.087,8.691,5.14c0.003-0.097,0.029-0.188,0.029-0.286
            c0-5.525-4.479-10.004-10.004-10.004c-5.525,0-10.004,4.479-10.004,10.004c0,1.776,0.502,3.419,1.313,4.864
            C427.54,604.253,431.933,599.924,437.36,599.924z"/>
    </g>
    <g>
        <circle fill="#15D498" cx="368.007" cy="605.838" r="11.833"/>
        <path opacity="0.5" fill="#15D498" d="M368.007,612.503c-5.645,0-10.349-3.96-11.531-9.249c-0.186,0.834-0.302,1.693-0.302,2.583
            c0,6.535,5.298,11.833,11.833,11.833c6.535,0,11.833-5.298,11.833-11.833c0-0.89-0.116-1.75-0.302-2.583
            C378.356,608.543,373.652,612.503,368.007,612.503z"/>
        <path opacity="0.5" fill="#15D498" d="M369.141,599.924c3.749,0,6.978,2.087,8.691,5.14c0.003-0.097,0.029-0.188,0.029-0.286
            c0-5.525-4.479-10.004-10.004-10.004c-5.525,0-10.004,4.479-10.004,10.004c0,1.776,0.502,3.419,1.313,4.864
            C359.32,604.253,363.713,599.924,369.141,599.924z"/>
    </g>
    <g>
        <circle fill="#15D498" cx="436.267" cy="551.187" r="11.03"/>
        <path opacity="0.5" fill="#15D498" d="M436.268,557.401c-5.262,0-9.648-3.692-10.749-8.622c-0.174,0.777-0.282,1.579-0.282,2.408
            c0,6.092,4.939,11.03,11.031,11.03c6.092,0,11.03-4.939,11.03-11.03c0-0.83-0.108-1.631-0.282-2.408
            C445.915,553.709,441.53,557.401,436.268,557.401z"/>
        <path opacity="0.5" fill="#15D498" d="M437.324,545.675c3.495,0,6.505,1.946,8.102,4.791c0.003-0.09,0.027-0.175,0.027-0.266
            c0-5.15-4.175-9.326-9.326-9.326s-9.326,4.175-9.326,9.326c0,1.655,0.468,3.187,1.224,4.535
            C428.169,549.71,432.265,545.675,437.324,545.675z"/>
    </g>
</g>
<g id="helice">
    <path fill="#BCBEC0" d="M388.189,159.732c0,0,38.892-19.496,72.246-13.695s5.083,27.799-26.402,25.893s-48.562-4.78-48.562-4.78
        L388.189,159.732z"/>
    <path fill="#BCBEC0" d="M387.84,160.714c0,0-40.111-16.846-73.001-8.824s-3.209,28.077,28.077,24.066
        c31.286-4.011,48.133-8.022,48.133-8.022L387.84,160.714z"/>
</g>
<g id="body-robot">
    <g id="body">
        <g>
            <line fill="#F7941E" x1="384.672" y1="164.725" x2="384.672" y2="187.187"/>
            <path fill="#F7941E" d="M384.671,195.715c-4.71,0-8.527-3.818-8.527-8.528v-22.462c0-4.71,3.817-8.528,8.527-8.528
                s8.527,3.818,8.527,8.528v22.462C393.197,191.897,389.381,195.715,384.671,195.715z"/>
        </g>
        <path fill="#15D498" d="M318.088,329.178c0,0,4.813,105.892,6.418,125.947c1.604,20.055,21.66,65.781,73.803,61.77
            s79.419-32.088,81.826-80.221c2.407-48.133-7.22-171.673-10.429-192.531c-3.209-20.857-24.066-66.584-73.803-68.188
            c-49.737-1.604-81.826,36.902-83.43,86.639L318.088,329.178z"/>
        <path fill="#626466" d="M398.309,386.734c-44.351-0.878-66.08,6.895-76.689,14.113c1.133,22.716,2.256,43.799,2.886,51.668
            c1.604,20.055,21.66,65.781,73.803,61.77c52.144-4.011,79.419-32.089,81.826-80.221c0.252-5.039,0.369-10.925,0.378-17.415
            c-0.014-4.518-0.076-9.305-0.182-14.309C457.537,394.087,429.612,387.354,398.309,386.734z"/>
        <path fill="#8474A1" d="M321.62,403.457c1.133,22.716,2.256,43.799,2.886,51.668c1.604,20.055,21.66,65.781,73.803,61.77
            c52.144-4.011,79.419-32.089,81.826-80.221c0.426-8.529,0.474-19.432,0.247-31.706c-22.802-8.262-50.747-15.004-82.073-15.625
            C353.958,388.466,332.229,396.239,321.62,403.457z"/>
        <path opacity="0.08" fill="#6D6E71" d="M394.34,494.401c-9.073-4.167-17.71-10.209-23.951-17.893
            c2.367-3.126,10.554-9.314,38.75-11.958c0,0-31.888-13.236-40.913-17.448c-4.583-2.139-10.4-2.413-15.022-2.168
            c-0.049-0.299-0.119-0.595-0.156-0.896c-0.495-4.025-0.053-8.445-2.355-11.783c-1.172-1.699-2.93-2.897-4.312-4.43
            c-2.978-3.305-4-7.893-4.699-12.286c-3.598-22.61-1.476-46.108,6.116-67.707c2.969,1.039,6.352-0.604,8.265-3.102
            c1.912-2.498,2.669-5.67,3.297-8.752c4.87-23.881,4.909-48.738,0.114-72.634c-0.746-3.718-2.138-8.019-5.756-9.154
            c-3.015-0.945-6.122,0.795-9.063,1.952c-2.94,1.157-6.993,1.398-8.571-1.34c-0.847-1.47-0.634-3.296-0.374-4.972
            c3.575-23.094,11.159-45.549,22.248-66.119c-27.61,13.528-44.339,43.331-45.485,78.883l5.616,66.584
            c0,0,4.813,105.892,6.418,125.947c1.604,20.055,21.66,65.781,73.803,61.77c2.36-0.182,4.651-0.43,6.909-0.709
            c-1.291-7.037-4.034-16.723-4.979-17.94C398.784,496.373,396.496,495.391,394.34,494.401z"/>
        <path fill="#0F9C7F" d="M334.934,304.31c0,0-3.209,24.066,8.022,29.682s21.66,0,19.253-32.088
            c-2.407-32.088-4.011-36.902-12.033-38.506C342.154,261.792,332.528,272.221,334.934,304.31z"/>
        <g opacity="0.06">
            <g>
                <path fill="#074A3C" d="M342.916,314.491c-3.53-2.433-5.207-7.255-3.949-11.353c-0.701-0.024-1.401-0.047-2.101-0.071
                    c0.459,1.155-0.798,2.091-2.031,2.13c-0.445,4.372-1.829,23.818,8.122,28.794c0.122,0.061,0.244,0.114,0.366,0.172
                    c-0.098-5.199,0.381-10.409,1.477-15.493c0.173-0.8,0.355-1.662,0.029-2.413C344.479,315.449,343.641,314.991,342.916,314.491z"
                    />
            </g>
            <g>
                <path fill="#074A3C" d="M350.177,263.397c-2.926-0.585-6.061,0.455-8.752,3.539c2.209-0.23,4.525,0.271,6.071,1.836
                    c0.239,0.242,0.463,0.516,0.553,0.844c0.098,0.357,0.027,0.739-0.086,1.092c-0.402,1.255-1.299,2.283-1.898,3.456
                    c-0.599,1.173-0.85,2.717-0.002,3.726c0.894,1.065,2.51,1.02,3.823,1.477c2.211,0.769,3.635,3.323,3.126,5.608
                    c2.921-0.22,5.5-2.071,7.154-4.519C358.353,267.325,355.897,264.541,350.177,263.397z"/>
            </g>
        </g>
        <path fill="#0F9C7F" d="M383.067,289.87c0,0,0.802,34.495,15.242,42.517c14.44,8.022,33.693,2.407,32.891-36.099
            c-0.802-38.506-16.044-47.33-34.495-40.111C396.705,256.177,382.265,267.408,383.067,289.87z"/>
        <path opacity="0.25" fill="#E07F60" d="M380.216,454.871c0.292-34.31-0.32-55.184-0.764-65.33
            c-0.803,0.034-1.619,0.062-2.403,0.102c0.441,10.091,1.053,30.916,0.76,65.206c-0.295,34.706,10.522,53.383,18.05,62.165
            c0.816-0.039,1.618-0.055,2.45-0.119c0.239-0.018,0.469-0.046,0.707-0.066C391.888,509.066,379.911,490.673,380.216,454.871z"/>
        <g opacity="0.08">
            <path fill="#6D6E71" d="M410.972,462.627c-3.419-1.961-5.406-5.999-8.135-9.013c-0.21-0.232-0.456-0.474-0.768-0.498
                c-0.431-0.033-0.763,0.351-1.046,0.678c-2.238,2.588-5.907,3.561-9.322,3.342c-3.415-0.219-6.667-1.468-9.865-2.685
                c-0.659-0.251-1.407-0.499-2.045-0.199c-0.3,0.141-0.534,0.387-0.78,0.608c-2.08,1.87-5.131,2.047-7.927,2.127
                c-2.899,0.083-5.994,0.115-8.445-1.436c-1.982-1.255-3.294-3.51-3.405-5.853c-0.111-2.343,0.982-4.712,2.837-6.149
                c-3.127-3.318-5.483-7.359-6.83-11.714c-0.007-0.023-0.017-0.046-0.025-0.07l-2.333-0.004c0,0-2.125,12.205-1.178,23.29
                c0.27,3.16,0.79,6.229,1.679,8.898h57.759C411.145,463.95,411.078,463.466,410.972,462.627z"/>
        </g>
        <path opacity="0.08" fill="#6D6E71" d="M411.953,503.252c-52.144,4.011-72.199-41.715-73.803-61.77
            c-1.604-20.055-6.418-125.947-6.418-125.947l-5.615-66.584c0.719-22.29,7.577-42.308,19.386-57.487
            c-20.127,15.52-32.067,41.299-33.03,71.131l5.616,66.584c0,0,4.813,105.892,6.418,125.947c1.604,20.055,21.66,65.781,73.803,61.77
            c30.562-2.351,52.568-12.981,66.044-31.06C451.24,495.658,433.785,501.572,411.953,503.252z"/>
        <path opacity="0.08" fill="#6D6E71" d="M469.706,244.144c-3.209-20.857-24.066-66.583-73.803-68.188
            c-2.111-0.068-4.177-0.038-6.223,0.036c49.299,1.956,70.008,47.38,73.204,68.152c3.209,20.858,12.835,144.398,10.429,192.531
            c-1.543,30.859-13.326,53.458-35.313,66.773c-10.117,4.153-21.862,6.798-35.276,7.83c-52.144,4.011-72.199-41.715-73.803-61.77
            c-1.604-20.055-6.418-125.947-6.418-125.947l-5.615-66.584c0.681-21.099,6.869-40.155,17.542-55.006
            c-13.385,15.503-21.188,36.763-21.957,60.624l5.616,66.584c0,0,4.813,105.892,6.418,125.947
            c1.498,18.727,19.094,59.825,63.873,61.921l0,0l0,0c1.55,0.073,3.129,0.102,4.745,0.078c0.044-0.001,0.086,0.002,0.131,0.001
            c1.652-0.027,3.334-0.098,5.055-0.23c2.388-0.184,4.706-0.435,6.989-0.719c0.45-0.056,0.902-0.109,1.348-0.169
            c2.199-0.295,4.351-0.635,6.452-1.025c0.365-0.068,0.722-0.144,1.085-0.214c2.033-0.396,4.026-0.83,5.965-1.315
            c0.158-0.04,0.323-0.074,0.48-0.114c2.037-0.519,4.009-1.098,5.942-1.715c0.352-0.112,0.703-0.225,1.051-0.341
            c1.91-0.633,3.777-1.308,5.584-2.038c0.178-0.072,0.348-0.15,0.525-0.223c1.753-0.722,3.455-1.49,5.108-2.303
            c0.178-0.087,0.36-0.169,0.537-0.258c1.703-0.853,3.347-1.76,4.944-2.71c0.248-0.147,0.492-0.297,0.737-0.447
            c1.612-0.984,3.181-2.006,4.683-3.091l0.001-0.001l0,0c18.836-13.606,28.971-35.06,30.394-63.539
            C482.541,388.542,472.915,265.001,469.706,244.144z"/>
        <g opacity="0.15">
            <path fill="#E6E7E8" d="M422.066,197.964c-0.484,0-0.975-0.103-1.443-0.321c-20.292-9.488-43.874-7.087-44.111-7.065
                c-1.866,0.19-3.554-1.152-3.756-3.025c-0.204-1.872,1.147-3.554,3.02-3.758c1.039-0.109,25.674-2.646,47.738,7.668
                c1.706,0.797,2.442,2.827,1.645,4.534C424.578,197.236,423.349,197.964,422.066,197.964z"/>
        </g>
        <g opacity="0.2">
            <path fill="#A7A9AC" d="M350.177,263.397c-1.747-0.349-3.566-0.087-5.325,0.805c0.187,0.199,0.438,0.365,0.673,0.499
                c2.29,1.298,4.763,2.993,5.173,5.593c0.38,2.409-1.159,4.638-2.301,6.793c-1.44,2.717-2.322,5.689-3.195,8.637
                c-1.128,3.812-2.257,7.624-3.385,11.436c-0.747,2.523-1.497,5.066-1.736,7.686c-0.183,2.012-0.06,4.037,0.062,6.053
                c0.19,3.117,0.379,6.234,0.569,9.351c0.107,1.763-0.112,4.031-1.801,4.548c-1.044,0.32-2.098-0.255-2.998-0.919
                c1.193,4.364,3.323,8.252,7.043,10.112c4.331,2.165,8.538,2.65,11.941,0.601c0.073-0.656,0.133-1.312,0.168-1.965
                c0.361-6.619-0.723-13.222-1.101-19.84c-0.378-6.618,0.015-13.522,3.081-19.399c1.1-2.108,2.532-4.075,3.925-6.048
                C359.036,268.23,356.782,264.718,350.177,263.397z"/>
        </g>
        <g opacity="0.15">
            <path fill="#074A3C" d="M385.663,309.9c0.109-0.037,0.222-0.056,0.33-0.1c2.945-1.216,4.08-4.714,4.873-7.8
                c0.557-2.169,1.115-4.339,1.672-6.508c0.779-3.033,1.443-6.619-0.597-8.995c-0.93-1.083-2.285-1.709-3.321-2.692
                c-1.949-1.849-2.521-4.996-1.346-7.413c0.478-0.984,1.234-1.958,1.069-3.04c-0.159-1.042-1.101-1.689-2.154-2
                c-1.983,4.962-3.385,11.118-3.121,18.518C383.067,289.87,383.294,299.583,385.663,309.9z"/>
        </g>
        <g opacity="0.15">
            <path fill="#074A3C" d="M415.957,255.772c0.382,1.166,1.231,2.21,2.042,3.172c1.093,1.297,2.232,2.781,2.141,4.475
                c-0.13,2.414-2.657,4.025-3.321,6.35c-0.556,1.944,0.285,3.991,1.18,5.803c2.269,4.595,5.006,8.96,8.154,13.004
                c0.61,0.783,1.263,1.577,2.151,2.02c0.841,0.42,1.758,0.451,2.666,0.257C429.729,270.703,424.051,259.827,415.957,255.772z"/>
        </g>
    </g>
    <path fill="#15D498" d="M409.868,436.783c-0.808,7.117-0.502,16.921-0.211,22.612c0.128,2.51-1.869,4.605-4.383,4.605h-49.711
        c-2.052,0-3.873-1.408-4.29-3.418c-1.761-8.496-0.843-19.284-0.144-24.929c0.273-2.202,2.144-3.839,4.363-3.835l50.029,0.085
        C408.14,431.907,410.164,434.18,409.868,436.783z"/>
</g>
<g id="olhos">
    <path id="olho2" fill="#6D6E71" d="M431.201,296.465c-0.001-0.061,0-0.117-0.001-0.177c-0.113-5.418-0.521-10.227-1.174-14.508
        c-3.822-9.744-10.222-17.101-20.485-18.368c-18.461-2.279-23.475,21.651-24.695,39.222c1.871,11.279,5.689,24.603,13.464,29.402
        C412.221,340.623,430.592,335.131,431.201,296.465z"/>
    <path id="olho1" fill="#6D6E71" d="M344.451,334.665c10.639,4.38,20.058-2.104,17.758-32.763
        c-1.264-16.856-2.309-26.179-4.176-31.471c-4.789,3.867-10.125,10.849-13.472,21.845
        C340.853,304.458,342.741,323.279,344.451,334.665z"/>
    <g id="pup-close">
        <path fill="#F1F2F2" d="M419.969,305.112c-0.713-5.428-4.339-9.166-9.936-9.192c-5.694-0.026-9.81,4.653-11.122,9.793
            c-0.387,1.514,0.382,3.317,0,4.813c1.389-5.443,5.383-9.419,11.122-9.793c5.571-0.363,9.262,4.065,9.936,9.192
            C419.762,308.353,420.177,306.693,419.969,305.112z"/>
        <path fill="#F1F2F2" d="M362.154,301.169c-1.265-0.926-2.839-1.476-4.709-1.485c-4.555-0.021-7.848,3.722-8.898,7.835
            c-0.386,1.514,0.382,3.316,0,4.813c1.112-4.354,4.306-7.535,8.898-7.835c2.011-0.131,3.695,0.545,5.01,1.674
            c-0.058-1.373-0.133-2.783-0.245-4.268C362.191,301.651,362.172,301.417,362.154,301.169z"/>

    </g>
   <g id="pup-full">
        <path fill="#F1F2F2" d="M419.812,308.997c0.063,0.306,0.116,0.615,0.157,0.928c-0.206-1.572,0.208-3.232,0-4.813
            c-0.713-5.428-4.339-9.166-9.936-9.192c-5.694-0.026-9.81,4.653-11.122,9.793c-0.296,1.159,0.081,2.485,0.105,3.715
            c-0.063-0.306-0.116-0.615-0.157-0.928c0.206,1.572-0.208,3.232,0,4.813c0.713,5.428,4.339,9.166,9.936,9.192
            c5.694,0.026,9.81-4.653,11.122-9.793C420.213,311.554,419.836,310.228,419.812,308.997z"/>
        <path fill="#F1F2F2" d="M362.21,301.903c-0.019-0.252-0.037-0.486-0.056-0.734c-1.265-0.926-2.839-1.476-4.709-1.485
            c-4.555-0.021-7.848,3.722-8.898,7.835c-0.386,1.514,0.382,3.316,0,4.813c0.315-1.234,0.803-2.37,1.437-3.376l-1.437,3.376
            c0,0,0.129,7.418,2.916,8.418s3.333,3.003,10.31,0.626c0,0,0.982-10.204,0.682-15.206
            C362.397,304.798,362.321,303.387,362.21,301.903z"/>
    </g>
</g>
<g id="finger-1-left">
    <polygon fill="#939598" points="486.552,479.192 486.552,487.214 491.366,507.269 477.728,506.467 472.915,474.378     "/>
    <polygon fill="#808285" points="486.552,487.214 472.915,474.378 507.491,468.086 510.619,479.994     "/>
</g>
<g id="arm-right">
    <g>
        <g>
            <path fill="#FBBC5D" d="M512.229,483.71c-2.754,0-5.457-1.333-7.102-3.798c-2.611-3.918-1.553-9.213,2.364-11.826
                c1.246-0.83,2.468-1.236,4.317-1.85c13.483-4.478,31.47-13.678,31.998-41.757c0.7-37.095-36.917-65.958-69.346-79.402
                c-4.35-1.804-6.414-6.792-4.611-11.142c1.803-4.355,6.797-6.411,11.145-4.611c37.38,15.499,80.726,49.803,79.865,95.478
                c-0.374,19.794-8.254,45.858-43.677,57.621c-0.454,0.15-0.834,0.273-1.128,0.376C514.841,483.414,513.529,483.71,512.229,483.71z
                "/>
        </g>
    </g>
    <g>
        <path fill="#F7941E" d="M484.561,330.852c-1.193-0.528-2.383-1.038-3.566-1.529c-2.05-0.849-4.235-0.814-6.17-0.112
            c2.67,3.696,5.329,7.414,7.639,11.325c1.753,2.969,2.445,6.155,2.587,9.414c2.259,1.14,4.518,2.348,6.768,3.623
            c0.394-5.103,0.049-9.945-2.381-14.906C488.112,335.962,486.392,333.376,484.561,330.852z"/>
        <path fill="#F7941E" d="M496.445,336.681c1.029,2.553,1.87,4.983,2.52,6.774c1.858,5.12,2.537,10.48,2.061,15.767
            c2.01,1.333,3.993,2.718,5.941,4.155c1.767-7.214,1.119-14.304-1.023-21.206C502.803,340.217,499.627,338.392,496.445,336.681z"/>
        <path fill="#F7941E" d="M524.813,355.902c-2.547-2.164-5.166-4.243-7.845-6.229c0.562,3.691,0.747,7.312,0.9,9.238
            c0.328,4.147-0.198,8.253-1.423,12.141c1.757,1.571,3.463,3.187,5.105,4.849c2.866-5.638,3.376-13.743,3.293-18.858
            C524.835,356.679,524.825,356.295,524.813,355.902z"/>
        <path fill="#F7941E" d="M534.749,392.653c4.896-4.62,6.912-11.785,7.192-19.214c-2.378-2.991-4.922-5.875-7.61-8.646
            c0.401,2.797,0.608,5.629,0.572,8.568c-0.05,4.087-0.805,10.14-3.039,14.865C532.877,389.678,533.846,391.151,534.749,392.653z"/>
        <path fill="#F7941E" d="M542.083,409.931c5.574-3.777,9.669-8.937,11.867-15.973c0.078-0.25,0.148-0.508,0.224-0.761
            c-1.332-2.95-2.849-5.822-4.513-8.622c-0.703,7.758-3.896,15.602-8.831,21.121C541.3,407.093,541.719,408.504,542.083,409.931z"/>
        <path fill="#F7941E" d="M543.807,424.48c-0.016,0.874-0.099,1.675-0.148,2.513c5.79-0.484,11.341-2.094,15.927-6.228
            c0.404-0.364,0.784-0.742,1.162-1.12c-0.148-2.732-0.449-5.422-0.9-8.066c-3.679,6.93-9.417,9.63-16.074,10.376
            C543.798,422.794,543.823,423.633,543.807,424.48z"/>
        <path fill="#F7941E" d="M541.57,439.077c-0.419,1.341-0.89,2.616-1.409,3.831c6.371,0.809,12.811,0.184,18.602-2.047
            c0.356-1.396,0.661-2.788,0.917-4.17C554.391,439.835,547.996,440.397,541.57,439.077z"/>
        <path fill="#F7941E" d="M527.845,458.361c5.675,3.473,12.234,5.242,18.954,5.498c1.169-1.327,2.243-2.684,3.237-4.064
            c-6.213-0.174-12.326-1.965-17.517-5.45C531.038,455.839,529.469,457.171,527.845,458.361z"/>
    </g>
    <path opacity="0.2" fill="#638194" d="M551.632,425.404c0.853-45.289-41.753-79.388-78.913-95.07
        c-1.226,0.891-2.246,2.098-2.868,3.602c-1.803,4.35,0.261,9.339,4.611,11.142c32.428,13.444,70.046,42.308,69.346,79.402
        c-0.529,28.078-18.515,37.278-31.998,41.757c-1.85,0.613-3.072,1.02-4.317,1.85c-3.918,2.613-4.975,7.909-2.364,11.826
        c0.875,1.311,2.059,2.276,3.381,2.917C543.45,470.978,551.26,445.092,551.632,425.404z"/>
    <circle fill="#15D498" cx="513.427" cy="478.386" r="13.236"/>
    <path opacity="0.5" fill="#15D498" d="M516.234,489.216c-7.31,0-13.236-5.926-13.236-13.236c0-3.357,1.26-6.413,3.319-8.746
        c-3.68,2.351-6.127,6.462-6.127,11.153c0,7.31,5.926,13.237,13.237,13.237c3.953,0,7.492-1.742,9.917-4.49
        C521.289,488.445,518.854,489.216,516.234,489.216z"/>
    <circle opacity="0.5" fill="#15D498" cx="512.627" cy="474.792" r="9.326"/>
</g>
<g id="finger-1-right">
    <polygon fill="#A7A9AC" points="498.185,517.297 508.613,526.121 535.888,515.692 526.262,502.055 516.635,506.868     "/>
    <polygon fill="#939598" points="513.427,471.571 516.635,506.868 535.888,515.692 523.855,483.604     "/>
</g>
<g id="lights">
    <circle id="light1" fill="#8474A1" cx="361.16" cy="440.939" r="4.667"/>
    <circle id="light2" fill="#8474A1" cx="361.16" cy="454.583" r="4.667"/>
    <circle id="light3" fill="#8474A1" cx="379.519" cy="440.939" r="4.667"/>
    <circle id="light4" fill="#8474A1" cx="379.519" cy="454.583" r="4.667"/>
    <circle id="light5" fill="#8474A1" cx="397.877" cy="440.939" r="4.667"/>
    <circle id="light6" fill="#8474A1" cx="397.877" cy="454.583" r="4.667"/>
</g>
</svg>
        <button onClick={clicked}> Voice Command </button>
      </div>
      <div className="Timer">
        <Timer> </Timer>
      </div>
      {/* <button onClick={themechange}> Dark Theme </button>
      <button onClick={themechange2}> Light Theme </button> */}
    </div>

  );
}

export default App;

