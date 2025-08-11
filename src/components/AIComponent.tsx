import React from 'react';
import './AIComponent.css';

const AIComponent: React.FC = () => {

  return (
    <div className="ai-component">
      <div className="ai-iframe-container">
        <iframe
          src="https://dify.fanap.mizbunny.com/chat/dVdAMx1R1qbxoGc2"
          title="AI Chatbot"
          className="ai-iframe"
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
