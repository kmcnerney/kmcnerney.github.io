import React from 'react';

const ONE_SECOND = 1000;

export class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let diff = Math.abs(new Date() - new Date('2016/11/03 08:45 PM'));
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
      <div>
        <h3>Nic returns to glory in...</h3>
        <h1>{this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, and {this.state.seconds} seconds</h1>
      </div>
    );
  }
}