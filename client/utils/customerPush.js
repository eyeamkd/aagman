import { getMessaging, getToken , onMessage} from "firebase/messaging"
import { initializeApp } from "firebase/app"
import localforage from 'localforage'
import axios from "axios";

// import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('customer_fcm_token')
  },

  init: async function (orderId) {
    initializeApp({
      apiKey: "AIzaSyDX7GDLd9ZDLaNdR6DdbV2G0PeDzmq2ACw",
      projectId: "aagman-44046",
      messagingSenderId: "729770729026",
      appId: "1:729770729026:web:a68e727a58d67d45ac17db"
    })

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        const currentToken =  await this.tokenInlocalforage();
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registercustomer`, { currentToken, orderId });
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
          localforage.setItem('customer_fcm_token', currentToken)
          console.log('customer_fcm_token', currentToken)
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registercustomer`, { currentToken , orderId});
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