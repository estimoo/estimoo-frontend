// Revised App.tsx with layout similar to provided screenshots
// Responsive, Tailwind-based, and aligned with design structure

import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { CreateRoom } from "./components/CreateRoom/CreateRoom";
import { JoinRoom } from "./components/JoinRoom/JoinRoom";
import PokerArea from "./components/PokerArea/PokerArea";
import ParticipantCards from "./components/ParticipantCards/ParticipantCards";
import { useRoom } from "./hooks/useRoom";
import AdBanner from "./components/AdBanner";
import RoomCodeDisplay from "./components/RoomCodeDisplay/RoomCodeDisplay";

function App() {
  const [currentRoomCode, setCurrentRoomCode] = useState<string | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedVote, setSelectedVote] = useState<string | undefined>(
    undefined
  );
  const { room, joinRoom, vote, revealVotes, resetVotes } =
    useRoom(currentRoomCode);

  const handleRoomCreated = (roomCode: string) => {
    setCurrentRoomCode(roomCode);
    setShowCreateRoom(false);
    setShowJoinRoom(false);
    setShowJoinModal(true);
  };

  const handleJoinRoom = (roomCode: string) => {
    setCurrentRoomCode(roomCode);
    setShowCreateRoom(false);
    setShowJoinRoom(false);
    setShowJoinModal(true);
  };

  const handleJoinRoomWithNickname = () => {
    if (nickname.trim() && currentRoomCode) {
      joinRoom(nickname);
      setShowJoinModal(false);
      setNickname("");
    }
  };

  if (currentRoomCode && room) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar
          room={room}
          onLeaveRoom={() => setCurrentRoomCode(null)}
          onRenameRoom={() => {}}
        />
        <div className="container flex flex-col mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{room.roomName}</h1>
            <p className="text-base-content/70 text-sm">
              Room Code: <RoomCodeDisplay code={room.roomCode} />
              <span className="ml-4">
                👥 {Object.keys(room.users || {}).length} participants
              </span>
            </p>
          </div>

          <div className="flex w-full gap-4 justify-between">
            <AdBanner />

            <div className="flex-1">
              <ParticipantCards
                users={room.users || {}}
                votesRevealed={room.votesRevealed || false}
              />
            </div>

            <AdBanner />
          </div>

          <div className="lg:col-span-2 flex flex-col items-center">
            <PokerArea
              onVote={(val) => {
                setSelectedVote(val);
                vote(val);
              }}
              currentVote={selectedVote}
            />

            <div className="mt-6 flex gap-4">
              <button className="btn btn-info" onClick={() => revealVotes()}>
                Reveal Cards
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => resetVotes()}
              >
                Start New Game
              </button>
            </div>
          </div>
        </div>

        {showJoinModal && (
          <div className="modal modal-open">
            <div className="modal-box bg-base-200 text-white">
              <h3 className="font-bold text-lg">Join Room</h3>
              <input
                type="text"
                className="input input-bordered w-full mt-4"
                placeholder="Enter nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleJoinRoomWithNickname()
                }
              />
              <div className="modal-action">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleJoinRoomWithNickname}
                  disabled={!nickname.trim()}
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Navbar room={null} />
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Estimoo</h1>
          <p className="text-gray-400 mt-2">Planning Poker Made Simple</p>
        </div>
        <div className="space-y-4 w-full max-w-md px-4">
          {!showCreateRoom && !showJoinRoom ? (
            <>
              <button
                className="btn btn-primary w-full"
                onClick={() => setShowCreateRoom(true)}
              >
                Create New Room
              </button>
              <button
                className="btn btn-outline w-full"
                onClick={() => setShowJoinRoom(true)}
              >
                Join Existing Room
              </button>
            </>
          ) : showCreateRoom ? (
            <CreateRoom onRoomCreated={handleRoomCreated} />
          ) : (
            <JoinRoom onJoinRoom={handleJoinRoom} />
          )}

          {(showCreateRoom || showJoinRoom) && (
            <button
              className="btn btn-link w-full"
              onClick={() => {
                setShowCreateRoom(false);
                setShowJoinRoom(false);
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
