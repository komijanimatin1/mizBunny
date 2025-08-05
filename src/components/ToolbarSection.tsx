import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { 
  colorWandOutline, 
  colorWand, 
  personOutline, 
  person, 
  homeOutline, 
  home 
} from 'ionicons/icons';
import './ToolbarSection.css';

const ToolbarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'profile' | 'home'>('home');

  const handleTabClick = (tab: 'ai' | 'profile' | 'home') => {
    setActiveTab(tab);
  };

  return (
    <div className="toolbar-section">
      <div 
        className={`toolbar-item ${activeTab === 'ai' ? 'active' : ''}`}
        onClick={() => handleTabClick('ai')}
      >
        <IonIcon 
          icon={activeTab === 'ai' ? colorWand : colorWandOutline} 
          className="toolbar-icon"
        />
        <span className="toolbar-text">AI</span>
      </div>
      
      <div 
        className={`toolbar-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleTabClick('profile')}
      >
        <IonIcon 
          icon={activeTab === 'profile' ? person : personOutline} 
          className="toolbar-icon"
        />
        <span className="toolbar-text">پروفایل</span>
      </div>
      
      <div 
        className={`toolbar-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabClick('home')}
      >
        <IonIcon 
          icon={activeTab === 'home' ? home : homeOutline} 
          className="toolbar-icon"
        />
        <span className="toolbar-text">خانه</span>
      </div>
    </div>
  );
};

export default ToolbarSection;
