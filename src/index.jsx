import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend', 
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// PWA Configuration
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512",
  name: "Virtual Organizer",
  shortName: "Virtual Orga"
};

const progressierScript = document.createElement('script');
progressierScript.src = 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js';
progressierScript.defer = true;
document.head.appendChild(progressierScript);

// Umami Analytics
if (import.meta.env.VITE_PUBLIC_APP_ENV !== 'development') {
  const umamiScript = document.createElement('script');
  umamiScript.defer = true;
  umamiScript.src = 'https://cloud.umami.is/script.js';
  umamiScript.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(umamiScript);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);