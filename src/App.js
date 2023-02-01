import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0,
    color: '#f11946'
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
    if (progress >= 70){
      this.setState({color: "#28a745"});
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        <LoadingBar
          color={this.state.color}
          height={3}
          progress={this.state.progress}
        />
        <News setProgress={this.setProgress}/>
      </div>
    )
  }
}

