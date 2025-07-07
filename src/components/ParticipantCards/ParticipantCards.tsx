import React from 'react';
import './ParticipantCards.css';

const ParticipantCards: React.FC = () => {
  // 12 katılımcı için örnek data
  const participants = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Katılımcı`,
    status: 'active'
  }));

  return (
    <div className="flex-1 bg-base-100 rounded-lg p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 h-full">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-base-200 rounded-2xl p-4 flex flex-row md:flex-col items-center justify-between md:justify-start hover:bg-base-300 transition-colors cursor-pointer"
            
          >
            <h4 className="text-sm font-medium text-center mb-0 md:mb-2">{participant.name}</h4>
            
            <hr className="w-full border-current mb-4 hidden md:block" />
            
            <div className="flex items-center justify-center md:flex-1">
              <span className="text-3xl">🧐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantCards;
