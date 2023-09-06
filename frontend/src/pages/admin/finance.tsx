import { useState, useEffect } from 'react';
import { notify } from './../../services/notification';
import ParametreTable from '../../components/Table/parametreTable';
import { getParametre } from '../../services/pamaretre';
import { Tabs } from '@mantine/core';
import { IconListDetails, IconListNumbers } from '@tabler/icons';

const Finance = () => {
  const [finance, setFinance] = useState([]);
  const [technique, setTechnique] = useState([]);

  async function loadFinance() {
    try {
      const parametres = await getParametre();
      const params = parametres.data;
      params.sort(function (a: { label: string }, b: { label: string }) {
        const nameA = a.label.toUpperCase(); // ignore upper and lowercase
        const nameB = b.label.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });
      const finance = params.filter((elt:any)=> elt.type ==="finance")
      const technique = params.filter((elt:any)=> elt.type ==="technique")
      setFinance(finance);
      setTechnique(technique);
    } catch (error) {
      notify('Une erreur est survenue', 'error');
    }
  }
 
  useEffect(() => {
    loadFinance();
  }, []);

  return (
    <>
      <Tabs variant="outline" radius="xs" defaultValue="finance">
        <Tabs.List>
          <Tabs.Tab
            value="finance"
            icon={<IconListDetails size="1.8rem" />}
            className="font-bold text-lg text-orange-500"
          >
            Seuils Financiers
          </Tabs.Tab>
          <Tabs.Tab
            value="technique"
            icon={<IconListNumbers size="1.8rem" />}
            className="font-bold text-lg text-orange-500"
          >
            Seuils Techniques
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="finance" pt="xs">
          <ParametreTable data={finance} role="fin-edit"></ParametreTable>
        </Tabs.Panel>

        <Tabs.Panel value="technique" pt="xs">
          <ParametreTable data={technique} role="tech-edit"></ParametreTable>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Finance;
