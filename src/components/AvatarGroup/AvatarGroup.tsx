import React from 'react';
import './AvatarGroup.css';

interface AvatarGroupProps {
  users: Record<string, any>;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
  // Kullanıcıları array'e çevir
  const userArray = Object.values(users || {});
  
  // İlk 3 kullanıcıyı göster, kalanı sayı olarak göster
  const displayUsers = userArray.slice(0, 3);
  const remainingCount = userArray.length - 3;

  return (
    <div className="avatar-group -space-x-2 rtl:space-x-reverse px-2">
      {displayUsers.map((user: any, index: number) => (
        <div key={index} className="avatar">
          <div className="w-8 h-8">
            <div className="bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
              {user.nickname ? user.nickname.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-8 h-8 flex items-center justify-center">
            <span className="text-xs">+{remainingCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
