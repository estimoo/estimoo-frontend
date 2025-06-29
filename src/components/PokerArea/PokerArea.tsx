import React from 'react';
import './PokerArea.css';

const PokerArea: React.FC = () => {
  const pokerCards = [
    { id: 1, value: '0' },
    { id: 2, value: '1' },
    { id: 3, value: '2' },
    { id: 4, value: '3' },
    { id: 5, value: '5' },
    { id: 6, value: '13' },
    { id: 7, value: '20' },
    { id: 8, value: '40' },
    { id: 9, value: '?' },
    { id: 10, value: '☕' }
  ];

  return (
    <div className="flex-1  rounded-lg p-3 ">
      <div className="flex justify-center items-center gap-4 flex-wrap h-full">
        {pokerCards.map((card) => (
          <div
            key={card.id}
            className="relative rounded-lg bg-base-200 border border-neutral-700 text-white shadow-md hover:scale-105 transition-transform duration-200"
            style={{ width: '60px', height: '90px' }}
          >
           
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
              {card.value}
            </div>

            {/* Sol üst köşe */}
            <div className="absolute top-1 left-1 text-xs font-semibold opacity-70">
              {card.value}
            </div>

            {/* Sağ alt köşe (180° çevrilmiş) */}
            <div className="absolute bottom-1 right-1 text-xs font-semibold opacity-70 transform rotate-180">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokerArea;
