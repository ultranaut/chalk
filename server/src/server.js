'use strict';

const options = {
  cors: {
    origin: 'http://localhost:8080',
  }
};
var io = require('socket.io')(1337, options);

var chatServer = (function (io) {
  var connections = [];
  var conversation = [
    // dummy conversation already in progress...
    {user: 'mike', message: 'this is mike here'},
    {user: 'jeff', message: 'hey mike, it\'s jeff'},
    {user: 'mike', message: 'oh cool'},
    {user: 'jeff', message: 'yeah kind of'},
    {user: 'steve', message: 'now im steve i guess'},
    {user: 'earl', message: 'and im earl'},
    {user: 'josef', message: 'roly-poly'},
    {user: 'jose', message: 'really'},
    {user: 'gertie', message: 'weee'},
    {user: 'allison', message: 'boo'},
    {user: 'ellie', message: 'so cool'},
    {user: 'luis', message: 'yo amo'},
    {user: 'roberto', message: 'we will walk the paved path'},
    {user: 'sylvie', message: 'yoiks'},
    {user: 'sylvie', message: 'oh noes'},
    {user: 'sylvie', message: 'c\'mon'},
    {user: 'sylvie', message: 'jsut jake'},
    {user: 'matt', message: 'what\'s doing?'},
    {user: 'matt', message: 'nothing'},
    {user: 'lebron', message: 'what happens now?'}
  ];

  function listUsers() {
    var userList = [];
    for (var i = 0, len = connections.length; i < len; i++) {
      if (connections[i].store.data.nickname) {
        userList.push(connections[i].store.data.nickname);
      }
    }
    return userList;
  }

  var server = io;
  server.sockets.on('connection', function (socket) {
    connections.push(socket);
    socket.on('setNickname', function (name) {
      socket.set('nickname', name);
      socket.emit('initConversation', conversation);
      socket.emit('updateUserList', listUsers());
      socket.broadcast.emit('updateUserList', listUsers());
    });
    socket.on('newMessage', function (data) {
      socket.get('nickname', function (err, name) {
        if (!err) {
          var message = {user: name, message: data.message};
          conversation.push(message);
          /* TODO: do I really need to do this twice? */
          socket.emit('pushMessage', message);
          socket.broadcast.emit('pushMessage', message);
        }
      });
    });
  });

  return server;
}(io));

console.log('Chat is go...');
