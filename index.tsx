import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/big-shoulders-display/latin-800';
import '@fontsource/big-shoulders-display/latin-900';
import '@fontsource/archivo/latin-400';
import '@fontsource/archivo/latin-500';
import '@fontsource/archivo/latin-600';
import '@fontsource/ibm-plex-mono/latin-500';
import '@fontsource/ibm-plex-mono/latin-600';
import './styles/brutal.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
