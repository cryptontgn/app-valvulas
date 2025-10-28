// service-worker.js - Versión Final con Cache Busting (v14)

const CACHE_NAME = 'panel-valvulas-cache-v14-final';
const HTML_FILE = './index.html';



// Tu lista completa de archivos, sin cambios, pero con rutas relativas consistentes.
const urlsToCache = [
    './',
    HTML_FILE, // Ahora cachea el archivo correcto
    './manifest.json',
    './zonas.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    './icons/icon-180x180.png',
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css',
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
    // ================== TU LISTA COMPLETA DE ESQUEMAS ==================
    'esquemas/M-4-13.png', 'esquemas/M-2-1.png', 'esquemas/Q-2-2.png', 'esquemas/DIES108.png', 
    'esquemas/EM-1-2.png', 'esquemas/SENSOR EXTERIORS.png', 'esquemas/SOLI100.png', 'esquemas/Q-1---2.png', 
    'esquemas/TALLERCAL.png', 'esquemas/diesel terraza nuevo.png', 'esquemas/M-1-23.png', 'esquemas/M-1-1I.png', 
    'esquemas/AREA-2.png', 'esquemas/Diesel A.png', 'esquemas/Tdies92.png', 'esquemas/V1-74.png', 'esquemas/AREA-3.png', 
    'esquemas/M-1-1H.png', 'esquemas/M-1-22.png', 'esquemas/Tapar100bis.png', 'esquemas/Q-1---3.png', 
    'esquemas/EM-1-3.png', 'esquemas/CON108EL.png', 'esquemas/CtrTERR.png', 'esquemas/Q-2-3.png', 
    'esquemas/M-3-27.png', 'esquemas/U-5-27.png', 'esquemas/U-2-10.png', 'esquemas/M-2-2.png', 'esquemas/Q-2-1.png', 
    'esquemas/EM-1-1.png', 'esquemas/Q-1---1.png', 'esquemas/PENET100.png', 'esquemas/PLANT.png', 'esquemas/M-4-4.png', 
    'esquemas/AREA-1.png', 'esquemas/Diesel B.png', 'esquemas/APAR89.png', 'esquemas/COMB100.png', 
    'esquemas/COMB114.png', 'esquemas/N-1-1.png', 'esquemas/DESG-AN.png', 'esquemas/APAR104.png', 
    'esquemas/M-2-3.png', 'esquemas/TURB82-GRAL.png', 'esquemas/Tcontrol91.png', 'esquemas/M-4-15.png', 
    'esquemas/APAR100.png', 'esquemas/Q-2-4.png', 'esquemas/GaleriasKC.png', 'esquemas/SOLI106.png', 
    'esquemas/N-1-5.png', 'esquemas/EM-1-4.png', 'esquemas/P-2-1.png', 'esquemas/Tcontencion108.png', 
    'esquemas/PENET111.png', 'esquemas/COMB110.png', 'esquemas/M-4-1.png', 'esquemas/M-1-19.png', 
    'esquemas/T78ELEC.png', 'esquemas/AREA-4.png', 'esquemas/AREA-5.png', 'esquemas/M-1-18.png', 
    'esquemas/DIES104B.png', 'esquemas/M-1-24.png', 'esquemas/COMB105.png', 'esquemas/PLAN-P-1.png', 
    'esquemas/PENET104.png', 'esquemas/CONTR108.png', 'esquemas/CambiadoresEJ.png', 'esquemas/Q-2-5.png', 
    'esquemas/S-1-2.png', 'esquemas/AUX114EL.png', 'esquemas/M-4-14.png', 'esquemas/M-3-35.png', 
    'esquemas/M-3-37.png', 'esquemas/PLAN-Z-8.png', 'esquemas/M-4-16.png', 'esquemas/P-2-2.png', 
    'esquemas/Bcinterc.png', 'esquemas/CTR114EL.png', 'esquemas/TURB100.png', 'esquemas/M3-33_34.png', 
    'esquemas/Tdies96.png', 'esquemas/AREA-7.png', 'esquemas/AREA-6.png', 'esquemas/Q-2-6_7.png', 
    'esquemas/DIES104A.png', 'esquemas/PENET113.png', 'esquemas/M-1-16B.png', 'esquemas/PLAN-Z-9.png', 
    'esquemas/M-5-4.png', 'esquemas/A-4.png', 'esquemas/TUNEL91.png', 'esquemas/U-6-1b.png', 'esquemas/S-2-15.png', 
    'esquemas/GN-D.png', 'esquemas/Q-2---1.png', 'esquemas/AR-5.png', 'esquemas/PLAN-P.png', 'esquemas/Q-1-3.png', 
    'esquemas/W-3-7A.png', 'esquemas/M-3-2.png', 'esquemas/Q-3-1.png', 'esquemas/P-1-6.png', 'esquemas/AUX108EL.png', 
    'esquemas/Q-1-2.png', 'esquemas/TCOMB119.png', 'esquemas/M1-2_3_4.png', 'esquemas/U-3-19.png', 
    'esquemas/Plan-q.png', 'esquemas/M-2-10.png', 'esquemas/AR-4.png', 'esquemas/ARE-AF1.png', 'esquemas/AUX114.png', 
    'esquemas/AUX100.png', 'esquemas/DIE108EL.png', 'esquemas/A-5.png', 'esquemas/M-5-5.png', 'esquemas/TPEN108.png', 
    'esquemas/S-1-4A.png', 'esquemas/M-5-7.png', 'esquemas/A-7.png', 'esquemas/EJ  cambiadores.png', 
    'esquemas/P-5-1.png', 'esquemas/AUX96.png', 'esquemas/CTR108EL.png', 'esquemas/SOLI96.png', 
    'esquemas/TURB82.png', 'esquemas/AR-6.png', 'esquemas/PLAN-D.png', 'esquemas/W-3-7B.png', 'esquemas/Q-3-2.png', 
    'esquemas/PENET91.png', 'esquemas/Q-3-3.png', 'esquemas/W-3-7C.png', 'esquemas/Q-1-1.png', 
    'esquemas/Q-2-3_6.png', 'esquemas/Ar-7.png', 'esquemas/PLAN-R.png', 'esquemas/M-2-13.png', 'esquemas/ARE-AF2.png', 
    'esquemas/Q-1-8BIS.png', 'esquemas/TDIES104.png', 'esquemas/M-5-6.png', 'esquemas/M-3-43.png', 
    'esquemas/M-3-57.png', 'esquemas/M-5-2.png', 'esquemas/PLANTZO.png', 'esquemas/Diesel negro.png', 
    'esquemas/Q-1-11.png', 'esquemas/A-2.png', 'esquemas/TDIES100.png', 'esquemas/SOLI87.png', 'esquemas/GN-B.png', 
    'esquemas/M-1-6.png', 'esquemas/Plan-v.png', 'esquemas/M-2-17.png', 'esquemas/TURB93.png', 'esquemas/AR-3.png', 
    'esquemas/TURB78.png', 'esquemas/ARE-9.png', 'esquemas/P-3-2.png', 'esquemas/Q-1-5.png', 'esquemas/PENET95.png', 
    'esquemas/ARE-8.png', 'esquemas/Con114el.png', 'esquemas/Tunelacc.png', 'esquemas/AR-2.png', 
    'esquemas/M-2-16.png', 'esquemas/PLAN-W.png', 'esquemas/M-1-7.png', 'esquemas/GN-C.png', 'esquemas/EJ.png', 
    'esquemas/TACALEL.png', 'esquemas/S-2-12.png', 'esquemas/COMPO.png', 'esquemas/Q-1-10.png', 
    'esquemas/M-3-56.png', 'esquemas/M-5-1.png', 'esquemas/CONT114.png', 'esquemas/CONT100.png', 
    'esquemas/Q-2--1.png', 'esquemas/A-1.png', 'esquemas/general tren A POF115.png', 'esquemas/TAUX108.png', 
    'esquemas/GN-A.png', 'esquemas/S-1-11A.png', 'esquemas/M-1-5.png', 'esquemas/PLAN-B.png', 'esquemas/M-2-14.png', 
    'esquemas/Q-1-6.png', 'esquemas/P-3-1.png', 'esquemas/M-3-7.png', 'esquemas/Q-3-4.png', 'esquemas/P-1-3.png', 
    'esquemas/P-1-2.png', 'esquemas/CANALTOM.png', 'esquemas/Q-1-7.png', 'esquemas/M-2-15.png', 'esquemas/AR-1.png', 
    'esquemas/Tturb89.png', 'esquemas/AUX91.png', 'esquemas/Tcontrol108.png', 'esquemas/PLANTA1.png', 
    'esquemas/SOLI91.png', 'esquemas/EJ-A.png', 'esquemas/M-3-55.png', 'esquemas/TPEN100.png', 
    'esquemas/M-2-6_7.png', 'esquemas/M3-45_46.png', 'esquemas/U-1-14.png', 'esquemas/M-2-4_5.png', 
    'esquemas/AUX108.png', 'esquemas/M-1-9.png', 'esquemas/PLAN-N.png', 'esquemas/PLAN-Y.png', 'esquemas/CTR91ELE.png', 
    'esquemas/ARE-6.png', 'esquemas/TCOMB105.png', 'esquemas/W-4-3.png', 'esquemas/W-4-2.png', 
    'esquemas/Tcomb110.png', 'esquemas/DIE100EL.png', 'esquemas/Are-7.png', 'esquemas/W-3-5A.png', 
    'esquemas/TURB89.png', 'esquemas/PLAN-X.png', 'esquemas/M-2-19.png', 'esquemas/M-1-8.png', 'esquemas/PLAN-O.png', 
    'esquemas/CC_INT1.png', 'esquemas/BAS142.png', 'esquemas/Tapar100.png', 'esquemas/DESE93.png', 
    'esquemas/DESE87.png', 'esquemas/M-2-8_9.png', 'esquemas/AUX100EL.png', 'esquemas/W-2-6.png', 'esquemas/U-1-1.png', 
    'esquemas/DESE91.png', 'esquemas/U-3-3.png', 'esquemas/CTR100EL.png', 'esquemas/PLAN-M.png', 
    'esquemas/PLAN-Z.png', 'esquemas/ARE-5.png', 'esquemas/Q-1-9.png', 'esquemas/Tturb78.png', 'esquemas/AUX91EL.png', 
    'esquemas/diesel B terraza nuevo.png', 'esquemas/W-4-1.png', 'esquemas/Q-1-8.png', 'esquemas/TTURB100.png', 
    'esquemas/W-3-5B.png', 'esquemas/ARE-4.png', 'esquemas/T100ELEC.png', 'esquemas/CC_INT2.png', 'esquemas/EF.png', 
    'esquemas/Tcontrol108-bis.png', 'esquemas/EJ-N.png', 'esquemas/T82ELEC.png', 'esquemas/W-2-3.png', 
    'esquemas/W-3-8A.png', 'esquemas/Tturb82.png', 'esquemas/ELEVADOR-2.png', 'esquemas/PLAN-H.png', 
    'esquemas/Q-1--10.png', 'esquemas/M3-27_28.png', 'esquemas/W-4-5.png', 'esquemas/P-1-9.png', 
    'esquemas/COMPO-B.png', 'esquemas/CASA_CI.png', 'esquemas/P-1-8.png', 'esquemas/W-4-4.png', 'esquemas/U-5-1.png', 
    'esquemas/ARE-1.png', 'esquemas/PLAN-I.png', 'esquemas/Tdies108.png', 'esquemas/W-2-2.png', 'esquemas/TPEN113.png', 
    'esquemas/CONT121.png', 'esquemas/DIE104EL.png', 'esquemas/Tapar104.png', 'esquemas/A-8.png', 
    'esquemas/CAL_ALTA.png', 'esquemas/Tcontrol100.png', 'esquemas/Tcontrol114.png', 'esquemas/AR-9.png', 
    'esquemas/PLAN-K.png', 'esquemas/W-3-8B.png', 'esquemas/TCOMB100.png', 'esquemas/TCOMB114.png', 
    'esquemas/ARE-3.png', 'esquemas/Aux100escaleras.png', 'esquemas/COMPO-A.png', 'esquemas/ARE-2.png', 
    'esquemas/W-3-8C.png', 'esquemas/Contr91.png', 'esquemas/PLAN-J.png', 'esquemas/AR-8.png', 'esquemas/TAUX114.png', 
    'esquemas/TAUX100.png', 'esquemas/T-1-38.png', 'esquemas/DESE96.png', 'esquemas/BAST141D.png', 
    'esquemas/TPEN104.png', 'esquemas/CONT108.png', 'esquemas/M-3-1E.png', 'esquemas/M-3-13.png', 
    'esquemas/PLAN-Z-4.png', 'esquemas/Q-1--3.png', 'esquemas/Q-2-10.png', 'esquemas/EXTERIORES.png', 
    'esquemas/W-1-4.png', 'esquemas/Text.general.png', 'esquemas/POV17.png', 'esquemas/W-3-6.png', 
    'esquemas/DI-1-3.png', 'esquemas/Dies96.png', 'esquemas/TCOMPO.png', 'esquemas/DI-1-2.png', 
    'esquemas/M-1-17.png', 'esquemas/M-1-1A.png', 'esquemas/DES-CAL.png', 'esquemas/M-3-24A.png', 
    'esquemas/Q-1--2.png', 'esquemas/Venteosydrenajes.png', 'esquemas/Dies100.png', 'esquemas/M2-11_12.png', 
    'esquemas/PLAN-Z-5.png', 'esquemas/M-3-12.png', 'esquemas/W-5-1.png', 'esquemas/M-3-1D.png', 
    'esquemas/M-3-38.png', 'esquemas/Text.zona-j.png', 'esquemas/M-3-1F.png', 'esquemas/W-5-3.png', 
    'esquemas/PLAN-Z-7.png', 'esquemas/M-3-10.png', 'esquemas/T89ELEC.png', 'esquemas/CCEXT.png', 
    'esquemas/ARE-7-AQ.png', 'esquemas/S-1-11ALT.png', 'esquemas/M-3-49B.png', 'esquemas/APAR-CUB.png', 
    'esquemas/M-1-1C.png', 'esquemas/M-1-15.png', 'esquemas/DESE100.png', 'esquemas/S-1-4ALT.png', 
    'esquemas/AREA-8.png', 'esquemas/Aux91escaleras.png', 'esquemas/AREA-9.png', 'esquemas/Tpen91.png', 
    'esquemas/DI-1-1.png', 'esquemas/Taux91.png', 'esquemas/M-1-28.png', 'esquemas/M-1-1b.png', 
    'esquemas/W-3-4.png', 'esquemas/PENET108.png', 'esquemas/U-2-1.png', 'esquemas/Are5plat.png', 
    'esquemas/M-3-49C.png', 'esquemas/Q-1--1.png', 'esquemas/Q-2-9.png', 'esquemas/M-3-11.png', 
    'esquemas/W-5-2.png', 'esquemas/S-1-14.png', 'esquemas/PLAN-Z-2.png', 'esquemas/M-3-15.png', 
    'esquemas/M-3-1c.png', 'esquemas/M-3-29.png', 'esquemas/U-6-1.png', 'esquemas/Q-2-16.png', 
    'esquemas/Q-1-ACC.png', 'esquemas/W-1-2.png', 'esquemas/CONTR114.png', 'esquemas/COMB119.png', 
    'esquemas/CONTR100.png', 'esquemas/M-1-10.png', 'esquemas/M-1-1F.png', 'esquemas/Tpen95.png', 
    'esquemas/DESE104.png', 'esquemas/AUX96EL.png', 'esquemas/Tapar89.png', 'esquemas/M-1-1G.png', 
    'esquemas/M-4-9.png', 'esquemas/W-3-1.png', 'esquemas/M-1-11.png', 'esquemas/W-1-3.png', 
    'esquemas/Tcontencion114.png', 'esquemas/Tcontencion100.png', 'esquemas/M-3-28.png', 'esquemas/M-3-1B.png', 
    'esquemas/M-3-14.png', 'esquemas/PLAN-Z-3.png', 'esquemas/PLAN-Z-1.png', 'esquemas/DIES104.png', 
    'esquemas/M-1-14B.png', 'esquemas/Q-2-15.png', 'esquemas/M-3-25A.png', 'esquemas/W-1-1.png', 
    'esquemas/M-3-44C.png', 'esquemas/TURB121.png', 'esquemas/M-1-13.png', 'esquemas/Q-1-7BIS.png', 
    'esquemas/Taux96.png', 'esquemas/M-1-1E.png', 'esquemas/M1-25_26.png', 'esquemas/W-3-3.png', 
    'esquemas/Dies92.png', 'esquemas/W-3-2.png', 'esquemas/M-1-1D.png', 'esquemas/M-1-12.png', 
    'esquemas/M-3-44B.png', 'esquemas/U-4-1.png', 'esquemas/ARQUETAS_KC.png', 'esquemas/M-3-1A.png'
];

// --- INSTALACIÓN ---
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Usamos el método robusto que no falla si un solo archivo no se encuentra.
      const promises = urlsToCache.map(url => cache.add(url).catch(err => console.warn(`Cacheo fallido para: ${url}`)));
      return Promise.all(promises);
    })
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

// --- FETCH (Network-First para el HTML, Cache-First para el resto) ---
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Si la red funciona, actualizamos la caché con la nueva versión.
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
          return networkResponse;
        })
        .catch(() => {
          // Si la red falla, servimos el HTML desde la caché.
          return caches.match(HTML_FILE); // Servimos explícitamente el HTML correcto.
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});