import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { ReactKeycloackIdProvider } from 'react-keycloak-id';
import { Provider } from 'react-redux';
import { store } from './config/store/store';
import { ModalsProvider } from '@mantine/modals';

const init = {
  url: import.meta.env.VITE_KEYCLOAK_URL_AUTH,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
}

console.log('init',init);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ReactKeycloackIdProvider init={init} initOptions={{
      onLoad: 'login-required', 
      
    }}
    
    loadingComponent= "Chargement..."
    > 
    <React.StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
    </ReactKeycloackIdProvider>
  </Provider>
 ,
);
