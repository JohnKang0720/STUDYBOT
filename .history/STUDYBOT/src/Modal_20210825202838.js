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
                            <h1> What is STUDYBOT </h1>
                            <p> Foodies aims to remove all concerns for all 'foodies' in the world. Firstly, the recipe generator saves your time by picking the meal that you want along with clear recipe ingredients and video instructions. Next, the main feature of our website, Mealbuddy. Based on what type of food you like, your age, your location, it will match you with a random person that have the same attributes as you. Hence, this gives you the opportunity to both network and enjoy your favourite meal together. This is what we call, hitting 2 birds with 1 stone. </p>
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