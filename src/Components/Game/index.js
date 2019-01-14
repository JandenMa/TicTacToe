import React, { Component } from 'react';
import Board from '../Board';
import Setting from '../Setting'
import './index.css';

export default class Game extends Component {
  render() {
    return (
      <div className="game-box">
      <div className="game-title">井字棋(Tic-Tac-Toe)</div>
        <div className="game-setting">
          <Setting />
        </div>
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}
