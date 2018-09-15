import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            /* Render the children if the if property is true, else display nothing */
            (this.props.if) ? <div>{this.props.children}</div> : null
        );
    }
}
 
Display.propTypes = {
    if: PropTypes.bool,
};

export default Display;