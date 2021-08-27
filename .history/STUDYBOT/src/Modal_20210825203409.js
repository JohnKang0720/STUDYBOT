import React from 'react'
import ReactDOM from 'react-dom'

export default function Modal(props) {
    const [open, setOpen] = props.state
    return ReactDOM.createPortal(
        <>
            <div className="modal-container">
                <div className="modal-frame">
                    <button className="close-btn" onClick = {() => setOpen(!open)}> X </button>
                    <div className="modal-info">
                        <div className="modal-text">
                            <h1 style={{margin: '40px'}}> What is STUDYBOT </h1>
                            <p> STUDYBOT is the ultimate application if you want to achieve success in school or work that contains multiple features that helps you maximize your productivity. This includes a Pomodoro timer to track your studying time, a bad posture detector that detects bad posture during studying, and finally a virtual bot that can play music, inspire you and provide you with resources. Lastly, all of your performances will be tracked and sent to your email and this way, you can enhance your studying habits and achieve things you wish. </p>
                        </div>
                        <div className="modal-image">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('react-modal')
    )
}