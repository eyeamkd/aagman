import { getMessaging, getToken , onMessage} from "firebase/messaging"
import { initializeApp } from "firebase/app"
import localforage from 'localforage'
import axios from "axios";

// import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function (userId) {
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID
    })

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        const currentToken =  await this.tokenInlocalforage();
        await axios.post('http://localhost:5000/register', { currentToken, userId });
        return false
      }

      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
      });      
      getToken(messaging, { vapidKey: 'BHR6AxnJk5EXS_2aJFF0Mm04livLu7oKb9pXq8Uvrgw0wfiLzNehgDW6wbSZ9VGq8q45dU883sWIRIFu0oaft4c' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          localforage.setItem('fcm_token', currentToken)
          console.log('fcm_token', currentToken)
          axios.post('http://localhost:5000/register', { currentToken, userId });
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
      
    } catch (error) {
      console.error(error)
    }
  },
}

export { firebaseCloudMessaging }