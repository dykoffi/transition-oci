import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  let items: MenuItem[] = [
    /*         {label: 'Gestion des Opex', icon: 'pi pi-fw pi-table',url:'/gestion/admin'},
     */ { label: 'Alerting', icon: 'pi pi-fw pi-megaphone', url: '/gestion/admin', className: 'text-orange-500' },
    { label: 'Paramètres', icon: 'pi pi-fw pi-credit-card', url: '/gestion/admin/finance' },
  ];

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Menu model={items} className="bg-orange-50" />
      </div>
      <div className="col-span-4">
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
