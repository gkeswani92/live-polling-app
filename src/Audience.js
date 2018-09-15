import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Display from './parts/Display';
import Join from './parts/Join';


class Audience extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div> 
                <Display if={this.props.status === 'connected'}>
                    <h1>Join the session</h1>
                    <Join />
                </Display>
            </div>
        );
    }
}

Audience.propTypes = {
    status: PropTypes.string.isRequired,
}

export default Audience;
