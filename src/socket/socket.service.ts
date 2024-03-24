import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class SocketService implements OnGatewayConnection {
	@WebSocketServer() server: Server

	handleConnection(client: any): any {
		console.log('CONNECTED')
	}

	@SubscribeMessage('server-path')
	sendEvent(@MessageBody() message: any, @ConnectedSocket() client: any) {
		this.server.emit('client-path', message)
	}
}
