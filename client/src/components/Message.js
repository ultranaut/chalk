import React from 'react';

const Message = (props) => {
  return (
    <div className="comment">
      <div className="user">{props.user}</div>
      <div className="copy">{props.message}</div>
    </div>
  );
};

export default Message;
