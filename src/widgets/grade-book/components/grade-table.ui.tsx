import { AgGridReact } from 'ag-grid-react'

export function GradeTable({ rowData, columnDefs, isMobile }) {
  return (
    <div className="ag-theme-alpine" style={{ width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={30}
        paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 40]}
        rowHoverHighlight={true}
        getRowHeight={() => (isMobile ? 50 : 30)}
      />
    </div>
  )
}
