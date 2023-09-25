import { useState, useEffect, useMemo } from 'react';
import { Button, Divider, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoadFile } from '../../components/loadFile';
import Table from '../../components/Table/table';

import Excell from '../../assets/excel.png';
import { notify } from './../../services/notification';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/store/store';
import { getTypes } from '../../utils';
import { FileUser } from '../type';
function getProductsData(files: FileUser[]) {
  const data = files.map((elt) => {
    return {
      ...elt,
      url: elt.url,
      image: Excell,
      author: elt.userId ? elt.userId : 'None',
      category: elt.type,
      fichier: elt.name,
      date: new Date(elt.createdAt),
      id: elt.fileEtag,
    };
  });

  return data;
}
const Historique = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileUser[]>([]);
  const state = useSelector((state: RootState) => state.user);
  const user_role = JSON.parse(state.roles);
  const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
  const role = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];


  const getFiles = () => {

    axios
      .get(import.meta.env.VITE_BASE_URL_API + '/minio/list')
      .then((response) => {
        const data = response.data.map((elt: any) => {
          return {
            ...elt,
            type: getTypes(elt.name.split('/')[0]),
            name: elt.name.split('/')[1],
          };
        });
        data.sort(function (a: { lastModified: string }, b: { lastModified: string }) {
          return new Date(b.lastModified) > new Date(a.lastModified);
        });

        setFiles(data);
      })
      .catch((error) => {
        notify('Une erreur est survenu', 'error');
        console.log(error);

      });
  };

  useEffect(() => {
    getFiles();
  }, [files.length]);


  const products = useMemo(() => getProductsData(files), [files]);
  const isFileUploadAllowed = role.includes('file-upload');

  return (
    <div>

      <ToastContainer />
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          color: theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        size={'xl'}
        title="Chargement de nouveau fichier"
      >
        <div>
          <LoadFile></LoadFile>
        </div>
      </Modal>
      {isFileUploadAllowed && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            color="orange"
            size="md"
            onClick={open}
            disabled={!isFileUploadAllowed}
          >
            Charger un nouveau fichier
          </Button>
        </div>
      )}

      <Divider className="mt-10" my="lg" label={<p className="text-lg font-bold">Historique</p>} />

      <div id="history">
        <div className="mt-8">
          <Table data={products} loadFile={getFiles}></Table>
        </div>
      </div>
    </div>
  );
};

export default Historique;
