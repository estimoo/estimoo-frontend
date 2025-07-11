import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// WebSocket base URL - production için gerçek URL
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'https://api.estimoo.co/ws';

export interface JoinRequest {
  roomCode: string;
  nickname: string;
}

export interface VoteRequest {
  roomCode: string;
  vote: string;
}

export interface RevealRequest {
  roomCode: string;
}

export interface ResetRequest {
  roomCode: string;
}

export class WebSocketService {
  private stompClient: any = null;
  private connected: boolean = false;
  private subscriptions: Map<string, any> = new Map();

  connect(sessionId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('🔌 Attempting to connect to:', WS_BASE_URL);
      
      // SockJS requires http(s), not ws(s)
      const socket = new SockJS(WS_BASE_URL);
      console.log('🔌 SockJS socket created');

      this.stompClient = Stomp.over(socket);
      console.log('🔌 STOMP client created');

      // Optional: Remove console logs in production
      this.stompClient.debug = () => {};

      this.stompClient.connect(
        {
          sessionId,
        },
        (frame: any) => {
          console.log('✅ WebSocket connected:', frame);
          this.connected = true;
          resolve();
        },
        (error: any) => {
          console.error('❌ WebSocket connection error:', error);
          this.connected = false;
          reject(error);
        }
      );
    });
  }

  disconnect(): void {
    if (this.stompClient && this.connected) {
      this.stompClient.disconnect(() => {
        console.log('🔌 WebSocket disconnected');
        this.connected = false;
      });
    }
  }

  private send(path: string, body: any): void {
    if (!this.connected) {
      throw new Error('WebSocket not connected');
    }
    this.stompClient.send(path, {}, JSON.stringify(body));
  }

  joinRoom(roomCode: string, nickname: string): void {
    console.log(`👤 Joining room: ${roomCode} with nickname: ${nickname}`);
    this.send('/app/join', { roomCode, nickname } as JoinRequest);
  }

  vote(roomCode: string, vote: string): void {
    this.send('/app/vote', { roomCode, vote } as VoteRequest);
  }

  revealVotes(roomCode: string): void {
    this.send('/app/reveal', { roomCode } as RevealRequest);
  }

  resetVotes(roomCode: string): void {
    this.send('/app/reset', { roomCode } as ResetRequest);
  }

  subscribeToRoom(roomCode: string, callback: (data: any) => void): void {
    if (!this.connected) {
      throw new Error('WebSocket not connected');
    }

    console.log(`🔔 Subscribing to room: /topic/room/${roomCode}`);

    const subscription = this.stompClient.subscribe(
      `/topic/room/${roomCode}`,
      (message: any) => {
        console.log('📨 Received WebSocket message:', message.body);
        const data = JSON.parse(message.body);
        console.log('📊 Parsed data:', data);
        callback(data);
      }
    );

    this.subscriptions.set(roomCode, subscription);
  }

  unsubscribeFromRoom(roomCode: string): void {
    const subscription = this.subscriptions.get(roomCode);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(roomCode);
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}

export const wsService = new WebSocketService();
