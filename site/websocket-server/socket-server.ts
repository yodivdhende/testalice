import * as http from 'http';
import {dashboardSocketServer} from './dashbord-socket';

export class WebSocketMidiator{

	private dashboardServer = dashboardSocketServer;

	constructor(server: http.Server, port: number) {

		server.on('upgrade', (request, socket, head) => {
			const {pathname} = new URL(request.url ??'', `ws://localhost/`);
			if(pathname === '/connections') this.dashboardServer.handleUpgrade(request, socket, head);
		})
	}
	
}

