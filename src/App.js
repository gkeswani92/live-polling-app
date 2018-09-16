import React, { Component } from 'react';
import Header from './parts/Header';
import Audience from './Audience';
import Speaker from './Speaker';
import Board from './Board';
import Error from './Error';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

var io = require('socket.io-client');

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'disconnected',
        title: '',
        member: {},  // member that is using this particular socket
        audience: {},  //  information about the entire audience for this presentation
        speaker: '',  // information about who is giving the presentation
      };
      this.connect = this.connect.bind(this);
      this.disconnect = this.disconnect.bind(this);
      this.updateState = this.updateState.bind(this);
      this.emit = this.emit.bind(this);
      this.joined = this.joined.bind(this);
      this.updateAudience = this.updateAudience.bind(this);
    }

    componentWillMount() {
      // Add a socket to the client when it is about to mount
      console.log('Attempting to create a socket to the backend');
      this.socket = io('http://localhost:3300');
      
      // Add a listener to this socket for the mentioned events
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('welcome', this.updateState);
      this.socket.on('joined', this.joined);
      this.socket.on('audience', this.updateAudience);
      this.socket.on('start', this.updateState);
    }

    connect() {
      // Alert the user with the id of the socket connection
      console.log('Connected: ' + this.socket.id);
      
      // If there is a member in the session storage, set the member to that member, else null.
      // And if we did find a member, emit the join event to the server
      var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
      if (member) {
        this.emit('join', member);
      }

      this.setState({
        status: 'connected'
      });
    }

    disconnect() {
      // Alert the user with the id of the socket connection
      console.log('Disconnected: ' + this.socket.id);
      this.setState({
        status: 'disconnected'
      });
    }

    updateState(serverState) {
      // Event handler for the welcome event on the socket
      this.setState(serverState);
    }

    emit(eventName, payload) {
      // Emit the event and payload on the socket that is connected to the backend
      this.socket.emit(eventName, payload);
    }

    joined(member) {
      // Save the member object in session storage 
      sessionStorage.member = JSON.stringify(member);
      this.setState({
        member: member,
      });
    }

    updateAudience(newAudience) {
      this.setState({
        audience: newAudience,
      })
    }

    render() {
        return (
          <BrowserRouter>
            <div>
              {/* Keep Header out of the Switch because we always display the 
              same header */}
              <Header 
                title={this.state.title} 
                status={this.state.status}
                speaker={this.state.speaker}
              />
              <Switch>

                {/* Pass in the entire state as props to the Speaker component
                by using the JSX spread operator */}
                <Route path="/speaker" render={() => {
                  return (<Speaker emit={this.emit} {... this.state} />);
                }} />

                <Route path="/board" render={() => {
                  return (<Board />);
                }} />

                <Route exact path="/" render={(props) => {
                  return (<Audience emit={this.emit} {... this.state} />);
                }} />

                <Route component={Error} />

              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
