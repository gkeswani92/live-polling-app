import React, { Component } from 'react';
import Header from './parts/Header';
import Audience from './Audience';
import Speaker from './Speaker';
import Board from './Board';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

var io = require('socket.io-client');

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'disconnected',
        title: '',
      };
      this.connect = this.connect.bind(this);
      this.disconnect = this.disconnect.bind(this);
      this.welcome = this.welcome.bind(this);
    }

    componentWillMount() {
      // Add a socket to the client when it is about to mount
      console.log('Attempting to create a socket to the backend');
      this.socket = io('http://localhost:3300');
      
      // Add a listener to this socket for the mentioned events
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('welcome', this.welcome);
    }

    connect() {
      // Alert the user with the id of the socket connection
      console.log('Connected: ' + this.socket.id);
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

    render() {
        return (
          <BrowserRouter>
            <div>
              {/* Keep Header out of the Switch because we always display the 
              same header */}
              <Header title={this.state.title} status={this.state.status} />
              <Switch>
                <Route path="/speaker" component={Speaker} />
                <Route path="/board" component={Board} />
                <Route component={Audience} />
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
