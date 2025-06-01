import WebSocket from "ws";

const sockets: WebSocket[] = [];

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