/* global React */
'use strict';

var App = React.createClass({  // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      messages: [
        { user: 'John', message: 'Well hello there' },
        { user: 'Rose', message: 'Oh hi, what are you doing?' }
      ],
      users: []
    };
  },
  render: function () {
    return (
      <div id="chatApp">
        <div>App</div>
        <MessageList messages={this.state.messages} />
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

var chatApp = React.render(<App />, document.getElementById('app'));

