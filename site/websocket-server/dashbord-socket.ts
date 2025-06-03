import WebSocket, { WebSocketServer } from "ws";

class DashboardSocketServer {
    private server:WebSocketServer 
    private sessionInfos: Map<String, SessionInfo> = new Map();

    constructor() {
        this.server = new WebSocketServer({ noServer: true });
		this.server.on('connection', (ws) =>{
            ws.on('message', this.browdCastSessionInfo)
		});

		this.server.on('error', console.error)
    }

    public handleUpgrade: WebSocketServer['handleUpgrade'] = (request, socket, head) => {
        this.server.handleUpgrade(request, socket, head, (ws)=> {
		    this.server.emit('connection', ws, request);
        })
    } 

    public addSessionInfo(sessionInfo: SessionInfo) {
        this.sessionInfos.set(sessionInfo.sessionToken, sessionInfo);
        this.browdCastSessionInfo(false)
    }

    private browdCastSessionInfo( isBinary: boolean){
        this.server.clients.forEach((client)=>{
            if(client.readyState !== WebSocket.OPEN) return;
            client.send(JSON.stringify(this.sessionInfos.values), {binary: isBinary})
        })
    }
}

export const dashboardSocketServer = new DashboardSocketServer();


type WebSessionInfo ={
    sessionToken: string;
    connectionType: "Web";
}

type CYDSessionInfo={
    sessionToken: string;
    connectionType: "CYD";
    wifiStrength: number;
}
export type SessionInfo = WebSessionInfo | CYDSessionInfo;