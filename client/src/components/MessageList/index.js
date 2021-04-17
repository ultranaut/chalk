import React from 'react';
import Message from '../Message';

const MessageList = (props) => {
  const messages = props.messages.map(function (message, idx) {
    return <Message key={idx} {...message} />;
  });
  return (
    // wrapper div needed for css
    <div className="wrapper">
      <div className="messages">{messages}</div>
    </div>
  );
};

export default MessageList;
