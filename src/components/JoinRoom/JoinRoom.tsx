import React, { useState } from "react";

interface JoinRoomProps {
  onJoinRoom: (roomCode: string) => void;
}

export const JoinRoom: React.FC<JoinRoomProps> = ({ onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      onJoinRoom(roomCode.trim().toUpperCase());
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-6">Join Room</h1>

          <div className="space-y-4">
            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Room Code</span>
              </label>
              <input
                type="text"
                placeholder="Enter room code"
                className="input input-bordered font-mono text-center text-lg w-full"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && handleJoinRoom()}
                maxLength={6}
              />
            </div>

            <button
              className="btn btn-secondary w-full"
              onClick={handleJoinRoom}
              disabled={!roomCode.trim()}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
