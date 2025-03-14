import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import Tailwind CSS

console.log('Rendering App');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}