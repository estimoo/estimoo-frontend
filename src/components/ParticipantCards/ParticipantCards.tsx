import React from "react";
import "./ParticipantCards.css";

interface ParticipantCardsProps {
  users: Record<string, any>;
  votesRevealed: boolean;
  currentUserSessionId?: string;
}

const ParticipantCards: React.FC<ParticipantCardsProps> = ({
  users,
  votesRevealed,
  currentUserSessionId,
}) => {
  const participants = Object.entries(users || {}).map(
    ([sessionId, user]: [string, any]) => ({
      id: sessionId,
      name: user.nickname || "Anonymous",
      vote: user.vote,
    })
  );

  const getVoteDisplay = (vote: string | null) => {
    if (!votesRevealed) {
      return vote ? "😎" : "🧐";
    }
    return vote || "🧐";
  };

  return (
    <div className="flex-1 bg-base-100 rounded-lg p-4 h-full">
      {/* 📱 Mobil görünüm: liste */}
      <div className="flex flex-col gap-2 w-full md:hidden">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={`w-full bg-base-200 text-white rounded-lg px-4 py-3 flex justify-between items-center ${
              participant.id === currentUserSessionId
                ? "outline outline-2 outline-primary"
                : ""
            }`}
          >
            <span className="text-base font-medium truncate">
              {participant.name}
            </span>
            <span className="text-lg">{getVoteDisplay(participant.vote)}</span>
          </div>
        ))}
      </div>

      {/* 💻 md ve üstü: eski kart yapısı */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="w-40 bg-base-200 rounded-2xl p-4 flex flex-col items-center justify-between hover:bg-base-300 transition-colors"
            >
              <h4 className="text-sm font-medium text-center mb-2 truncate">
                {participant.name}
              </h4>

              <hr className="w-full border-current mb-4" />

              <div className="flex items-center justify-center flex-1">
                <span className="text-3xl">
                  {getVoteDisplay(participant.vote)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ParticipantCards;
