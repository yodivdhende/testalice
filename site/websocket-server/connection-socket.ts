import WebSocket, { WebSocketServer } from "ws";

class DashboardSocketServer {
    private server = new WebSocketServer({ noServer: true });
    private connectionInfo: Map<String, ConnecitonInfo> = new Map();

    constructor() {
		this.server.on('connection', (ws) =>{
            ws.on('message', (data) => {
                const dataObj: ConnecitonInfo = JSON.parse(data.toString());
                this.addSessionInfo(dataObj);
            });
		});

		this.server.on('error', console.error)
    }

    public handleUpgrade: WebSocketServer['handleUpgrade'] = (request, socket, head) => {
        this.server.handleUpgrade(request, socket, head, (ws)=> {
		    this.server.emit('connection', ws, request);
        })
    } 

    public addSessionInfo(sessionInfo: ConnecitonInfo) {
        this.connectionInfo.set(sessionInfo.sessionToken, sessionInfo);
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


type WebConnectionInfo ={
    sessionToken: string;
    connectionType: "Web";
}

type CYDConnectionInfo={
    sessionToken: string;
    connectionType: "CYD";
    wifiStrength: number;
}
export type ConnecitonInfo = WebConnectionInfo | CYDConnectionInfo;