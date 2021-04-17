import React, { Component } from 'react';
import Display from './Display';
import './App.scss';

class App extends Component {
  state = {
    messages: [],
    users: [],
    connected: false,
    loggedIn: false,
  };

  socket = null;

  handleConnection = () => {
    this.setState({ connected: true });
  };

  /* TODO: actual login */
  tryLogin = (nickname) => {
    this.socket.emit('setNickname', nickname);
    this.setState({ loggedIn: true });
  };

  sendMessage = (e) => {
    const input = e.target.value;
    if (input) {
      this.socket.emit('newMessage', { message: input });
    }
  };

  initConversation = (messages) => {
    this.setState({
      messages: this.state.messages.concat(messages),
    });
  };

  displayMessage = (message) => {
    this.setState({
      messages: this.state.messages.concat([message]),
    });
  };

  updateUsers = (data) => {
    this.setState({
      users: data,
    });
  };

  componentDidMount() {
    // set up the websocket
    const socket = (this.socket = window.io.connect(this.props.url));
    socket.on('connect', this.handleConnection);
    socket.on('pushMessage', this.displayMessage);
    socket.on('initConversation', this.initConversation);
    socket.on('updateUserList', this.updateUsers);
  }

  render() {
    return (
      <Display
        sendMessage={this.sendMessage}
        tryLogin={this.tryLogin}
        {...this.state}
      />
    );
  }
}

export default App;
