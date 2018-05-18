if (navigator.onLine) {
  console.log('online');
} else {
  console.log('offline');
}

window.addEventListener('offline', function(event) {
  console.log('offline');
});
window.addEventListener('online', function(event) {
  console.log('online');
});

// window.addEventListener('load', function() {
//   var status = document.getElementById('status');
//   var log = document.getElementById('log');

//   function updateOnlineStatus(event) {
//     var condition = navigator.onLine ? 'online' : 'offline';

//     status.className = condition;
//     status.innerHTML = condition.toUpperCase();

//     log.insertAdjacentHTML(
//       'beforeend',
//       'Event: ' + event.type + '; Status: ' + condition
//     );
//   }

//   window.addEventListener('online', updateOnlineStatus);
//   window.addEventListener('offline', updateOnlineStatus);
// });

var networkDataReceived = false;

startSpinner();

// fetch fresh data
var networkUpdate = fetch('/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    updatePage();
  });

// fetch cached data
caches
  .match('/data.json')
  .then(function(response) {
    if (!response) throw Error('No data');
    return response.json();
  })
  .then(function(data) {
    // don't overwrite newer network data
    if (!networkDataReceived) {
      updatePage(data);
    }
  })
  .catch(function() {
    // we didn't get cached data, the network is our last hope:
    return networkUpdate;
  })
  .catch(showErrorMessage)
  .then(stopSpinner);

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
