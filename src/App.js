import React, { Component } from 'react'
import Canvas from './components/Canvas'

export default class App extends Component {

  render() {
    return (
      <div className="root" style={{'paddingLeft':'50px'}}>
        <Canvas></Canvas>
      </div>
    )
  }
}
