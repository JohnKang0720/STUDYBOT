import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const scores= []
const times = []
const times2 = []

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
            highscore: 0,
            hightime: 0,
            hightime2: 0
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
        

        // scores.push(rounds)
        // times.push(minutes)
        // times2.push(seconds)

        

        // scores.sort()
        // times.sort()
        // times2.sort()
        
        // const highscore = scores[scores.length - 1]
        // const hightime = times[times.length - 1]
        

        // this.setState({highscore: highscore, hightime: hightime, hightime2: hightime2})

        const x = JSON.parse(localStorage.getItem('scores')) || []
        x.push(seconds)
        x.sort()
        const hightime2 = x[x.length - 1]

        // localStorage.setItem('highscore', hightime2)
        // localStorage.setItem('hightime', hightime)
        localStorage.setItem('hightime2', hightime2)

        console.log(hightime2)

        

    }
    render() {
        return (
            <div className="timer-inner">
                <p style={{fontSize: '2rem', background: 'orange', margin: '5px', borderRadius: '10px'}}> High Score: </p>
                <p style={{fontSize: '2rem', background: 'orange', margin: '5px', borderRadius: '10px'}}> Rounds Completed: <strong> {this.state.rounds} </strong> </p>
                <strong> {Math.round((this.state.seconds + (this.state.minutes * 60)) / 1500 * 100)}% Complete </strong>
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