import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { CookiesProvider } from 'react-cookie';
import 'antd/dist/antd.css';
import './index.sass';

const store = setupStore();
const rootElement = document.getElementById('root') as Element | DocumentFragment;
const root = createRoot(rootElement);
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();
