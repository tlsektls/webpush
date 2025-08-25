self.addEventListener('push', function(event) {
  event.waitUntil((async () => {
    let data = {};
    try {
      data = event.data ? await event.data.json() : {};
    } catch (e) {
      const text = event.data ? await event.data.text() : '';
      data = { title: '알림', body: text };
    }

    const title = data.title || '알림';
    const options = {
      body: data.body || '',
      //icon: '/favicon-180x180.png',
      icons: [
        {
          "src": "/favicon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable" 
        },
        {
          "src": "/favicon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any maskable" 
        }
      ],
      badge: '/favicon-w.png',
      requireInteraction: true, // ✅ iOS에서 longer display
      tag: 'ios-push-test'      // ✅ 덮어쓰기 방지
    };

    await self.registration.showNotification(title, options);
  })());
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.notification.data) {
        console.error('Click on WebPush with empty data, where url should be. Notification: ', event.notification)
        return;
    }
    if (!event.notification.data.url) {
        console.error('Click on WebPush without url. Notification: ', event.notification)
        return;
    }

    clients.openWindow(event.notification.data.url)
        .then(() => {
            // You can send fetch request to your analytics API fact that push was clicked
            // fetch('https://your_backend_server.com/track_click?message_id=' + pushData.data.message_id);
        });
});
//navigator.serviceWorker.getRegistrations().then(console.log);