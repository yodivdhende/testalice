import express from 'express';
import { createServer } from 'http';
import { handler } from '../build/handler.js';
import { WebSocketServer } from './socket-server';

const port = 3000;
const app = express();
const server = createServer(app);

new WebSocketServer(server);

app.use(handler);

server.listen(port);
