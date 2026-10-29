import { config } from './data';

// Carga Umami solo en el sitio publicado y solo si hay un Website ID configurado
export function loadAnalytics() {
  if (import.meta.env.DEV || !config.umamiWebsiteId) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.dataset.websiteId = config.umamiWebsiteId;
  document.head.appendChild(script);
}

// Registra un evento (ej. descarga de CV). Si Umami no está cargado, no hace nada.
export const track = (evento) => window.umami?.track(evento);
