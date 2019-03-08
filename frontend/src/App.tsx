import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {PaddingLeftProperty} from "csstype";
import DatePicker from "react-datepicker";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import "react-datepicker/dist/react-datepicker.css";

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2400, amt: 2400}, {name: 'Page C', uv: 600, pv: 2400, amt: 2400}];

const formStyle = {
    paddingLeft: '2%',
    paddingTop: '1%'
};

const formStyle2 = {
    paddingLeft: '50%',
    paddingTop: '1%'
};

class App extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        uniqueName: "",
        uniqueBaseName: "",
        data: []
    };

    constructor(props: any) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            uniqueName: "",
            uniqueBaseName: "",
            data: []
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
            endDate: date
        });
    }


    sendRequest() {
        fetch('http://localhost:9000/handleReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => {
           response.json().then(json => {
               let result = json.map((x: [number, string]) => {
                   let index = x[0];
                   let price = x[1];
                   return {name: index.toString(10), uv: parseFloat(price), pv: 2400, amt: 2400};
               });

               this.setState({data: result});
           });
        });
    }

    render() {

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
                                    selected={this.state.endDate}
                                    onChange={this.handleEnd}
                                />
                                <br />
                                <label>Unique name</label>
                                <input type="something" className="form-control" id="something" placeholder="Unique name" value={this.state.uniqueName} onChange={e => this.setState({uniqueName: e.target.value})}/>
                                <label>Base item name</label>
                                <input type="something" className="form-control" id="something" placeholder="Base item name" value={this.state.uniqueBaseName} onChange={e => this.setState({uniqueBaseName: e.target.value})}/>
                                <br />
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ () => this.sendRequest() }>Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="myCenter">
                        <LineChart width={1100} height={500} data={this.state.data}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
