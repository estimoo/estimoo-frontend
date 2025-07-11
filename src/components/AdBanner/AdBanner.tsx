import React from "react";
import "./AdBanner.css";
import eyesIcon from "../../assets/eyes.svg";

const AdBanner: React.FC = () => {
  return (
    <div className="hidden md:flex w-64 bg-base-300 rounded-lg p-4 flex-col items-center justify-center text-center">
      <img src={eyesIcon} alt="Eyes" className="w-16 h-16 mb-4" />

      <h3 className="text-lg font-bold mb-2">BURAYA BAKARLAR</h3>

      <p className="text-sm">info@estimoo.co</p>
    </div>
  );
};

export default AdBanner;
