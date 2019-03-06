import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {PaddingLeftProperty} from "csstype";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const formStyle = {
    paddingLeft: '2%',
    paddingTop: '1%'
};

class App extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        uniqueName: String,
        uniqueBaseName: String
    };

    constructor(props: any) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            uniqueName: String,
            uniqueBaseName: String
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    handleStart(date: Date) {
        this.setState({
            startDate: date
        });
    }

    handleEnd(date: Date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        fetch('http://localhost:9000/hello', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });
        return (
            <div className="App">
                <header className="App-header">
                    <div className="float-md-left" style={formStyle}>
                        <form>
                            <div className="form-group">
                                <label>Start</label>
                                <br />
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStart}
                                />
                                <br />
                                <label>End</label>
                                <br/>
                                <DatePicker
                                    selected={new Date()}
                                    onChange={this.handleEnd}
                                />
                                <br />
                                <label>Unique name</label>
                                <input type="something" className="form-control" id="something" placeholder="Unique name"/>
                                <label>Base item name</label>
                                <input type="something" className="form-control" id="something" placeholder="Base item name"/>
                                <br />
                                <button type="button" className="btn btn-primary btn-lg btn-block">Search</button>
                            </div>
                        </form>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
