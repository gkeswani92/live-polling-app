import React, { Component } from 'react';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion(question, i) {
        return (
            <div key={i} className="col-xs-12 col-sm-6 col-md-3">
                <span>{question.q}</span>

            </div>
        )
    }

    render() { 
        return (
            <div id="questions" className="row">
                <h2>Questions</h2>
                {this.props.questions.map(this.addQuestion)}
            </div>
        );
    }
}
 
export default Questions;