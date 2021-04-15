import React, { Component } from 'react';

class Login extends Component {
  state = { username: '' };

  submitUser = () => {
    this.props.tryLogin(this.state.username);
  };

  updateInput = (e) => {
    if (e.keyCode === 13) {
      return this.submitUser();
    }
    this.setState({ username: e.target.value });
  };

  render = () => {
    return (
      <div id="login">
        <div className="wrapper">
          <input
            type="text"
            className="nickname"
            value={this.state.username}
            onChange={this.updateInput}
            onKeyDown={this.updateInput}
            placeholder="Nickname..."
          />
        </div>
      </div>
    );
  };
}

export default Login;
