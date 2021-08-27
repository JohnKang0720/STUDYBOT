import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stopped: true,
            started: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            rounds: 0,

        }
    }
    handlestop = (e) => {
        e.preventDefault();
        this.setState({ started: false, stopped: true })
        this.getHighScore(this.state.minutes, this.state.seconds, this.state.rounds)
        clearInterval(this.timer)
    }

    handleClear = (e) => {
        this.getHighScore(this.state.minutes, this.state.seconds, this.state.rounds)
        e.preventDefault()
        this.setState({ hours: 0, minutes: 0, seconds: 0 })
    }


    handlestart = (e) => {
        e.preventDefault();
        this.setState({ sum: this.state.seconds + this.state.minutes })
        console.log(this.state.sum)
        if (this.state.stopped) {
            this.timer = setInterval(() => {
                this.setState({ started: true, stopped: false })
                if (this.state.started) {
                    if (this.state.seconds === 60) {
                        this.setState((prevState) => ({ minutes: prevState.minutes + 1, seconds: 0 }))
                    }
                    if (this.state.minutes === 25) {
                        this.setState((prevState) => ({ hours: 0, minutes: 0, seconds: 0 }))
                        alert("Horray! You have completed a round!")
                        this.setState((prevState) => ({ rounds: prevState.rounds + 1 }))
                    }
                    this.setState((prevState) => ({ seconds: prevState.seconds + 1 }))

                    if (this.state.minutes === 10 && this.state.seconds === 1) {
                        alert('10 minutes in! Keep trying your best!')
                    } else if (this.state.minutes === 15 && this.state.seconds === 1) {
                        alert('15 minutes in! Drink some water and stay focused')
                    } else if (this.state.minutes === 20 && this.state.seconds === 1) {
                        alert('5 mins left! Drink water and stretch. They are essential for your health!')
                    }

                }

            }, 1000)
        }
    }
    //get highscore function
    getHighScore(minutes, seconds, rounds) {
        console.log(minutes, seconds, rounds)
        localStorage.setItem('highscore', rounds)
        localStorage.setItem('highestTime', minutes, seconds)
    }

    render() {
        return (
            <div className="timer-inner">
                <p> Rounds Completed: {this.state.rounds} </p>
                <p> {Math.round((this.state.seconds + (this.state.minutes * 60)) / 1500 * 100)}% Complete </p>
                <progress id="file" value={(this.state.seconds + (this.state.minutes * 60))} max="1500"> </progress>
                <div style={{ color: "orange" }} className="clock"> {this.state.minutes + "m :" + this.state.seconds + "s"} </div>
                <div className="btns">
                    <Button variant="contained" color="primary" onClick={this.handlestop.bind(this)}> STOP </Button>
                    <Button variant="contained" color="secondary" onClick={this.handlestart.bind(this)}> START</Button>
                    <Button variant="contained" color="primary" onClick={this.handleClear.bind(this)}> CLEAR </Button>
                </div>
            </div>
        )
    }
}
export default Timer