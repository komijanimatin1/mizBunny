import React from 'react';

const AIComponent: React.FC = () => {

  return (
    <div className="flex flex-col bg-white w-full h-[calc(100%-theme(spacing.14))] rounded-2xl mt-safe-8">
      <div className="w-full h-full flex-1 relative overflow-hidden rounded-xl bg-white shadow-lg">
        <iframe
          src="https://ai.dccim.ir/"
          title="AI Chatbot"
          className="w-full h-full border-none rounded-xl"
          frameBorder="0"
          inputMode="text"
          lang='fa'
          allow="microphone; camera; geolocation"
        />
      </div>
    </div>
  );
};

export default AIComponent;
