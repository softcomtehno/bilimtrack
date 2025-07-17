import { Pagination } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { gradeApi } from '@/entities/grade'
import { QRGenerator } from '@/features/lesson/qr-generator'

ModuleRegistry.registerModules([AllCommunityModule])

export function GradeBook({ subjectId, groupId }) {
  const [rowData, setRowData] = useState<any[]>([])
  const [allDates, setAllDates] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const todayDate = new Date().toLocaleDateString('ru-RU') // dd.mm.yyyy
  const todaySafe = todayDate.replace(/\./g, '_') // dd_mm_yyyy

  const columnsPerPage = 9

  useEffect(() => {
    async function fetchGrades() {
      try {
        const res = await gradeApi.getGrades(groupId, subjectId)
        const { sessions, grades } = res.data

        const dates = sessions.map((s: any) => s.date.replace(/-/g, '_'))

        const transformedData = grades.map((g: any) => {
          const scores: Record<string, number> = {}
          const scoreIds: Record<string, number> = {}
          const sessionIds: Record<string, string> = {}

          dates.forEach((date) => {
            const score = g.scores.find(
              (s: any) => s.date.replace(/-/g, '_') === date
            )
            scores[date] = score ? score.grade : 0
            scoreIds[date] = score?.id
            sessionIds[date] =
              score?.session ||
              sessions.find((s: any) => s.date.replace(/-/g, '_') === date)?.id
          })

          return {
            fullName: g.user.fullName,
            userId: g.user.id,
            scores,
            scoreIds,
            sessionIds,
            ...scores, // для колонок AG Grid
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

          const { data } = params
          const userId = data.userId
          const sessionId = data.sessionIds[todaySafe]
          const gradeId = data.scoreIds[todaySafe]

          // 1. Сохраняем старую оценку
          const previousValue = data[todaySafe]

          // 2. Немедленно показываем новую оценку в UI
          data[todaySafe] = value
          setRowData((prev) =>
            prev.map((r) =>
              r.fullName === data.fullName ? { ...r, [todaySafe]: value } : r
            )
          )

          // 3. Асинхронно отправляем на сервер
          ;(async () => {
            try {
              if (gradeId) {
                const res = await gradeApi.updateGradePartial(gradeId, {
                  grade: value,
                })
                // Обновить значением с бэка, если вернулась оценка
                const updatedGrade = res.data.grade
                setRowData((prev) =>
                  prev.map((r) =>
                    r.fullName === data.fullName
                      ? { ...r, [todaySafe]: updatedGrade }
                      : r
                  )
                )
              } else {
                const res = await gradeApi.createGrade({
                  user: userId,
                  session: sessionId,
                  grade: value,
                })
                const created = res.data
                // Обновить grade + сохранить id новой оценки
                setRowData((prev) =>
                  prev.map((r) =>
                    r.fullName === data.fullName
                      ? {
                          ...r,
                          [todaySafe]: created.grade,
                          scoreIds: {
                            ...r.scoreIds,
                            [todaySafe]: created.id,
                          },
                        }
                      : r
                  )
                )
              }
            } catch (err) {
              console.error('Ошибка при сохранении оценки:', err)
              // 4. Откатить на предыдущее значение при ошибке
              setRowData((prev) =>
                prev.map((r) =>
                  r.fullName === data.fullName
                    ? { ...r, [todaySafe]: previousValue }
                    : r
                )
              )
            }
          })()

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
