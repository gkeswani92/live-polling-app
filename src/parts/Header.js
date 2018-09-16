import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

    render() {
        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.speaker}</p>
                </div>
                <div className="col-xs-2">
                    <span id="connection-status" className={this.props.status}></span>
                </div>
            </header>
        )
    }
}

// Defining prop types for property type validation
Header.propTypes = {
    title: PropTypes.string.isRequired,
    speaker: PropTypes.string,
};

// Default value of the property that should be used if not passed in
Header.defaultProps = {
    status: 'disconnected'
};

export default Header;