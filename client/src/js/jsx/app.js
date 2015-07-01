/* global React */
'use strict';

/*
 * --- App ------------------------------------------------------------
 *   the root level, basically just a controller, returns a
 *   Display component which is where the view happens
 * --------------------------------------------------------------------
 */
var App = React.createClass({   // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      messages: [],
      users: [],
      connected: false,
      loggedIn: false
    };
  },

  socket: null,

  handleConnection: function () {
    this.setState({ connected: true });
  },

  /* TODO: actual login */
  tryLogin: function (nickname) {
    // console.log('tryLogin');
    // var nickname = ['john', 'rose', 'elroy', 'steve', 'allison', 'gertie']
    //                [Math.floor(Math.random() * 6)];

    this.socket.emit('setNickname', nickname);
    console.info('Nickname:', nickname);
    this.setState({ loggedIn: true });
  },

  sendMessage: function (e) {
    var input = e.target.value;
    if (input) {
      this.socket.emit('newMessage', {message: input});
    }

  },

  initConversation: function (messages) {
    this.setState({
      messages: this.state.messages.concat(messages)
    });
  },
  displayMessage: function (message) {
    console.log(message);
    this.setState({
      messages: this.state.messages.concat([message])
    });
  },

  updateUsers: function (data) {
    this.setState({
      users: data
    });
  },

  componentDidMount: function () {
    // set up the websocket
    var socket = this.socket = window.io.connect(this.props.url);
    socket.on('connect', this.handleConnection);
    socket.on('pushMessage', this.displayMessage);
    socket.on('initConversation', this.initConversation);
    socket.on('updateUserList', this.updateUsers);
  },

  render: function () {
    return (
      <Display sendMessage={this.sendMessage}
               tryLogin={this.tryLogin}
               {...this.state} />
    );
  }
});

/*
 * --- Display --------------------------------------------------------
 */
var Display = React.createClass({  // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div id="chat-app">
        <header><h1>chat</h1></header>
        { this.props.loggedIn ?
            <MessageList messages={this.props.messages} /> :
            <Login tryLogin={this.props.tryLogin} /> }
        { this.props.loggedIn ?
            <Input sendMessage={this.props.sendMessage} /> :
            null }
      </div>
    );
  }
});

/*
 * --- Login ----------------------------------------------------------
 */
var Login = React.createClass({  // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      username: ''
    };
  },
  submitUser: function () {
    this.props.tryLogin(this.state.username);
  },
  updateInput: function (e) {
    console.log('update');
    if (e.keyCode === 13) {
      console.log('enter');
      return this.submitUser();
    }
    this.setState({ username: e.target.value });
  },
  render: function () {
    return (
      <div id="login">
        <div className="wrapper">
          <input type="text"
                className="nickname"
                value={this.state.username}
                onChange={this.updateInput}
                onKeyDown={this.updateInput}
                placeholder="Nickname..." />
        </div>
      </div>
    );
  }
});


/*
 * --- MessageList ----------------------------------------------------
 */
var MessageList = React.createClass({   // eslint-disable-line no-unused-vars
  render: function () {
    var messages = this.props.messages.map(function (message, idx) {
      return <Message key={idx} {...message} />;
    });
    return (
      // wrapper div needed for css
      <div className="wrapper">
        <div className="messages">
          {messages}
        </div>
      </div>
    );
  }
});

/*
 * --- Messages -------------------------------------------------------
 */
var Message = React.createClass({  // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="comment">
        <div className="user">{this.props.user}</div>
        <div className="copy">{this.props.message}</div>
      </div>
    );
  }
});

/*
 * --- Input ----------------------------------------------------------
 */
var Input = React.createClass({  // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return { message: '' };
  },
  handleChange: function (e) {
    if (e.keyCode === 13) {
      return this.handleSubmit(e);
    }
    this.setState({ message: e.target.value });
  },
  handleSubmit: function (e) {
    this.props.sendMessage(e);
    this.setState({ message: '' });
  },
  render: function () {
    return (
      <input type="text"
             ref="messageInput"
             className="message-input"
             onChange={this.handleChange}
             onKeyDown={this.handleChange}
             value={this.state.message}
             placeholder="Type here..." />
    );
  }
});

/*
 * --- Its's go time --------------------------------------------------
 */
/* eslint-disable no-unused-vars*/
var chatApp = React.render(<App url='http://localhost:1337' />,
                           document.querySelector('.container'));
/* eslint-enable no-unused-vars*/
