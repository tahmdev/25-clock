import './App.css';
import React from "react"
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}
var interval = null;

class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sessionLength: 25,
      minutesRemaining: 25,
      secondsRemaning: 0,
      breakLength: 5,
      onBreak: false,
      pause: false,
    }
    this.timerStartStop = this.timerStartStop.bind(this)
    this.checkTime = this.checkTime.bind(this)
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
    this.reset = this.reset.bind(this)
  }
  
  timerStartStop(){
    this.setState({
      pause: !this.state.pause
    })

    if (!this.state.pause){
      interval = setInterval(() => {
        this.checkTime();
        if (this.state.secondsRemaning == 0){
          this.setState({
            secondsRemaning: 59,
            minutesRemaining: this.state.minutesRemaining -1
          })
        }
        else{
          this.setState({
            secondsRemaning: this.state.secondsRemaning -1
          })
        }
      }, 1);
    }
    else{
      clearInterval(interval)
    }
  }

  checkTime(){
    let alarm = document.getElementById("alarm")
    alarm.volume = 0.1;
    if (this.state.minutesRemaining <= 0 && this.state.secondsRemaning <= 0){ 
      if (this.state.onBreak){
        this.setState({
          onBreak: false,
          minutesRemaining: this.state.sessionLength,
          secondsRemaning: 0
        })
        alarm.play();
      }
      else{
        this.setState({
          onBreak: true,
          minutesRemaining: this.state.breakLength,
          secondsRemaning: 0
        })
        alarm.play();
      }
    }
  }
  decrement(event){
    if (event.target.id == "break-controls" && this.state.breakLength >= 2){
    this.setState({
      breakLength: this.state.breakLength -1
    })
    }
    else if (this.state.sessionLength >= 2){
      this.setState({
        sessionLength: this.state.sessionLength -1
      })
    }
    if (!this.state.pause){
      if(!this.state.onBreak && event.target.id == "session-controls" && this.state.sessionLength >= 2){
        console.log("owo")
        this.setState({
          minutesRemaining: this.state.sessionLength - 1,
          secondsRemaning: 0
        })
      }
      else if (this.state.onBreak && event.target.id == "break-controls" && this.state.breakLength >= 2){
        this.setState({
          minutesRemaining: this.state.breakLength - 1,
          secondsRemaning: 0
        })
      }
    }
  }
  increment(event){
    if (event.target.id == "break-controls"){
      this.setState({
        breakLength: this.state.breakLength +1
      })
    }
    else{
      this.setState({
        sessionLength: this.state.sessionLength +1,
      })
    }
    if (!this.state.pause){
      if(!this.state.onBreak && event.target.id == "session-controls"){
        console.log("owo")
        this.setState({
          minutesRemaining: this.state.sessionLength + 1,
          secondsRemaning: 0
        })
      }
      else if (this.state.onBreak && event.target.id == "break-controls"){
        this.setState({
          minutesRemaining: this.state.breakLength + 1,
          secondsRemaning: 0
        })
      }
    }
    // if in session and clicked session up do thing
  }
  reset(){
    this.setState({
      sessionLength: 25,
      minutesRemaining: 25,
      secondsRemaning: 0,
      breakLength: 5,
      onBreak: false,
      pause: false,
    })
  }
  render(){
    
    let formattedMinutes = this.state.minutesRemaining.toLocaleString("en-US", {minimumIntegerDigits: 2})
    let formattedSeconds = this.state.secondsRemaning.toLocaleString("en-US", {minimumIntegerDigits: 2})
    return(
      <div id="clock-wrapper">
        <h1>25 + 5 Clock</h1>
        <div className='flex-container' id="control-flex">
          <Control id="break-controls" labelText="Break" length={this.state.breakLength} decrement={this.decrement} increment={this.increment}/>
          <Control id="session-controls" labelText="Session" length={this.state.sessionLength} decrement={this.decrement} increment={this.increment}/>
        </div>
        
        
        <div id="timer-wrapper">
          <label id="timer-label">{this.state.onBreak ? "Break" : "Session"}</label>
          <span id="timer">{formattedMinutes}:{formattedSeconds}</span>
        </div>
        <div className="flex-container" id="timer-controls">
          <i className={this.state.pause ? "fa fa-pause" : "fa fa-play"} onClick={this.timerStartStop}/>
          <i className="fa fa-refresh red" onClick={this.reset}/>
        </div>
        <audio id="alarm" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>
      </div>
    )
  }
}

const Control = (props) => {
  return(
    <div className="outer-flex-container">
      <label>{props.labelText}</label>
      <div className='flex-container'>
       
        <span>
           <i id={props.id} className="fa fa-arrow-down " onClick={props.decrement}/> {props.length} <i id={props.id} className="fa fa-arrow-up" onClick={props.increment}/>
        </span>
        
      </div>
      
    </div>
    
  )
}

export default App;
