import React from 'react';
import MessageList from '../MessageList';
import Login from '../Login';
import Input from '../Input';
import './Display.scss';

const Display = (props) => {
  return (
    <div id="chat-app">
      <header>
        <h1>chat</h1>
      </header>
      {props.loggedIn ? (
        <MessageList messages={props.messages} />
      ) : (
        <Login tryLogin={props.tryLogin} />
      )}
      {props.loggedIn ? <Input sendMessage={props.sendMessage} /> : null}
    </div>
  );
};

export default Display;
