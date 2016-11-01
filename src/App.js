import React from 'react';
import { Countdown } from './components/counter';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Countdown />
      </div>
    );
  }
}