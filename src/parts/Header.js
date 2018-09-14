import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>{this.props.title}</h1>
            </header>
        )
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;