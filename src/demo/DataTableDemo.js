import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import './DataTableDemo.css';

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { CustomerService } from '../service/CustomerService';

import Flag from 'react-world-flags';

const DataTableDemo = () => {
    const [customers, setCustomers] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);    
    const dt = useRef(null);    

    const customerService = new CustomerService();

    useEffect(() => {
        customerService.getCustomersLarge().then(data => setCustomers(data));
    });

    const renderHeader = () => {
        return (
            <div className="table-header">
                MEN'S IBU CUP SPRINT SCORE
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </span>
            </div>
        );
    }

    const placeBodyTemplate = (rowData, props) => {
        return ( 
            <React.Fragment>
                <span className="p-column-title" style={{textAlign: 'left'}}>{props.header}</span>        
                <span>{rowData.place}</span>
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (rowData) => {
        const src = "images/" + rowData.image;
        return ( 
            <React.Fragment>
                <span className="p-column-title">Name</span>               
                <img alt={rowData.name} src={src} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  style={{verticalAlign: 'middle', height: '35px'}} />
                <span style={{verticalAlign: 'middle', marginLeft: '.5em'}}>{rowData.name}</span>
            </React.Fragment>
        );
    }

    const countryBodyTemplate = (rowData) => {
        let { name, code } = rowData.country;
        return (
            <React.Fragment>
                <span className="p-column-title">Country</span>                           
                <Flag code={code} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={name} className={classNames('flag', 'flag-' + code)} />
                <span style={{verticalAlign: 'middle', marginLeft: '.5em'}}>{name}</span>
            </React.Fragment>
        );
    }

    const shootingBodyTemplate = (rowData, props) => {
        return ( 
            <React.Fragment>
                <span className="p-column-title">{props.header}</span>        
                <span>{rowData.shooting}</span>
            </React.Fragment>
        );
    }

    const timeBodyTemplate = (rowData, props) => {
        return ( 
            <React.Fragment>
                <span className="p-column-title">{props.header}</span>        
                <span>{rowData.time}</span>
            </React.Fragment>
        );
    }         

    const header = renderHeader();    

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable ref={dt} value={customers} 
                    header={header} className="p-datatable-customers" dataKey="id" rowHover globalFilter={globalFilter}
                    selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                    paginator rows={10} emptyMessage="No customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>                    
                    <Column field="place" header="Place" body={placeBodyTemplate} headerStyle={{width: '10em', textAlign: 'center'}} sortable filter filterPlaceholder="Search by place"/>
                    <Column field="name" header="Name" body={nameBodyTemplate} sortable filter filterPlaceholder="Search by name" />
                    <Column field="country.name" header="Country" body={countryBodyTemplate} sortable filter filterPlaceholder="Search by country"/>                    
                    <Column field="shooting" header="Shooting" body={shootingBodyTemplate} sortable filter filterPlaceholder="Search by shooting"/>
                    <Column field="time" header="Time" body={timeBodyTemplate} sortable filter filterPlaceholder="Search by time"/>                    
                </DataTable>
            </div>
        </div>
    );
}
                
export default DataTableDemo;