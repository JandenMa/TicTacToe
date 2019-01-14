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
        info: 'Current player: X',
        val: 'X',
        isX: true,
        sq_arr: [],
        sq_obj: { 'X': [], 'O': [] },
        win_arr: [],
        isContinue: true
      })
      this.initSquare(GlobalStore.getState().orders);
      this.initWinResult(GlobalStore.getState().orders);
    })
  }

  state = {
    orders: 3,
    info: 'Current player: X',
    val: 'X',
    isX: true,
    sq_arr: [],
    sq_obj: { 'X': [], 'O': [] },
    win_arr: [],
    isContinue: true
  }

  componentWillMount = () => {
    this.initSquare(this.state.orders);
    this.initWinResult(this.state.orders);
  }

  initSquare = (orders) => {
    let arr_tmp = [];
    for (let i = 0; i < orders * orders; i++) {
      arr_tmp.push(i);
    }
    this.setState({
      sq_arr: arr_tmp
    })
  }

  initWinResult = (orders) => {
    let arr_tmp = [], arr_item = [];
    for (let i = 0; i < orders; i++) {
      for (let j = orders - 1; j >= 0; j--) {
        arr_item.push(orders * (i + 1) - j - 1);
      }
      arr_tmp.push(arr_item);
      arr_item = [];
    };
    for (let j = orders - 1; j >= 0; j--) {
      for (let i = 0; i < orders; i++) {
        arr_item.push(orders * (i + 1) - j - 1);
      }
      arr_tmp.push(arr_item);
      arr_item = [];
    };
    for (let i = 0; i < orders; i++) {
      arr_item.push(orders * (i + 1) - i - 1);
    }
    arr_tmp.push(arr_item);
    arr_item = [];
    for (let i = 0; i < orders; i++) {
      arr_item.push(orders * (i + 1) - orders + i);
    }
    arr_tmp.push(arr_item);
    arr_item = [];
    this.setState({
      win_arr: arr_tmp
    })
  }

  renderSquare = () => {
    return this.state.sq_arr.map((v, i) => {
      return <Square key={i} sq_id={i} value={this.state.val} status={this.state.isContinue}
        width={Math.round(100 / this.state.orders)}
        onClick={this.set_val} />
    })
  }

  set_val = (index) => {
    if (this.state.isX) {
      this.state.sq_obj.X.push(index);
      this.state.sq_obj.X.sort();
    } else {
      this.state.sq_obj.O.push(index);
      this.state.sq_obj.O.sort();
    }
    this.setState({
      val: !this.state.isX ? 'X' : 'O',
      isX: !this.state.isX,
      info: !this.state.isX ? 'Current player: X' : 'Current player: O'
    })
    this.judge();
  }

  judge = () => {
    const w = this.state.win_arr,x = this.state.sq_obj.X, o = this.state.sq_obj.O, orders = this.state.orders;
    if (x.length >= orders || o.length >= orders) {
      for (let k = 0, l = w.length; k < l; k++) {
        const item = w[k];
        let n = 0;
        for (let i = 0; i < x.length; i++) {
          for (let j = 0; j < orders; j++) {
            if (x[i] === item[j]) {
              n++;
            }
          }
        }
        if (n == orders) {
          this.setState({
            info: 'The Winner is X!',
            isContinue: false
          })
          break;
        } else {
          n = 0;
          for (let i = 0; i < o.length; i++) {
            for (let j = 0; j < orders; j++) {
              if (o[i] === item[j]) {
                n++;
              }
            }
          }
          if (n == orders) {
            this.setState({
              info: 'The Winner is O!',
              isContinue: false
            })
            break;
          }
        }
      }
    }
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
