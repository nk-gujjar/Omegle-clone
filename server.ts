// server.ts
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users: Socket[] = [];

io.on('connection', (socket: Socket) => {
  console.log('User connected');
  users.push(socket);

  socket.on('message', (message: string) => {
    console.log('Message received: ', message);
    users.forEach((user) => {
      if (user !== socket) {
        user.emit('message', message);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    const index = users.indexOf(socket);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
