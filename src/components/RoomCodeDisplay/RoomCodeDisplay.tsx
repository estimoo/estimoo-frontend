// src/components/RoomCodeDisplay.tsx
import { useState } from "react";

interface Props {
  code: string;
}

const RoomCodeDisplay: React.FC<Props> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span
      className="relative cursor-pointer bg-base-300 px-2 py-1 rounded font-mono group"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {code}
      {(hovered || copied) && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral text-neutral-content text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
          {copied ? "Kopyalandı!" : "Kopyala"}
        </span>
      )}
    </span>
  );
};

export default RoomCodeDisplay;
