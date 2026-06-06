import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import posthog from 'posthog-js';

// Initialize PostHog
const posthogKey = import.meta.env.VITE_POSTHOG_KEY || 'phc_wNUQSvKvfSVPCDCh7DTHk7hzkSc7A4agRv6LLAWWr2qn';
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

if (typeof window !== 'undefined') {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only', 
    capture_pageview: true,
    session_recording: {
      maskAllInputs: false,
      maskTextSelector: ".sensitive-data",
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
