const convertedVapidKey = urlBase64ToUint8Array('BCj878jhvm2a7vwV771YGjWJauzb-FtRnHKMWmdf_ufOzAe7xfUFtYlsVzNDMDWxK_iouk6bNwsWcG4T34WjX5g')

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    var atob = require('atob')
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function sendSubscription(subscription) {
  return fetch(`http://localhost:5000/notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      Notification.requestPermission(function(result) {
        console.log("User choice", result);
        if (result !== "granted") {
          console.log("No notification permission granted!");
        } else {
            registration.pushManager.getSubscription().then(function(existedSubscription) {
                if (existedSubscription === null) {
                  console.log('No subscription detected, make a request.')
                  registration.pushManager.subscribe({
                    applicationServerKey: convertedVapidKey,
                    userVisibleOnly: true,
                  }).then(function(newSubscription) {
                    console.log('New subscription added.', newSubscription)
                    sendSubscription(newSubscription)
                  }).catch(function(e) {
                    if (Notification.permission !== 'granted') {
                      console.log('Permission was not granted.')
                    } else {
                      console.error('An error ocurred during the subscription process.', e)
                    }
                  })
                } else {
                  console.log('Existed subscription detected.', existedSubscription)
                  sendSubscription(existedSubscription)
                }
              })
        }
      });
    })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}

