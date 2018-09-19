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
                {/* Display the below content only if the socket connection is active */}
                <Display if={this.props.status === 'connected'}>

                    {/* Display the list of audience members if we have a member name */}
                    <Display if={this.props.member.name}>
                        
                        <Display if={!this.props.currentQuestion}>
                            <h2>Welcome {this.props.member.name}</h2>
                            <p>{this.props.audience.length} audience members connected.</p>    
                        </Display>
                        <Display if={this.props.currentQuestion}>
                            <h2>{this.props.currentQuestion.q}</h2>
                        </Display>

                    </Display>

                    {/* Display the Join form if there is no member name */}
                    <Display if={!this.props.member.name}>
                        <h1>Join the session</h1>
                        <Join emit={this.props.emit} />
                    </Display>

                </Display>
            </div>
        );
    }
}

Audience.propTypes = {
    status: PropTypes.string.isRequired,
    emit: PropTypes.func.isRequired,
}

export default Audience;
