/* global React */
'use strict';


var App = React.createClass({   // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      messages: [],
      users: []
    };
  },

  socket: null,

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

var Display = React.createClass({  // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div id="chatApp">
        <div>App</div>
        <MessageList messages={this.props.messages} />
        <UsersList />
      </div>
    );
  }


});

var MessageList = React.createClass({   // eslint-disable-line no-unused-vars
  render: function () {
    var messages = this.props.messages.map(function (message) {
      return <Message {...message} />;
    });
    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
});

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

var UsersList = React.createClass({  // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="users">Users</div>
    );
  }
});

/* eslint-disable no-unused-vars*/
var chatApp = React.render(<App url='http://localhost:1337' />, document.getElementById('app'));
/* eslint-enable no-unused-vars*/
