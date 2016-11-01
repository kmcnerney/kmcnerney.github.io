import React from 'react';

const ONE_SECOND = 1000;
const NIC_RETURN_DATE = '2016/11/03 08:45 PM';

export class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let diff = Math.abs(new Date() - new Date(NIC_RETURN_DATE));
    this.state = { countdown: diff };

    setInterval(() => this.tick(), ONE_SECOND);
  }

  tick() {
    let date = new Date(this.state.countdown - ONE_SECOND);
    let days = date.getUTCDate()-1;
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    this.setState({
      countdown: this.state.countdown - ONE_SECOND,
      days,
      hours,
      minutes,
      seconds
    });
  }

  render() {
    return (
      <div className="text-center">
        <h3>Nic returns to glory in...</h3>
        <h1 style={{color:"#FF1493"}}>{this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, and {this.state.seconds} seconds</h1>
      </div>
    );
  }
}