import React, { Component } from 'react';
import Square from '../Square';
import GlobalStore from '../../Store/global';
import './index.css';

export default class Board extends Component {
  constructor(...args) {
    super(...args);
    GlobalStore.subscribe(() => {
      this.setState({
        orders: GlobalStore.getState().orders,
        info: 'Next player: X',
        val: 'X',
        isX: true,
        arr: []
      })
      this.initComponent(GlobalStore.getState().orders);
    })
  }

  state = {
    orders: 3,
    info: 'Next player: X',
    val: 'X',
    isX: true,
    arr: []
  }

  componentWillMount = () => {
    this.initComponent(this.state.orders);
  }

  initComponent = (orders) => {
    let arr_tmp = [];
    for (let i = 0; i < orders * orders; i++) {
      arr_tmp.push(i);
    }
    this.setState({
      arr: arr_tmp
    })
  }

  renderSquare = () => {
    return this.state.arr.map((v, i) => {
      return <Square key={i} value={this.state.val}
        width={Math.round(100 / this.state.orders)}
        onClick={this.set_val} />
    })
  }

  set_val = () => {
    this.setState({
      val: !this.state.isX ? 'X' : 'O',
      isX: !this.state.isX,
      info: !this.state.isX ? 'Next player: X' : 'Next player: O'
    })
  }

  render() {
    return (
      <div className="board-box" >
        <div className="board-info">
          <span>{this.state.info}</span>
        </div>
        <div className="board-square">
          {this.renderSquare()}
        </div>
      </div>
    )
  }
}
