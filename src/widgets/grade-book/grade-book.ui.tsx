import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import { useState } from 'react'

export function GradeBook() {
  const rowData = [
    { make: 'Toyota', model: 'Corolla', price: 20000 },
    { make: 'Ford', model: 'Focus', price: 18000 },
  ]

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Марка и модель',
      valueGetter: (p) => p.data.make + ' ' + p.data.model,
    },
    { field: 'price' },
  ])

  return (
    <>
      <div style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </>
  )
}
