import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { WebSocketMidiator } from './websocket-server/socket-server';
import * as http from "http";

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if(!server.httpServer) return;
		new WebSocketMidiator(server.httpServer as http.Server, server.config.server.port);
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
