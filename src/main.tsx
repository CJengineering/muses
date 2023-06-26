import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app';
import { AuthProvider } from './app/AuthContext';
import { Provider } from 'react-redux';
import {store } from './app/store'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
     <AuthProvider>
      <Router>
        <App />
      </Router>
     </AuthProvider>
    </Provider >
  </StrictMode>
);
