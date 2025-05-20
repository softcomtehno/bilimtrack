import { Pagination } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([AllCommunityModule])

export function GradeBook() {
  const generateRandomScore = () => Math.floor(Math.random() * 11)

  const dates = [
    '05_05_2025',
    '06_05_2025',
    '07_05_2025',
    '08_05_2025',
    '09_05_2025',
    '10_05_2025',
    '11_05_2025',
    '12_05_2025',
    '13_05_2025',
    '14_05_2025',
    '15_05_2025',
    '16_05_2025',
    '17_05_2025',
    '18_05_2025',
    '19_05_2025',
  ]

  const users = [
    'Асанов Курманбек',
    'Малабакиев Рамзан',
    'Жумагулов Талгат',
    'Исаков Руслан',
    'Кадыров Эльдар',
    'Лазарев Максим',
    'Мирзоев Бахтиёр',
    'Нурматов Азат',
    'Орлов Илья',
    'Петров Сергей',
    'Рахимов Шахриёр',
    'Смирнова Ольга',
    'Тимофеев Андрей',
    'Умаров Заур',
    'Федоров Константин',
    'Хабибуллин Ринат',
    'Цой Виктор',
    'Чистяков Артём',
    'Шарипов Арслан',
    'Щербакова Мария',
  ]

  const todayDate = new Date().toLocaleDateString('ru-RU') // dd.mm.yyyy
  const todaySafe = todayDate.replace(/\./g, '_') // dd_mm_yyyy

  const initialRowData = users.map((fullName) => {
    const scores: Record<string, number> = {}
    dates.forEach((date) => {
      scores[date] = generateRandomScore()
    })
    if (!scores[todaySafe]) {
      scores[todaySafe] = 0
    }
    return { fullName, ...scores }
  })

  const [rowData, setRowData] = useState(initialRowData)

  const allDates = Array.from(
    new Set(
      rowData.flatMap((row) => Object.keys(row).filter((k) => k !== 'fullName'))
    )
  ).sort((a, b) => a.localeCompare(b))

  const paginatedDates = allDates.filter((d) => d !== todaySafe)

  const columnsPerPage = 6
  const totalPages = Math.ceil(paginatedDates.length / columnsPerPage)

  // Ставим страницу по умолчанию на последнюю
  const [currentPage, setCurrentPage] = useState(totalPages)

  const currentDateFields = paginatedDates.slice(
    (currentPage - 1) * columnsPerPage,
    currentPage * columnsPerPage
  )

  const columnDefs = useMemo(() => {
    return [
      {
        field: 'fullName',
        headerName: 'ФИО',
        pinned: 'left',
        filter: true,
        cellClass: 'hover:bg-blue-100',
      },
      ...currentDateFields.map((field) => ({
        field,
        headerName: field.replace(/_/g, '.'),
        width: 110,
        editable: false,
        cellClass: 'hover:bg-blue-100',
      })),
      {
        field: todaySafe,
        headerName: todaySafe.replace(/_/g, '.'),
        width: 110,
        editable: true,
        pinned: 'right',
        cellClass: 'hover:bg-blue-100',
        valueSetter: (params: any) => {
          let value = Number(params.newValue)
          if (isNaN(value)) return false
          if (value < 0) value = 0
          if (value > 10) value = 10
          params.data[todaySafe] = value
          setRowData((prev) =>
            prev.map((r) =>
              r.fullName === params.data.fullName ? params.data : r
            )
          )
          return true
        },
      },
    ]
  }, [rowData, currentDateFields, todaySafe])

  return (
    <div>
      <div className="flex justify-center mb-4">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div
        className="ag-theme-alpine"
        style={{ width: '100%', overflowX: 'auto' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={30}
          paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 40]}
        />
      </div>
    </div>
  )
}
