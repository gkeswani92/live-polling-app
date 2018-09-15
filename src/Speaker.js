import React, { Component } from 'react';

class Speaker extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <h1>Speaker: {this.props.status}</h1>
        );
    }
}
 
export default Speaker;