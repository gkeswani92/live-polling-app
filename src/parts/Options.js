import React, { Component } from 'react';

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
        }
        this.addChoice = this.addChoice.bind(this);
    }

    componentWillMount() {
        // Need to do this in componentWillMount since it is called only once i.e. the 
        // first time the component will mount
        this.setChoices();
    }

    componentWillReceiveProps() {
        // Need to do this since we want to update the choices whenever we re-render with new props
        this.setChoices();
    }

    setChoices() {
        var choices = Object.keys(this.props.question);
        choices.shift();
        this.setState({
            choices: choices,
        });
    }

    addChoice(choice, i) {
        var buttonTypes = ['primary', 'success', 'warning', 'danger']
        return (
            <button key={i} className={"col-xs-12 col-sm-6 col-md-3 btn btn-" + buttonTypes[i]}> 
                {choice}: {this.props.question[choice]}
            </button>
        )
    }

    render() { 
        return (
            <div id="currentQuestion">
                <h2>{this.props.question.q}</h2>
                <div className="row">
                    {this.state.choices.map(this.addChoice)}
                </div>
            </div>
        );
    }
}
 
export default Options;