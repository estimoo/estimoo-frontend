import React from 'react';
import AdBanner from '../AdBanner';
import ParticipantCards from '../ParticipantCards';
import PokerArea from '../PokerArea';
import PokerResult from '../PokerResult';

const EstimateArea: React.FC = () => {
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col h-full min-h-[calc(100vh-5rem)] gap-4">
        <div className="flex gap-4">
          <div className="w-1/4"></div>
          
          <div className="flex-1 flex justify-center">
            <PokerResult />
          </div>
          
          <div className="w-1/4"></div>
        </div>
        
        <div className="flex-1  rounded-lg p-6">
          <div className="flex h-full flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <AdBanner />
              
              <ParticipantCards />
              
              <AdBanner />
            </div>
            
            <div className="flex justify-center ">
              <button className="btn btn-primary">Reveal Cards</button>
            </div>
          </div>
        </div>

        <PokerArea />
      </div>
    </div>
  );
};

export default EstimateArea;
