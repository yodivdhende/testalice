import WebSocket, { WebSocketServer } from "ws";

class DashboardSocketServer {
    private server = new WebSocketServer({ noServer: true });
    private connectionInfo: Map<WebSocket, ConnecitonInfo> = new Map();

    constructor() {
		this.server.on('connection', (ws) =>{
            ws.on('message', (data) => {
                const dataObj: ConnecitonInfo = JSON.parse(data.toString());
                this.addSessionInfo(ws, dataObj);
                console.log('new connetion: ', this.connectionInfo.size)
            });
            ws.on('close', () => {
                console.log('closing connection: ', this.connectionInfo.size);
                this.connectionInfo.delete(ws);
                this.browdCastSessionInfo(false);
            })
		});

		this.server.on('error', console.error)
    }

    public handleUpgrade: WebSocketServer['handleUpgrade'] = (request, socket, head) => {
        this.server.handleUpgrade(request, socket, head, (ws)=> {
		    this.server.emit('connection', ws, request);
        })
    } 

    private addSessionInfo(webSocket: WebSocket,sessionInfo: ConnecitonInfo) {
        this.connectionInfo.set(webSocket, sessionInfo);
        this.browdCastSessionInfo(false)
    }

    private browdCastSessionInfo( isBinary: boolean = false){
        this.server.clients.forEach((client)=>{
            if(client.readyState !== WebSocket.OPEN) return;
            let sessionInfostring: string = JSON.stringify([...this.connectionInfo.values()]);
            client.send(sessionInfostring, {binary: isBinary})
        })
    }
}

export const dashboardSocketServer = new DashboardSocketServer();


export type WebConnectionInfo ={
    sessionToken: string;
    connectionType: "Web";
}

export type CYDConnectionInfo={
    sessionToken: string;
    connectionType: "CYD";
    wifiStrength: number;
}
export type ConnecitonInfo = WebConnectionInfo | CYDConnectionInfo;