import './App.css';
import 'dayjs/locale/fr';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useReactKeycloackId } from 'react-keycloak-id';

import { changeInfo, changeRole } from './config/store/feature/user';

import Landing from './pages/landing/index';
import Historique from './pages/historique';
import PrivateRoute from './helpers/PrivateRoute';
import Admin from './pages/admin';
import { useDispatch } from 'react-redux';
import Gestion from './pages/gestion';
import Alerting from './pages/admin/alerting';

//theme
import 'primereact/resources/themes/tailwind-light/theme.css';

//core
import 'primereact/resources/primereact.min.css';

//icons
import 'primeicons/primeicons.css';
import Finance from './pages/admin/finance';
import AdminRoute from './helpers/AdminRoute';

function App() {
  const { loadUserProfile, authenticated, tokenParsed } = useReactKeycloackId();
  const Dispatcher = useDispatch();
  // Create a browser router with the routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'home'} replace={true} />,
    },
    {
      path: '/home',
      element: (
        <PrivateRoute>
          <Landing />
        </PrivateRoute>
      ),
    },

    {
      path: '/gestion',
      element: (
        <PrivateRoute>
          <Gestion />
        </PrivateRoute>
      ),
      children: [
        {
          path: 'historique',
          element: <Historique />,
        },
        {
          path: 'admin',
          element: (
            <AdminRoute>
              <Admin />
            </AdminRoute>
          ),
          children: [
            {
              path: '',
              element: <Alerting />,
            },
            {
              path: 'alerting',
              element: <Alerting />,
            },
            {
              path: 'finance',
              element: <Finance />,
            },
          ],
        },
      ],
    },
  ]);
  // If the user is authenticated, load their profile and dispatch the info to the store
  if (authenticated) {
    loadUserProfile()
      .then((data) => {
        const user = JSON.stringify(data);
        Dispatcher(changeInfo({ info: user }));
      })
      .catch((e) => {
        console.log(e);
      });
    const role = JSON.stringify(tokenParsed?.resource_access);
    Dispatcher(changeRole({ roles: role }));
  }
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
