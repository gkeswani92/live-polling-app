import React, { Component } from 'react';

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.join = this.join.bind(this);
    }

    join() {
        // Access the value in the DOM element referred to by this.refs.name
        var memberName = this.refs.name.value;
        console.log(memberName);
    }

    render() { 
        return (
            /* Avoid submitting the form to the backend by using the javascript:void(0) and
            instead use onSubmit to call an event handler  */
            <form action="javascript:void(0)" onSubmit={this.join}>
                <label>Full Name</label>
                <input ref="name"
                       className="form-control"
                       placeholder="Enter your full name"
                       required />
                <button className="btn btn-primary">Join</button>
            </form>
        );
    }
}
 
export default Join;