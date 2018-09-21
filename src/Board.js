import React, { Component } from 'react';
import Display from './parts/Display';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.formatBarGraphData = this.formatBarGraphData.bind(this);
    }

    formatBarGraphData(results) {
        console.log(results);
        return Object.keys(results).map((choice) => {
            return {
                label: choice,
                value: results[choice],
            };
        });
    }

    render() { 
        return (
            <div id="scoreboard">
                <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                    <BarChart data={this.formatBarGraphData(this.props.results)}
                              title={this.props.currentQuestion.q}
                              height={window.innerHeight * 0.6}
                              width={window.innerWidth * 0.9}
                    >
                        <XAxis dataKey="label"/>
                        <YAxis dataKey="value" />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </Display>

                <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                    <h3>Awaiting a question</h3>
                </Display>
            </div>
        );
    }
}
 
export default Board;