import React, { Component } from 'react';


class JoinSpeaker extends Component {
    constructor(props) {
        super(props);
        this.startPresentation = this.startPresentation.bind(this);
    }

    startPresentation() {
        // Access the value in the DOM element referred to by this.refs.name and this.refs.title
        // and emit a start event with those details
        var speakerName = this.refs.name.value;
        var title = this.refs.title.value;
        this.props.emit('start', {
            name: speakerName,
            title: title,
        });
    }

    render() { 
        return (
            /* Avoid submitting the form to the backend by using the javascript:void(0) and
            instead use onSubmit to call an event handler  */
            <form action="javascript:void(0)" onSubmit={this.startPresentation}>
                <label>Full Name</label>
                <input ref="name"
                       className="form-control"
                       placeholder="Enter your full name"
                       required />

                <label>Presentation Title</label>
                <input ref="title"
                       className="form-control"
                       placeholder="Enter a title for this presentation"
                       required />
                <button className="btn btn-primary">Start</button>
            </form>
        );
    }
}
 
export default JoinSpeaker;