import React, { Component } from 'react';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.addQuestion = this.addQuestion.bind(this);
        this.askQuestion = this.askQuestion.bind(this);
    }

    askQuestion(question) {
        console.log('Asked questions %s', question);
        // emit an ask event and send the question to the server
        this.props.emit('ask', question);
    }

    addQuestion(question, i) {
        return (
            <div key={i} className="col-xs-12 col-sm-6 col-md-3">
                {/* the onclick property of this span calls the askQuestion method 
                with that question */}
                <span onClick={() => {this.askQuestion(question)}}>{question.q}</span>
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