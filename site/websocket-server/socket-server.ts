import * as http from 'http';
import {DashboardSocketServer} from './dashbord-socket';

export class WebSocketMidiator{

	private dashboardServer = new DashboardSocketServer();

	constructor(server: http.Server) {

		server.on('upgrade', (request, socket, head) => {
			const {pathname} = new URL(request.url??'', `ws://localhost:${5173}`);
			if(pathname === '/dashboard') this.dashboardServer.handleUpgrade(request, socket, head);
		})
	}
	
}

