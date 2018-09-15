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
        member: {},
        audience: {},
      };
      this.connect = this.connect.bind(this);
      this.disconnect = this.disconnect.bind(this);
      this.welcome = this.welcome.bind(this);
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
      this.socket.on('welcome', this.welcome);
      this.socket.on('joined', this.joined);
      this.socket.on('audience', this.updateAudience);
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

    welcome(serverState) {
      // Event handlers for the welcome event on the socket
      this.setState({
        title: serverState.title,
      });
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
              <Header title={this.state.title} status={this.state.status} />
              <Switch>

                {/* Pass in the entire state as props to the Speaker component
                by using the JSX spread operator */}
                <Route path="/speaker" render={() => {
                  return (<Speaker {... this.state} />);
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
