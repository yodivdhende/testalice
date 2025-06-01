import { isBigInt64Array } from "util/types";
import WebSocket, { WebSocketServer } from "ws";

export class DashboardSocketServer {
    private server = new WebSocketServer({noServer: true}); 
    private sessionInfos: Map<String, SessionInfo> = new Map();

    constructor() {
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

    private browdCastSessionInfo(sessionInfo: SessionInfo, isBinary: boolean){
        this.sessionInfos.set(sessionInfo.sessionToken, sessionInfo);
        this.server.clients.forEach((client)=>{
            if(client.readyState !== WebSocket.OPEN) return;
            client.send(this.sessionInfos.values, {binary: isBinary})
        })

    }
}



const sessionInfos: Map<String, SessionInfo> = new Map();

export const handleDashbordSockets = (ws, req)=>{
    ws.on('open', () =>  sockets.push(ws) );

    ws.on('browdcastUpdate', (info: SessionInfo) => {
        sessionInfos.set(info.sessionToken, info);
        sockets.forEach(socket => socket.emit('update', sessionInfos.values))
    });
}
 
type WebSessionInfo ={
    sessionToken: "";
    connectionType: "Web";
}

type CYDSessionInfo={
    sessionToken: "";
    connectionType: "CYD";
    wifiStrength: number;
}
type SessionInfo = WebSessionInfo | CYDSessionInfo;