import { Pagination } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { gradeApi } from '@/entities/grade'
import { QRGenerator } from '@/features/lesson/qr-generator'

ModuleRegistry.registerModules([AllCommunityModule])

export function GradeBook() {
  const [rowData, setRowData] = useState<any[]>([])
  const [allDates, setAllDates] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const todayDate = new Date().toLocaleDateString('ru-RU') // dd.mm.yyyy
  const todaySafe = todayDate.replace(/\./g, '_') // dd_mm_yyyy

  useEffect(() => {
    async function fetchGrades() {
      try {
        const res = await gradeApi.getGrades(1, 1)
        const { sessions, grades } = res.data

        // Получаем все даты из сессий
        const dates = sessions.map((s: any) => s.date.replace(/-/g, '_'))

        const transformedData = grades.map((g: any) => {
          const scores: Record<string, number> = {}
          dates.forEach((date) => {
            const score = g.scores.find(
              (s: any) => s.date.replace(/-/g, '_') === date
            )
            scores[date] = score ? score.grade : 0
          })
          return {
            fullName: g.user.fullName,
            ...scores,
          }
        })

        setAllDates(dates)
        setRowData(transformedData)
        setCurrentPage(Math.ceil(dates.length / columnsPerPage))
      } catch (error) {
        console.error('Ошибка при загрузке оценок:', error)
      }
    }

    fetchGrades()
  }, [])

  const columnsPerPage = 9
  const paginatedDates = allDates.filter((d) => d !== todaySafe)
  const totalPages = Math.ceil(paginatedDates.length / columnsPerPage)

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
        flex: 2,
      },
      ...currentDateFields.map((field) => ({
        field,
        headerName: field.replace(/_/g, '.'),
        flex: 1,
        editable: false,
        cellClass: 'hover:bg-blue-100',
      })),
      {
        field: todaySafe,
        headerName: todaySafe.replace(/_/g, '.'),
        flex: 2,
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
              r.fullName === params.data.fullName
                ? { ...r, [todaySafe]: value }
                : r
            )
          )
          return true
        },
      },
    ]
  }, [rowData, currentDateFields, todaySafe])

  return (
    <div>
      <div className="flex justify-left my-4">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="ag-theme-alpine" style={{ width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={30}
          paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 40]}
          rowHoverHighlight={true}
          tabToNextCell={(params) => {
            const { previousCellPosition, api } = params
            const nextRowIndex = previousCellPosition.rowIndex + 1

            if (nextRowIndex >= api.getDisplayedRowCount()) {
              return null
            }

            return {
              rowIndex: nextRowIndex,
              column: previousCellPosition.column,
              floating: null,
            }
          }}
        />
        <QRGenerator />
      </div>
    </div>
  )
}
