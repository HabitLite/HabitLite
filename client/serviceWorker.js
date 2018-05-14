// import axios from "axios"
// export default function subscribePush() {
//   navigator.serviceWorker.ready.then(registration => {
//     if (!registration.pushManager) {
//       alert("Push Unsupported")
//       return
//     }
    
//     registration.pushManager
//       .subscribe({
//         userVisibleOnly: true, //Always display notifications
//         applicationServerKey: convertedVapidKey
//       })
//       .then(subscription => axios.post("/api/push/register", subscription))
//       .catch(err => console.error("Push subscription error: ", err))
//   })
// }