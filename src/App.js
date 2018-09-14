import React, { Component } from 'react';
import Header from './parts/Header';


var io = require('socket.io-client');

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'disconnected'
      };
      this.connect = this.connect.bind(this);
    }

    componentWillMount() {
      // Add a socket to the client when it is about to mount
      console.log('Attempting to create a socket to the backend');
      this.socket = io('http://localhost:3300');
      
      // Add a listener to this socker for the connect event
      this.socket.on('connect', this.connect);
    }

    connect() {
      // Alert the user with the id of the socket connection
      console.log('Connected: ' + this.socket.id);
      this.setState({
        status: 'connected'
      });
    }

    render() {
        return (
          <div>
            <Header 
              title="Polling App Header" 
              status={this.state.status}
            />
          </div>
        );
    }
}

export default App;
