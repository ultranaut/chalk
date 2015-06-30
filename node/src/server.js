/* jshint node: true */

var io = require('socket.io');

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

  var server = io.listen(1337);
  /*
   * level of detail output to logger
   * 0 - error
   * 1 - warn
   * 2 - info
   * 3 - debug (default)
   */
  server.set('log level', 2);
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
        var message = {user: name, message: data.message};
        conversation.push(message);
        /* TODO: do I really need to do this twice? */
        socket.emit('pushMessage', message);
        socket.broadcast.emit('pushMessage', message);
      });
    });
  });

  function listUsers() {
    var userList = [];
    for (var i = 0, len = connections.length; i < len; i++) {
      if (connections[i].store.data.nickname) {
        userList.push(connections[i].store.data.nickname);
      }
    }
    return userList;
  }
  return server;
}(io));

console.log('Chat is go...');
