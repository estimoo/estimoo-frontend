import React from 'react';
import './PokerResult.css';

const PokerResult: React.FC = () => {
  const resultData = [
    { value: 10, votes: 'Votes' },
    { value: 8, votes: 'Average' },
    { value: 15, votes: 'Lowest' },
    { value: 3, votes: 'Highest' },
    { value: 21, votes: 'Point' }
  ];

  return (
    <div className=" rounded-lg p-4 w-full">
      <div className="flex justify-center gap-4">
        {resultData.map((item, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-lg p-3 flex flex-col justify-start text-left"
            style={{ width: '123px', height: '93px' }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 900,
                fontSize: '30px',
                lineHeight: '22px',
                letterSpacing: '0.25px'
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                width: '66px',
                height: '22px',
                fontSize: '14px',
                marginTop: '8px'
              }}
            >
              {item.votes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokerResult;
