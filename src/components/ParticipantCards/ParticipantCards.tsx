import React from 'react';
import './ParticipantCards.css';

interface ParticipantCardsProps {
  users: Record<string, any>;
  votesRevealed: boolean;
}

const ParticipantCards: React.FC<ParticipantCardsProps> = ({ users, votesRevealed }) => {
  // Kullanıcıları array'e çevir
  const participants = Object.entries(users || {}).map(([sessionId, user]: [string, any]) => ({
    id: sessionId,
    name: user.nickname || 'Anonymous',
    vote: user.vote,
    status: 'active'
  }));

  console.log('👥 ParticipantCards - Users:', users);
  console.log('👥 ParticipantCards - Participants:', participants);
  console.log('👥 ParticipantCards - Votes Revealed:', votesRevealed);

  const getVoteDisplay = (vote: string | null) => {
    if (!vote) return '🧐';
    if (votesRevealed) return vote;
    return '✅';
  };

  return (
    <div className="flex-1 bg-base-100 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">
        Participants 
        <span className="ml-2 badge badge-primary">{participants.length}</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 h-full">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-base-200 rounded-2xl p-4 flex flex-row md:flex-col items-center justify-between md:justify-start hover:bg-base-300 transition-colors"
          >
            <h4 className="text-sm font-medium text-center mb-0 md:mb-2 truncate">{participant.name}</h4>
            
            <hr className="w-full border-current mb-4 hidden md:block" />
            
            <div className="flex items-center justify-center md:flex-1">
              <span className="text-3xl">{getVoteDisplay(participant.vote)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantCards;
