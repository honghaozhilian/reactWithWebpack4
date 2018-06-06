import React, {Component} from 'react';
import {connect} from 'react-redux';
import {increment,decrement,reset} from "./action";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.props.increment();
        console.log(this.props.counter)
    }
    render() {
        return (
            <div>
                this is home~计数页面<br/>
                当前计数值：{this.props.counter.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}

export default connect((state) => ({counter:state.counter}),{increment,decrement,reset})(Home);