// Service Worker สำหรับ PWA พื้นฐาน
const CACHE_NAME = 'mel-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/manual.html',
  '/manifest.json',
  '/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Network First strategy (ดึงข้อมูลสดจากเน็ตก่อนเสมอ ถ้าออฟไลน์ค่อยดึงจากแคช)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
