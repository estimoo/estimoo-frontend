import React, { useState } from 'react';
import { useCreateRoom } from '../../hooks/useCreateRoom';

interface CreateRoomProps {
  onRoomCreated: (roomCode: string) => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ onRoomCreated }) => {
  const [roomName, setRoomName] = useState('');
  const { createRoom, loading, error } = useCreateRoom();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    try {
      const room = await createRoom(roomName);
      onRoomCreated(room.roomCode);
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to create room:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-6">Create New Room</h1>
          
          <div className="space-y-4">
            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Room Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter room name"
                className="input input-bordered w-full"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <button 
              className="btn btn-primary w-full" 
              onClick={handleCreateRoom}
              disabled={!roomName.trim() || loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                'Create Room'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 