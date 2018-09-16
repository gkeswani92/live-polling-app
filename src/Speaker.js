import React, { Component } from 'react';
import Display from './parts/Display';
import JoinSpeaker from './parts/JoinSpeaker';
import Attendance from './parts/Attendance';
import Questions from './parts/Questions';


class Speaker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return (
            <div>
                {/* Display things in this component only if the status of the socket 
                is connected */}
                <Display if={this.props.status === 'connected'} >
                    
                    {/* Display the attendance and question form if we have a member who is the speaker */}
                    <Display if={this.props.member.name && this.props.member.type === 'speaker'} >
                        <Questions questions={this.props.questions} />
                        <Attendance audience={this.props.audience} />
                    </Display>

                    {/* Display the speaker join form is we do not have a member */}
                    <Display if={!this.props.member.name} >
                        <h2>Start the Presentation</h2>
                        <JoinSpeaker emit={this.props.emit} />
                    </Display>

                </Display>
            </div>
        );
    }
}
 
export default Speaker;