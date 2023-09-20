import React, { useState, useEffect } from 'react';
import { notify } from './../../services/notification';
import ParametreTable from '../../components/Table/parametreTable';
import { getParametre } from '../../services/pamaretre';
import { Tabs } from '@mantine/core';
import { IconListDetails, IconListNumbers } from '@tabler/icons';
import { Params } from '../type';

const Finance = () => {
  const [finance, setFinance] = useState<Params[]>([]);
  const [technique, setTechnique] = useState<Params[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const parametres = await getParametre();
        const params = parametres.data.sort((a: { label: string }, b: { label: string }) =>
          a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })
        );
        const finance = params.filter((elt: { type: string }) => elt.type === "finance");
        const technique = params.filter((elt: { type: string }) => elt.type === "technique");
        setFinance(finance);
        setTechnique(technique);
      } catch (error) {
        notify('Une erreur est survenue', 'error');
      }
    }
    fetchData();
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
          <ParametreTable data={finance} role="fin-edit" />
        </Tabs.Panel>
        <Tabs.Panel value="technique" pt="xs">
          <ParametreTable data={technique} role="tech-edit" />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Finance;