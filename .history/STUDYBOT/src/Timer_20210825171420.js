import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stopped: true,
            started: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            rounds: 0

        }
    }
    handlestop = (e) => {
        e.preventDefault();
        this.setState({ started: false, stopped: true })
        clearInterval(this.timer)
    }

    handleClear = (e) => {
        e.preventDefault()
        this.setState({ hours: 0, minutes: 0, seconds: 0 })
    }


    handlestart = (e) => {
        e.preventDefault();
        if (this.state.stopped) {
            this.timer = setInterval(() => {
                this.setState({ started: true, stopped: false })
                if (this.state.started) {
                    if (this.state.seconds >= 60) {
                        this.setState((prevState) => ({ minutes: prevState.minutes + 1, seconds: 0 }))
                    }
                    if (this.state.minutes >= 25) {
                        this.setState((prevState) => ({ hours: 0, minutes: 0, seconds: 0 }))
                    }
                    this.setState((prevState) => ({ seconds: prevState.seconds + 1 }))

                    if (this.state.minutes === 25) {
                        alert("Horray! You have completed a round!")
                        this.setState((prevState) => ({ rounds: prevState.rounds + 1 }))
                    }
                    switch (this.state.minutes) {
                        case 20:
                            alert('5 mins left! Drink water and stretch. They are essential for your health!')
                            break;
                        case 10:
                            alert('10 minutes in! Try your best!')
                            break;
                        case 15:
                            alert('15 minutes in! Drink some water and stay focused')
                            break;
                        default:
                            break;

                    }

                }

            }, 1000)
        }
    }
    render() {
        return (
            <div className="timer-inner">
                <p> Rounds Completed: {this.state.rounds} </p>
                <p> {Math.round((this.state.seconds + (this.state.minutes * 60))/1500 * 100)}% Complete </p>
                <progress id="file" value={(this.state.seconds + (this.state.minutes * 60) )} max="1500"> </progress>
                <div style={{ color: "orange" }} className="clock"> {this.state.minutes + "m :" + this.state.seconds + "s"} </div>
                <div className="btns">
                    <button onClick={this.handlestop.bind(this)}> STOP </button>
                    <button onClick={this.handlestart.bind(this)}> START</button>
                    <button onClick={this.handleClear.bind(this)}> CLEAR </button>
                </div>
            </div>
        )
    }
}
export default Timer