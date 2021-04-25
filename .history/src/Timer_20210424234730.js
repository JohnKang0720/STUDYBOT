import React from 'react'

 class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stopped: false,
            started: true,
            hours: 0,
            minutes: 0,
            seconds: 0

        }
    }
    handlestop = (e) => {
    e.preventDefault();

    }
    handlestart = (e) => {
e.preventDefault();
if(this.state.stopped){
    setInterval (() => {
    this.setState({started: true, stopped: false})
    if(this.state.started === true){



        this.setState((prevState) => ({ seconds: prevState.seconds + 1 }))

    }
    },1000)
}
    }
render(){
    return(
        <div>
            <div> {this.state.hours + ':' + this.state.minutes + this.state.seconds} </div>
            <button onClick = {this.handlestop.bind(this)}> STOP </button>
            <button onClick = {this.handlestart.bind(this)}> START</button>
        </div>
    )
    }
}
export default Timer