import React from 'react';

export class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let diff = Math.abs(new Date() - new Date('2016/11/03 08:45 PM'));
    this.state = { countdown: diff };

    setInterval(() => this.tick(), 1000);
  }

  tick() {
    console.log(this.state.countdown);
    let date = new Date(this.state.countdown - 1000);
    let days = date.getUTCDate()-1;
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
console.log(seconds);
    this.setState({
      countdown: this.state.countdown - 1000,
      days,
      hours,
      minutes,
      seconds
    });
  }

  render() {
    return (
      <div>
        <h3>Nic returns to glory in...</h3>
        <h1>{this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, and {this.state.seconds} seconds</h1>
      </div>
    );
  }
}