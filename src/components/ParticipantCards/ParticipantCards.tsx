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
    <div className="flex-1 bg-base-100 rounded-lg p-4" style={{ minHeight: '400px' }}>
      
      <div className="grid grid-cols-6 gap-2 h-full">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-base-200 rounded-2xl p-4 flex flex-col items-center hover:bg-base-300 transition-colors cursor-pointer"
            style={{ height: '118px' }}
          >
            <h4 className="text-sm font-medium text-center mb-2">{participant.name}</h4>
            
            <hr className="w-full border-current mb-4" />
            
            <div className="flex-1 flex items-center justify-center">
              <span className="text-3xl">🧐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantCards;
