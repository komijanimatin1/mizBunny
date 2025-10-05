import { IonContent, IonHeader, IonPage, IonTitle, useIonRouter } from '@ionic/react';
import HomeElements from '../components/home/HomeElements';
import { useBackButton } from '../hooks/useBackButton';
import { useEffect } from 'react';
import { useInAppBrowser } from '../hooks/useInAppBrowser';

const Home: React.FC = () => {
  // Handle hardware back button to close app when on home route
  useBackButton();
  const { openBrowser } = useInAppBrowser();
  const ionRouter = useIonRouter();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      console.log('--------------event is :',JSON.stringify(event))
      console.log('--------------event data is :',JSON.stringify(event.data))

     console.log('Message received from iframe:');

     const url =  event.data.data.url;
     console.log('url is :'+url);
     try {
      if(event.data.data.type === 'mizbunny-services'){
       console.log('Opening URL using useInAppBrowser hook');
       await openBrowser(url, '_blank', `  showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${event.data.data.title},menu=yes,hardwareback=yes,closebutton=yes,footerheight=80,disallowoverscroll=yes,bouncescroll=no`);
      }else if(event.data.data.type === 'third-party'){
        const handleItemClick = (url: string, title: string, color: string, imageUrl: string, backgroundColor: string) => {
          // Find the facility data to pass to the transfer page
          // const facility = .facilities.find((f: any) => f.url === event.data.data.url);
          if (event.data.data.url) {
            const queryParams = new URLSearchParams();
            queryParams.append('url', url);
            queryParams.append('title', title);
            queryParams.append('icon', imageUrl);
            queryParams.append('color', color);
            queryParams.append('backgroundColor', backgroundColor);
            ionRouter.push(`/transfer?${queryParams.toString()}`, 'forward');
          }
        };
        handleItemClick(event.data.data.url, event.data.data.title, event.data.data.color, event.data.data.imageUrl, event.data.data.backgroundColor);
        // await openBrowser(url, '_blank', `  showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${event.data.data.title},menu=yes,hardwareback=yes,closebutton=yes,footerheight=80,disallowoverscroll=yes,bouncescroll=no`);
      }
     } catch (error) {
       console.error('Failed to open URL:', error);
     }

    //  // Check if the message is from the expected origin
    //  if (event.origin !== 'https://dev.ai.arnacore.ir') {
    //    return;
    //  }

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
    <IonPage>
      {/* <IonHeader>
        <IonTitle>
        hola
        </IonTitle>
      </IonHeader> */}
      <IonContent scrollY={false}>
        <div className="w-full h-full bg-[#E0E0E0] px-4 pb-24 text-lg text-[#333] pt-16 rounded-xl">
          {/* <HomeElements /> */}
          <iframe
          src="https://dev.home.arnacore.ir"
          className="w-full h-full rounded-xl"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
