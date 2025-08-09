import React from 'react';
import './AIComponent.css';

const AIComponent: React.FC = () => {
  return (
    <div className="ai-component">
      <div className="ai-header">
        <h2>AI Assistant</h2>
        <p>Chat with our AI assistant for help and support</p>
      </div>
      <div className="ai-iframe-container">
        <iframe
          src="http://dify.fanap.mizbunny.com/chatbot/dVdAMx1R1qbxoGc2"
          title="AI Chatbot"
          className="ai-iframe"
          frameBorder="0"
          allow="microphone; camera; geolocation"
        />
      </div>
    </div>
  );
};

export default AIComponent; 