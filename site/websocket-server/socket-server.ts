import { Server as SocketServer } from 'socket.io';
import { type Server } from 'http';
import { Socket } from 'socket.io-client';

export class WebSocketServer {
	private io: SocketServer;

	constructor(server: Server) {
		this.io = new SocketServer(server);
		this.io.use(this.authenticate);
		this.io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hellow World 📡');
		});

	}
	private async authenticate(socket, next) {
		const token:string = socket.handshake.auth.token;
		const response = await fetch('http://localhost:5173/api/login/token', {
			method: 'POST',
			body: JSON.stringify({token}),
		})
		if (response.ok) next();
		next(new Error('Token not valid'));
	}
}

