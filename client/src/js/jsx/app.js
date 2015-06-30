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
      users: []
    };
  },

  socket: null,

  /* TODO: actual login */
  handleConnect: function () {
    var nickname = ['john', 'rose', 'elroy', 'steve', 'allison', 'gertie']
                   [Math.floor(Math.random() * 6)];

    this.socket.emit('setNickname', nickname);
    console.info('Nickname:', nickname);
  },

  handleSubmit: function (e) {
    var input = e.target.value;
    if (input) {
      this.socket.emit('newMessage', {message: input});
    }
    e.target.value = '';
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
    var socket = this.socket = window.io.connect(this.props.url);
    socket.on('connect', this.handleConnect);
    socket.on('pushMessage', this.displayMessage);
    socket.on('initConversation', this.initConversation);
    socket.on('updateUserList', this.updateUsers);
  },

  render: function () {
    return (
      <Display {...this.state} />
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
        <MessageList messages={this.props.messages} />
        <Input />
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
  render: function () {
    return (
      <input type="text" className="message-input" value="" placeholder="Type here..." />
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
