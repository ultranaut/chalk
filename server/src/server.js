const options = {
  cors: {
    origin: 'http://localhost:8080',
  },
};
const io = require('socket.io')(1337, options);

const connections = [];
const conversation = [
  // dummy conversation already in progress...
  { user: 'mike', message: 'this is mike here' },
  { user: 'jeff', message: "hey mike, it's jeff" },
  { user: 'mike', message: 'oh cool' },
  { user: 'jeff', message: 'yeah kind of' },
  { user: 'steve', message: 'now im steve i guess' },
  { user: 'earl', message: 'and im earl' },
  { user: 'josef', message: 'roly-poly' },
  { user: 'jose', message: 'really' },
  { user: 'gertie', message: 'weee' },
  { user: 'allison', message: 'boo' },
  { user: 'ellie', message: 'so cool' },
  { user: 'luis', message: 'yo amo' },
  { user: 'roberto', message: 'we will walk the paved path' },
  { user: 'sylvie', message: 'yoiks' },
  { user: 'sylvie', message: 'oh noes' },
  { user: 'sylvie', message: "c'mon" },
  { user: 'sylvie', message: 'jsut jake' },
  { user: 'matt', message: "what's doing?" },
  { user: 'matt', message: 'nothing' },
  { user: 'lebron', message: 'what happens now?' },
];

const listUsers = () => {
  const userList = [];
  // for (var i = 0, len = connections.length; i < len; i++) {
  //   if (connections[i].store.data.nickname) {
  //     userList.push(connections[i].store.data.nickname);
  //   }
  // }
  return userList;
};

io.sockets.on('connection', (socket) => {
  connections.push(socket);

  socket.on('setNickname', (name) => {
    socket.nickname = name;
    socket.emit('initConversation', conversation);
    socket.emit('updateUserList', listUsers());
    socket.broadcast.emit('updateUserList', listUsers());
  });

  socket.on('newMessage', (data) => {
    socket.get('nickname', (err, name) => {
      if (!err) {
        const message = { user: name, message: data.message };
        conversation.push(message);
        /* TODO: do I really need to do this twice? */
        socket.emit('pushMessage', message);
        socket.broadcast.emit('pushMessage', message);
      }
    });
  });
});

console.log('Chat is go...');
