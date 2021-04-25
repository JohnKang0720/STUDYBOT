import React from 'react'

 class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stopped: true,
            started: false,
            hours: 0,
            minutes: 0,
            seconds: 0

        }
    }
    handlestop = (e) => {
    e.preventDefault();
  this.setState({started: false, stopped: true})
  //clearInterval(this.timer)
    }
    handlestart = (e) => {
e.preventDefault();
if(this.state.stopped){
    setInterval (() => {
    this.setState({started: true, stopped: false})
    if(this.state.started){
        if(this.state.seconds >= 60){
            this.setState((prevState) => ({minutes: prevState + 1, seconds: 0}))
        }
        if(this.state.minutes >= 60){
            this.setState((prevState) => ({hours: prevState + 1, minutes: 0, seconds: 0}))
        }
        this.setState((prevState) => ({ seconds: prevState.seconds + 1 }))
        // if(this.state.minutes >= 25){

        // }
    }

    },1000)
}
    }
render(){
    return(
        <div>
            <div> {this.state.hours + ':' + this.state.minutes + ":" + this.state.seconds} </div>
            <button onClick = {this.handlestop.bind(this)}> STOP </button>
            <button onClick = {this.handlestart.bind(this)}> START</button>
        </div>
    )
    }
}
export default Timer