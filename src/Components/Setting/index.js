import React, { Component } from 'react';
import GlobalStore from '../../Store/global'
import './index.css';

export default class Setting extends Component {
    state = {
        order_arr: [3, 4, 5],
        curr_order: 3
    }

    start = () => {
        GlobalStore.dispatch({ type: 'restart', value: this.state.curr_order });
    }

    change_order = (e) => {
        this.setState({
            curr_order: e.target.value
        })
    }

    render() {
        return (
            <div className="setting-box">
                <h3>游戏设置(Game Setting)</h3>
                <div className="setting-order">
                    <label>阶(orders)：</label>
                    <select onChange={this.change_order}>
                        {this.state.order_arr.map((order, index) => {
                            return <option key={index} value={order}>{order}</option>
                        })}
                    </select>
                </div>
                <p>先完成{this.state.curr_order}个连成一条线者胜利</p>
                <p>The first one to make {this.state.curr_order} same icons in a line first is winner</p>
                <div className="setting-control">
                    <button onClick={this.start}>重新开始(Restart)</button>
                </div>
            </div>
        )
    }
}
