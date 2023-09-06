
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../services/notification';
import { updateParametre } from '../../services/pamaretre';
import { Chip } from 'primereact/chip';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/store/store';

interface TableProps {
  children?: React.ReactNode,
  data: any[],
  role:string
}

const ParametreTable: React.FC<TableProps> = (props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingRows, setEditingRows] = useState({});
  const state = useSelector((state: RootState) => state.user)
  const user_role = JSON.parse(state.roles);
  const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
  const roles = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];

  useEffect(() => {
    if (products.length == 0) {
      // TODO Why do you wait for 1 sec before setting products
      setTimeout(() => {
        setProducts(props.data);
      }, 1000)
    }

    console.log(props.data);
    
    }, [products]); // eslint-disable-line react-hooks/exhaustive-deps
    

  const onRowEditComplete = async (e: { newData: any; index: any; }) => {

    const _products = [...products];
    const { newData, index } = e;

    // TODO Many values 
    const value = newData.value.split(' ');

    // TODO You can just use filter and return directly => Number(elt) === NaN
    const nan_values = value.map((elt: any) => {
      let test = parseFloat(elt)
      if (isNaN(test)) {
        return true
      }
      return false
    }

    )

    // TODO If you use the previous recommendation, you can just verify nan_values length
    if (nan_values.includes(true)) {
      notify('Les valeurs saisies sont pas corrects', 'error')
    } else {

      value.sort(function (a: string, b: string) {

        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (numA > numB) {
          return 1;
        }
        if (numA < numB) {
          return -1;
        }

        // names must be equal
        return 0;
      })
      const send = value.join(' ');

      // TODO why redefine label if it is already in newData
      _products[index] = { ...newData, value: send, label: newData.label };

      // TODO If this function returns errors 
      await updateParametre({ ...newData, value: send, label: newData.label, updatedAt: new Date() });

      setProducts(_products);
      notify('Opex modifié avec succès', 'sucess')
    }


  };

  const onRowEditChange = (e: { data: React.SetStateAction<{}>; }) => {
    setEditingRows(e.data);
  };

  const setActiveRowIndex = (index: number) => {
    const _editingRows = { ...editingRows, ...{ [`${products[index].id}`]: true } };
    setEditingRows(_editingRows);
  }


  const textEditor = (options: any) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };
  const PourcentageTemplate = (data: any, options: ColumnBodyOptions) => {

    const value = data.value.split(' ');

    // TODO Why redefine sort function here
    // TODO Dont need to set sort function if you want to sort in ascending order
    value.sort(function (a: string, b: string) {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      if (numA > numB) {
        return 1;
      }
      if (numA < numB) {
        return -1;
      }

      // names must be equal
      return 0;
    })

    // TODO Use this condition before sorting values
    if (value.length <= 1) {
      return (
        data.value
      )
    }
    // TODO Dont need else instruction if you use the previous recommendation
    else {
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
        <DataTable value={products.length != 0 ? products : props.data} editMode="row" dataKey="id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">
          <Column field="label" header="Indicateur" style={{ width: '20%' }}></Column>
          <Column field="value" header="Pourcentages(%)" body={PourcentageTemplate} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          {roles.includes(props.role) && <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>}
        </DataTable>
      </div>
    </div>
  );
}


export default ParametreTable;