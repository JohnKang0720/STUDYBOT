export default class Timer extends React.Component(){
    constructor(props){
        super(props)
        this.state = {
            stopped: false,
            play: true,
            hours: 0,
            minutes: 0,
            seconds: 0

        }
    }
render(){
    return(
        <div>
            <div> {this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds} </div>
            <button> STOP </button>
            <button> START</button>
        </div>
    )
    }
}