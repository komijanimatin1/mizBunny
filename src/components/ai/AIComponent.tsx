import React, { useEffect, useRef } from 'react';
import { useInAppBrowser } from '../../hooks/useInAppBrowser';

const AIComponent: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { openBrowser } = useInAppBrowser();

  useEffect(() => {
     const handleMessage = async (event: MessageEvent) => {




      console.log('Message received from iframe:');

      const url =  event.data.url;r
      console.log('url is :'+url);


      try {
        console.log('Opening URL using useInAppBrowser hook');
        await openBrowser(url, '_blank', `  showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=مشاوره,menu=yes,hardwareback=yes,closebutton=yes,footerheight=80,disallowoverscroll=yes,bouncescroll=no`);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }




      // Check if the message is from the expected origin
      if (event.origin !== 'https://ai.dccim.ir') {
        return;
      }

      // Handle the message from iframe
      console.log('Message received from iframe:', event.data);
      
      // You can add your custom logic here based on the message type
      if (event.data && typeof event.data === 'object') {
        switch (event.data.type) {
          case 'chat_message':
            console.log('Chat message:', event.data.message);
            break;
          case 'user_action':
            console.log('User action:', event.data.action);
            break;
          case 'error':
            console.error('Error from iframe:', event.data.error);
            break;
          default:
            console.log('Unknown message type:', event.data);
        }
      }
    };


    // Add event listener
    window.addEventListener('message', handleMessage);


    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white w-full h-full rounded-2xl">
      <div className="w-full h-full flex-1 relative overflow-hidden rounded-xl bg-white">
        <iframe
          ref={iframeRef}
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
