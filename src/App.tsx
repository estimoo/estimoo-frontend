import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { CreateRoom } from './components/CreateRoom/CreateRoom'
import { JoinRoom } from './components/JoinRoom/JoinRoom'
import PokerArea from './components/PokerArea/PokerArea'
import ParticipantCards from './components/ParticipantCards/ParticipantCards'
import { useRoom } from './hooks/useRoom'

function App() {
  const [currentRoomCode, setCurrentRoomCode] = useState<string | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState('');
  
  // Oda bilgilerini al
  const { room, joinRoom, vote, revealVotes, resetVotes } = useRoom(currentRoomCode);

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

  const handleBackToHome = () => {
    setCurrentRoomCode(null);
    setShowCreateRoom(false);
    setShowJoinRoom(false);
  };

  const handleLeaveRoom = () => {
    setCurrentRoomCode(null);
    setShowCreateRoom(false);
    setShowJoinRoom(false);
  };

  const handleRenameRoom = () => {
    // TODO: Implement room rename functionality
    console.log('Rename room clicked');
  };

  const handleJoinRoomWithNickname = () => {
    if (nickname.trim() && currentRoomCode) {
      console.log('🚀 Joining room with nickname:', nickname);
      joinRoom(nickname);
      setShowJoinModal(false);
      setNickname('');
    }
  };

  // Eğer bir odada isek, oda component'ini göster
  if (currentRoomCode) {
    return (
      <>
        <Navbar 
          room={room} 
          onLeaveRoom={handleLeaveRoom}
          onRenameRoom={handleRenameRoom}
        />
        <div className="min-h-screen bg-base-200 p-4">
          <div className="container mx-auto">
            {room && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{room.roomName}</h1>
                <p className="text-lg text-base-content/70">
                  Room Code: <span className="font-mono bg-base-300 px-2 py-1 rounded">{room.roomCode}</span>
                  <span className="ml-4 text-sm">
                    👥 {Object.keys(room.users || {}).length} participants
                  </span>
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Participant Cards */}
              <div className="lg:col-span-1">
                <ParticipantCards 
                  users={room?.users || {}}
                  votesRevealed={room?.votesRevealed || false}
                />
              </div>
              
              {/* Poker Area */}
              <div className="lg:col-span-2">
                <PokerArea 
                  roomCode={currentRoomCode}
                  onVote={(voteValue) => {
                    if (currentRoomCode) {
                      vote(voteValue);
                    }
                  }}
                />
                
                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <button 
                    className="btn btn-success"
                    onClick={() => {
                      if (currentRoomCode) {
                        revealVotes();
                      }
                    }}
                    disabled={!room?.users || Object.keys(room?.users || {}).length === 0}
                  >
                    Reveal Votes
                  </button>
                  <button 
                    className="btn btn-warning"
                    onClick={() => {
                      if (currentRoomCode) {
                        resetVotes();
                      }
                    }}
                  >
                    Reset Votes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <button 
            className="btn btn-circle btn-primary"
            onClick={handleBackToHome}
            title="Back to Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </div>

        {/* Join Room Modal */}
        {showJoinModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Join Room</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your nickname</span>
                </label>
                <input
                  type="text"
                  placeholder="Your nickname"
                  className="input input-bordered"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinRoomWithNickname()}
                />
              </div>
              <div className="modal-action">
                <button 
                  className="btn btn-primary" 
                  onClick={handleJoinRoomWithNickname}
                  disabled={!nickname.trim()}
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Ana sayfa - oda oluştur veya katıl seçenekleri
  return (
    <>
      <Navbar room={null} />
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Estimoo</h1>
            <p className="text-lg text-base-content/70">Planning Poker Made Simple</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {!showCreateRoom && !showJoinRoom ? (
              <>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setShowCreateRoom(true)}
                >
                  Create New Room
                </button>
                <button 
                  className="btn btn-secondary btn-lg"
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
          </div>

          {(showCreateRoom || showJoinRoom) && (
            <div className="text-center mt-4">
              <button 
                className="btn btn-ghost"
                onClick={() => {
                  setShowCreateRoom(false);
                  setShowJoinRoom(false);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App
