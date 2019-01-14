import React, { Component } from 'react'
import GlobalStore from '../../Store/global'
import './index.css'

export default class Square extends Component {
    constructor(...args) {
        super(...args);
        GlobalStore.subscribe(() => {
            this.setState({
                val: null
            })
        })
    }

    state = {
        val: null
    }

    set_val = (e) => {
        if (e.target.value || !this.props.status) return;
        this.props.onClick(this.props.sq_id);
        this.setState({
            val: this.props.value
        })
    }

    render() {
        return (
            <div style={{ width: `${this.props.width}%`, height: `${this.props.width}%` }}
                className="square-box">
                <button onClick={this.set_val} value={this.state.val}>
                    {this.state.val}
                </button>
            </div>
        )
    }
}
