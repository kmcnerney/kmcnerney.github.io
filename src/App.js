import React from 'react';
import { Countdown } from './components/counter';

export class App extends React.Component {
  render() {
    let centeredStyle = {
      textAlign: "center"
    };

    return (
      <div style={centeredStyle}>
        <img width="250" height="350" src={"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/388050_269056213136987_62927847_n.jpg?oh=bfae77dfaf54d408438173e8efdf81fa&oe=589F2F57"} />
        <Countdown />
      </div>
    );
  }
}