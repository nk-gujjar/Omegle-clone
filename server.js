"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const users = [];
io.on('connection', (socket) => {
    console.log('User connected');
    users.push(socket);
    socket.on('message', (message) => {
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
