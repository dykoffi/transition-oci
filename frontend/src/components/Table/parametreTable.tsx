import React, { useEffect, useState } from 'react';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../services/notification';
import { updateParametre } from '../../services/pamaretre';
import { Chip } from 'primereact/chip';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/store/store';
import { Params } from '../../pages/type';

interface TableProps {
  children?: React.ReactNode,
  data: Params[],
  role: string
}

const ParametreTable: React.FC<TableProps> = (props) => {
  const [products, setProducts] = useState<Params[]>([]);
  const [editingRows, setEditingRows] = useState({});
  const state = useSelector((state: RootState) => state.user)
  const user_role = JSON.parse(state.roles);
  const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
  const roles = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];

  useEffect(() => {
    if (products.length === 0) {
      setProducts(props.data);
    }
  }, [products, props.data]);

  const onRowEditComplete = async (e: { newData: any; index: any; }) => {
    const _products = [...products];
    const { newData, index } = e;
    const value = newData.value.split(' ');
    const nan_values = value.map((elt: string) => {
      const test = parseFloat(elt)
      return isNaN(test)
    });
    if (nan_values.some((value: boolean) => value === true)) {
      notify('Les valeurs saisies sont pas corrects', 'error')
    } else {
      value.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
      _products[index] = { ...newData, value: value.join(' ') };
      await updateParametre({ ...newData, value: value.join(' '), updatedAt: new Date() });
      setProducts(_products);
      notify('Opex modifié avec succès', 'sucess')
    }
  };

  const onRowEditChange = (e: {data:DataTableValue}) => {
    setEditingRows(e.data);
  };

  const textEditor = (options: any) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const PourcentageTemplate = (data: any) => {
    const value = data.value.split(' ');
    if (value.length <= 1) {
      return data.value;
    } else {
      return (
        value.map((elt: any) => (
          <Chip key={elt} className='mx-1' label={elt}></Chip>
        ))
      )
    }
  }

  return (
    <div className="card datatable-editing-demo">
      <ToastContainer />
      <div className="p-fluid">
        <DataTable value={products} editMode="row" dataKey="id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
          <Column field="label" header="Indicateur" style={{ width: '20%' }}></Column>
          <Column field="value" header="Pourcentages(%)" body={PourcentageTemplate} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          {roles.includes(props.role) && <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>}
        </DataTable>
      </div>
    </div>
  );
}



export default ParametreTable;