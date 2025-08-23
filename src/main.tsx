import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './utils/safeArea'; // Initialize safe area detection

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);