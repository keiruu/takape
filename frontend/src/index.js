import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

import { CafeProvider } from './contexts/CafeContext';

ReactDOM.render(
  <CafeProvider>
    <App />
  </CafeProvider>,
  document.getElementById('root')
);

