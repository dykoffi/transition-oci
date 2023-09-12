import { useEffect, useState } from 'react';
import { getAlerting, updateAlerting } from '../../services/alerting';
import { Tree } from 'primereact/tree';
import { Dialog } from 'primereact/dialog';
import { MultiSelect, TextInput } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'primereact/button';
import { useForm } from '@mantine/form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../services/notification';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/store/store';
import { getEmailById, getTelephoneById, getTypes } from '../../utils';

const Alerting = () => {
  const [visible1, setVisible1] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('center');
  const [alerts, setAlerts] = useState([]);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [alertSelect, setAlertSelect] = useState([]);
  const state = useSelector((state: RootState) => state.user);
  const user_role = JSON.parse(state.roles);
  const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
  const role = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];

 
  const emailForm = useForm({
    initialValues: {
      selectedFichier: [],
      email: '',
    },
  });

  const addEmailAlert = (values: { selectedFichier: any[]; email: string }) => {
    values.selectedFichier.map(async (id) => {
      const email = getEmailById(alerts,id);
      if (email && !email.includes(values.email)) {
        email.push(values.email);
        updateAlerting({
          id: id,
          email: email,
          updatedAt: new Date(),
        });
        const alerting = await getAlerting();
        setAlerts(alerting.data);
        setVisible1(false);
        setLoaded(true);
        notify('Le(s) adresse(s) mail(s) a(ont) bien été ajouté', 'sucess');
      } else {
        notify('email dejà enregistré', 'error');
      }
    });
  };

  const telForm = useForm({
    initialValues: {
      selectedFichier: [],
      telephone: '',
    },
  });

  const addTelAlert = (values: { selectedFichier: any[]; telephone: string }) => {
    values.selectedFichier.map(async (id) => {
      const telephone = getTelephoneById(alerts,id);
      if (telephone && !telephone.includes(values.telephone)) {
        telephone.push(values.telephone);
        updateAlerting({
          id: id,
          telephone: telephone,
          updatedAt: new Date(),
        });
        const alerting = await getAlerting();
        setAlerts(alerting.data);
        setVisible2(false);
        setLoaded(true);
        notify('Le(s) numéro(s) de téléphone a(ont) bien été ajouté', 'sucess');
      } else {
        notify('telephone dejà enrégistré', 'error');
      }
    });
  };




  const show1 = (position: string) => {
    setPosition(position);
    setVisible1(true);
  };
  const show2 = (position: string) => {
    setPosition(position);
    setVisible2(true);
  };

  async function loadAlerting() {
    try {
      const alerting = await getAlerting();
      alerting.data.sort(function (a: { typeFichier: string }, b: { typeFichier: string }) {
        const nameA = a.typeFichier.toUpperCase(); // ignore upper and lowercase
        const nameB = b.typeFichier.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });

      const alert = alerting.data.map((alert: { typeFichier: string; email: string[]; telephone: string[] }) => {
        const email = alert.email.map((elt) => {
          return {
            key: uuidv4(),
            label: elt,
            data: 'email',
            icon: 'pi pi-fw pi-user',
          };
        });

        const telephone = alert.telephone.map((elt) => {
          return {
            key: uuidv4(),
            label: elt,
            data: 'tel',
            icon: 'pi pi-fw pi-user',
          };
        });

        return {
          key: uuidv4(),
          label: getTypes(alert.typeFichier),
          data: alert.typeFichier,
          icon: 'pi pi-fw pi-file',
          children: [
            {
              key: uuidv4(),
              label: 'Adresse email',
              data: 'email',
              icon: 'pi pi-fw pi-inbox',
              children:
                alert.email.length == 0
                  ? {
                    key: uuidv4(),
                    label: 'Pas de données',
                  }
                  : email,
            },
            {
              key: uuidv4(),
              label: 'Numéro de téléphone',
              data: 'telephone',
              icon: 'pi pi-fw pi-phone',
              children:
                alert.telephone.length == 0
                  ? {
                    key: uuidv4(),
                    label: 'Pas de données',
                  }
                  : telephone,
            },
          ],
        };
      });

      const alert_select = alerting.data.map(
        (alert: { id: string; typeFichier: string; email: string[]; telephone: string[] }) => {
          return {
            label: getTypes(alert.typeFichier),
            value: alert.id,
          };
        },
      );
      setAlertSelect(alert_select);
      setTreeData(alert);
      setAlerts(alerting.data);
    } catch (error) {
      notify('Une erreur est survenu', 'error');
    }
  }
  useEffect(() => {
    if (loaded) {
      loadAlerting();
      setLoaded(false);
    }
  }, [loaded, alerts]);

  return (
    <div className="card">
      <ToastContainer />

      {role.includes('alerting-add') && (
        <div className="flex justify-end gap-4">
          <Button
            label="Ajouter une adresse email"
            icon="pi pi-plus"
            onClick={() => show1('top')}
            className="p-button-warning"
            style={{ minWidth: '10rem' }}
          />
          <Button
            label="Ajouter un numéro de téléphone"
            icon="pi pi-plus"
            onClick={() => show2('top')}
            className="p-button-info"
            style={{ minWidth: '10rem' }}
          />
        </div>
      )}

      <h1 className="font-bold pt-7">Tableau des alertes</h1>
      <div className="card flex justify-center">
        <Tree value={treeData} className="w-full md:w-30rem" />
      </div>
      <Dialog
        header="Ajouter une alerte par email"
        visible={visible1}
        position={'center' || position}
        style={{ width: '50vw' }}
        onHide={() => setVisible1(false)}
        draggable={false}
        resizable={false}
      >
        <form action="" onSubmit={emailForm.onSubmit((values) => addEmailAlert(values))}>
          <div className="my-4">
            <label htmlFor="selectedFichier">Type de fichier</label>
            <MultiSelect
              id="selectedFichier"
              {...emailForm.getInputProps('selectedFichier')}
              data={alertSelect}
              placeholder="Selectionner le type de fichier"
              className="w-full md:w-20rem"
            />
          </div>
          <div className="my-4">
            <label htmlFor="email">Adresse email</label>
            <TextInput id="email" className="w-full md:w-20rem" type={'email'} {...emailForm.getInputProps('email')} />
          </div>
          <div className="text-center">
            <Button label="Ajouter" icon="pi pi-check" />
          </div>
        </form>
      </Dialog>
      <Dialog
        header="Ajouter une alerte par téléphone"
        visible={visible2}
        position={'center' || position}
        style={{ width: '50vw' }}
        onHide={() => setVisible2(false)}
        draggable={false}
        resizable={false}
      >
        <form action="" onSubmit={telForm.onSubmit((values) => addTelAlert(values))}>
          <div className="my-4">
            <label htmlFor="selectedFichier">Type de fichier</label>
            <MultiSelect
              id="selectedFichier"
              {...telForm.getInputProps('selectedFichier')}
              data={alertSelect}
              placeholder="Selectionner le type de fichier"
              className="w-full md:w-20rem"
            />
          </div>
          <div className="my-4">
            <label htmlFor="telephone">Numéro de téléphone</label>
            <TextInput
              id="telephone"
              className="w-full md:w-20rem"
              type={'tel'}
              {...telForm.getInputProps('telephone')}
            />
          </div>
          <div className="text-center">
            <Button label="Ajouter" icon="pi pi-check" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Alerting;
