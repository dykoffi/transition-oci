import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import Cloud from "../../assets/cloud.png"

import React, { useEffect, useState } from "react";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useSelector } from 'react-redux';
import { RootState } from "../../config/store/store";
interface TableProps {
    children?: React.ReactNode,
    loadFile?: () => void,
    data: {
        url: string;
        image: any;
        author: string;
        category: string;
        fichier: string;
        date: Date;
        id: string;
        name: string;
        type: string;
        fileEtag: string;
        size: number;
        userId: string;
        lastModified: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

const Table: React.FC<TableProps> = (props) => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState<any>(null);

    const state = useSelector((state: RootState) => state.user)
    const user_role = JSON.parse(state.roles);
    const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
    const role = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];

    const onGlobalFilterChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;

        const _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const initFilters = () => {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        });
        setGlobalFilterValue('');
    }

    useEffect(() => {
        console.log('role', role);

        initFilters();
    }, [])


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={props.loadFile} />;
    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Chercher par mot clé" />
                </span>
            </div>
        )
    }
    const header = renderHeader();

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    const dateBodyTemplate = (rowData: { date: Date; }) => {
        return formatDate(rowData.date);
    }
    const dateFilterTemplate = (options: { value: string | Date | Date[] | null | undefined; filterCallback: (arg0: string | Date | Date[] | null | undefined, arg1: any) => void; index: any; }) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />
    }



    const representativeBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <img alt={"#"} src={rowData.image} width={32} style={{ verticalAlign: 'middle' }} />
            </React.Fragment>
        );
    }

    const DownloadBodyTemplate = (rowData: any) => {
        //console.log('minio',rowData.url.includes('minio'));

        const link = rowData.url.includes('minio') ? rowData.url.replace('minio', "localhost") : rowData.url;
        return (
            <a href={link} target={'_blank'} rel="noreferrer">
                <img alt={"#"} src={Cloud} width={32} style={{ verticalAlign: 'middle' }} />
            </a>
        );
    }
    return (
        <>
            <DataTable value={props.data} removableSort paginator responsiveLayout="scroll"
                dataKey="date"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                paginatorLeft={paginatorLeft}
                filters={filters}
                header={header} emptyMessage="Pas de fichier trouvé."
                globalFilterFields={['name', 'fichier', 'category', 'author']}
            >
                <Column body={representativeBodyTemplate} />
                <Column field="fichier" header="Fichier" sortable></Column>
                <Column field="category" header="Categorie" sortable></Column>
                <Column field="author" header="Auteur" sortable></Column>
                <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '14rem' }} body={dateBodyTemplate}
                    filter filterElement={dateFilterTemplate} sortable />
                {role.includes('file-read') && <Column header="Télécharger" field="url" body={DownloadBodyTemplate} />}
                {/* <Column header="Télécharger" field="url" body={DownloadBodyTemplate} /> */}
            </DataTable>
        </>
    )
}



export default Table;