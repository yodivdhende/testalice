import * as http from 'http';
import {WebSocketServer} from 'ws';

export class WebSocketMidiator{

	private dashboardServer = new WebSocketServer({noServer: true});

	constructor(server: http.Server) {
		this.dashboardServer.on('connection', (ws) =>{
			ws.on('message', (msg)=> console.log('message',msg))
		})
		this.dashboardServer.on('error', console.error)

		server.on('upgrade', (request, socket, head) => {
			const {pathname} = new URL(request.url??'', `ws://localhost:${5173}`);
			if(pathname === '/dashboard'){
				this.dashboardServer.handleUpgrade(request, socket, head, (ws) => {
					this.dashboardServer.emit('connection', ws, request);
				})
			}
		})
	}
	
}

