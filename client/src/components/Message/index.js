import React from 'react';
import './Message.scss';

const Message = (props) => {
  return (
    <div className="comment">
      <div className="user">{props.user}</div>
      <div className="copy">{props.message}</div>
    </div>
  );
};

export default Message;
