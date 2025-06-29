import React from 'react';
import './AvatarGroup.css';

const AvatarGroup: React.FC = () => {
  return (
    <div className="avatar-group -space-x-2 rtl:space-x-reverse px-2">
      <div className="avatar">
        <div className="w-8 h-8">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
            alt="User 1"
          />
        </div>
      </div>
      <div className="avatar">
        <div className="w-8 h-8">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User 2"
          />
        </div>
      </div>
      <div className="avatar">
        <div className="w-8 h-8">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User 3"
          />
        </div>
      </div>
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content w-8 h-8 flex items-center justify-center">
          <span className="text-xs">+2</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarGroup;
