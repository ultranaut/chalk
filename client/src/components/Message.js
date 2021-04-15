import React from 'react';

const Message = () => {
  return (
    <div className="comment">
      <div className="user">{this.props.user}</div>
      <div className="copy">{this.props.message}</div>
    </div>
  );
};

export default Message;
