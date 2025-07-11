import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Room } from '../services/api';
import { wsService } from '../services/websocket';
import { handleApiError } from '../utils/errorHandler';

export const useRoom = (roomCode: string | null) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    const loadRoom = async () => {
      try {
        setLoading(true);
        const roomData = await apiService.getRoom(roomCode);
        setRoom(roomData);
        setError(null);
      } catch (err: any) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode) return;

    // WebSocket bağlantısı
    const sessionId = Math.random().toString(36).substring(7);
    
    const connectWebSocket = async () => {
      try {
        console.log('🔌 Connecting to WebSocket...');
        await wsService.connect(sessionId);
        console.log('✅ WebSocket connected successfully');
        
        // Oda durumunu dinle
        console.log('🔔 Setting up room subscription...');
        wsService.subscribeToRoom(roomCode, (data) => {
          console.log('🔄 Updating room data:', data);
          setRoom(prev => {
            const newRoom = prev ? { ...prev, ...data } : data;
            console.log('📈 New room state:', newRoom);
            return newRoom;
          });
        });
        console.log('✅ Room subscription set up successfully');
      } catch (err) {
        console.error('❌ WebSocket connection failed:', err);
      }
    };

    connectWebSocket();

    return () => {
      wsService.unsubscribeFromRoom(roomCode);
      wsService.disconnect();
    };
  }, [roomCode]);

  const joinRoom = useCallback((nickname: string) => {
    if (!roomCode) return;
    wsService.joinRoom(roomCode, nickname);
  }, [roomCode]);

  const vote = useCallback((vote: string) => {
    if (!roomCode) return;
    wsService.vote(roomCode, vote);
  }, [roomCode]);

  const revealVotes = useCallback(() => {
    if (!roomCode) return;
    wsService.revealVotes(roomCode);
  }, [roomCode]);

  const resetVotes = useCallback(() => {
    if (!roomCode) return;
    wsService.resetVotes(roomCode);
  }, [roomCode]);

  return {
    room,
    loading,
    error,
    joinRoom,
    vote,
    revealVotes,
    resetVotes
  };
}; 