// API base URL - production için gerçek URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.estimoo.co';

export interface Room {
  roomCode: string;
  roomName: string;
  users: Record<string, any>;
  votesRevealed: boolean;
  lastActivity: string;
}

export interface CreateRoomRequest {
  roomName: string;
}

export const apiService = {
  // Oda oluştur
  createRoom: async (roomName: string): Promise<Room> => {
    const response = await fetch(`${API_BASE_URL}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName } as CreateRoomRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create room: ${response.statusText}`);
    }
    
    return response.json();
  },

  // Oda bilgilerini getir
  getRoom: async (roomCode: string): Promise<Room> => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomCode}`);
    if (!response.ok) {
      throw new Error('Room not found');
    }
    return response.json();
  },

  // Oda adını güncelle
  updateRoomName: async (roomCode: string, roomName: string): Promise<Room> => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomCode}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update room name: ${response.statusText}`);
    }
    
    return response.json();
  },
}; 