import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { ReactKeycloackIdProvider } from 'react-keycloak-id';
import { Provider } from 'react-redux';
import { store } from './config/store/store';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';

const init = {
  url: import.meta.env.VITE_KEYCLOAK_URL_AUTH,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
}

console.log('init', init);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ReactKeycloackIdProvider init={init} initOptions={{
      onLoad: 'login-required',

    }}

      loadingComponent="Chargement..."
    >
      <React.StrictMode>
        <MantineProvider >
          <App />
        </MantineProvider>
      </React.StrictMode>
    </ReactKeycloackIdProvider>
  </Provider>
  ,
);
