import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const rows  = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
const Pendientes = () => {
    return (
        <div>
            <div className="container bg-white p-4 mt-4">
                <h1>Clientes Pendientes</h1>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                    </div>
            </div>
        </div>
    )
}

export default Pendientes
