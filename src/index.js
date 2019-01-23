import React, { Component } from 'react';
import { render, Window, App, Box } from 'proton-native';

import Timer from './components/Timer';
import ControlButtons from './components/ControlButtons';
import BreakButtons from './components/BreakButtons';

const POMODORO_LEN = 1500;

class PomodoroTimer extends Component {
  state = {
    timeInSeconds: POMODORO_LEN
  };

  componentWillMount() {
    this.refreshTimer();
  }

  startTimer = () => {
    if (!this.intervalId && this.state.timeInSeconds > 0) {
      this.intervalId = setInterval(() => {
        this.updateTime();
        this.refreshTimer();
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  resetTimer = (newTime = POMODORO_LEN) => {
    this.stopTimer();
    this.setState({ timeInSeconds: newTime });
    this.refreshTimer();
  };

  updateTime = () => {
    const { timeInSeconds } = this.state;

    if (timeInSeconds > 0) {
      this.setState({ timeInSeconds: timeInSeconds - 1 });
    } else {
      this.stopTimer();
    }
  };

  refreshTimer = () => {
    const { timeInSeconds } = this.state;

    let minutes = Math.floor(timeInSeconds / 60);
    // Add 0 if minutes less than 10.
    minutes = minutes <= 9 ? `0${minutes}` : minutes;

    let seconds = timeInSeconds % 60;
    // Add 0 if seconds less than 10.
    seconds = seconds <= 9 ? `0${seconds}` : seconds;

    this.setState({ minutes, seconds });
  };

  render() {
    return (
      <App>
        <Window
          title="Pomodoro Timer"
          size={{ w: 500, h: 300 }}
          menuBar={false}
          margined
        >
          <Box padded={true}>
            <Timer minutes={this.state.minutes} seconds={this.state.seconds} />
            <ControlButtons
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              resetTimer={this.resetTimer}
            />
            <BreakButtons
              startTimer={this.startTimer}
              resetTimer={this.resetTimer}
            />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<PomodoroTimer />);
