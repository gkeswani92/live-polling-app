import React, { Component } from 'react';

class Audience extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <h1>Audience: {this.props.status}</h1>
        );
    }
}
 
export default Audience;
