const CACHE_NAME = 'panel-valvulas-cache-v1';

// Lista de recursos que se guardarán en la caché para que la app funcione sin conexión.
const urlsToCache = [
  // --- FICHEROS PRINCIPALES DE LA APP ---
  '/',
  'index.html',
  'manifest.json',
  'zonas.json', // ¡Importante! El fichero de datos de las zonas.

  // --- ICONOS DE LA APP ---
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',

  // --- LIBRERÍAS EXTERNAS (para que funcionen offline) ---
  'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css',
  'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',

  // ======================================================================= //
  // =================== ¡¡ACCIÓN REQUERIDA POR TI!! ======================= //
  //                                                                         //
  //    AÑADE AQUÍ LA RUTA A CADA UNA DE TUS IMÁGENES DE LA CARPETA 'esquemas'. 
  //    Si no lo haces, los esquemas no se verán sin conexión.               
  //                                                                         //
  //    Ejemplo:                                                             
  //    'esquemas/esquema_A1.png',                                            
  //    'esquemas/esquema_B2.png',                                            
  //    ... y así con todas las demás.                                       
  //                                                                         //
  'esquemas/EJEMPLO_IMAGEN_1.png',
  'esquemas/EJEMPLO_IMAGEN_2.png'
  // ======================================================================= //
];

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, añadiendo recursos principales.');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Fallo al cachear durante la instalación:', error);
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la app pide un recurso (una imagen, un script, etc.).
// Interceptamos la petición y respondemos con el recurso desde la caché si está disponible.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devolvemos desde ahí.
        if (response) {
          return response;
        }
        // Si no está en la caché, hacemos la petición a la red como se haría normalmente.
        return fetch(event.request);
      })
  );
});