import React, { Component } from 'react';
import './Input.scss';

class Input extends Component {
  state = { message: '' };

  handleChange = (e) => {
    if (e.keyCode === 13) {
      return this.handleSubmit(e);
    }
    this.setState({ message: e.target.value });
  };

  handleSubmit = (e) => {
    this.props.sendMessage(e);
    this.setState({ message: '' });
  };

  render = () => {
    return (
      <input
        type="text"
        ref="messageInput"
        className="message-input"
        onChange={this.handleChange}
        onKeyDown={this.handleChange}
        value={this.state.message}
        placeholder="Type here..."
      />
    );
  };
}

export default Input;
