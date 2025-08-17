import { Pagination, Select, SelectItem, Button } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { gradeApi } from '@/entities/grade'
import { QRGenerator } from '@/features/lesson/qr-generator'
import { topicApi } from '@/entities/topic'
import { sessionApi } from '@/entities/session'

ModuleRegistry.registerModules([AllCommunityModule])

export function GradeBook({ subjectId, groupId = null }) {
  const [rowData, setRowData] = useState<any[]>([])
  const [allDates, setAllDates] = useState<string[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedDate, setSelectedDate] = useState<string>('') // выбранная дата
  const [selectedTopic, setSelectedTopic] = useState<string>('') // выбранная тема для select
  const [fixedTopic, setFixedTopic] = useState<string>('') // тема для отображения, если уже назначена

  const todayDate = new Date().toLocaleDateString('ru-RU') // dd.mm.yyyy
  const todaySafe = todayDate.replace(/\./g, '_') // dd_mm_yyyy

  const columnsPerPage = 9

  useEffect(() => {
    async function fetchGrades() {
      try {
        const res = await gradeApi.getGrades(groupId, subjectId)
        console.log(res);
        
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
              score?.sessionId ||
              sessions.find((s: any) => s.date.replace(/-/g, '_') === date)?.id
          })

          return {
            fullName: g.user.fullName,
            userId: g.user.id,
            scores,
            scoreIds,
            sessionIds,
            ...scores,
          }
        })

        setAllDates(dates)
        setSessions(sessions)
        setRowData(transformedData)
        setCurrentPage(Math.ceil(dates.length / columnsPerPage))

        // Выбираем сегодня или первую дату
        const todayExists = dates.includes(todaySafe)
        const initialDate = todayExists ? todaySafe : dates[0]
        setSelectedDate(initialDate)

        // Проверяем, есть ли тема на выбранную дату
        const sessionForDate = sessions.find(
          (s) => s.date.replace(/-/g, '_') === initialDate
        )
        if (sessionForDate?.topic) {
          setFixedTopic(sessionForDate.topic)
        } else {
          setFixedTopic('')
        }
        setSelectedTopic('') // select всегда пустой при инициализации
      } catch (error) {
        console.error('Ошибка при загрузке оценок:', error)
      }
    }

    fetchGrades()
  }, [groupId, subjectId])

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await topicApi.getTopics(subjectId)
        setTopics(res.data)
      } catch (err) {
        console.error('Ошибка при загрузке тем:', err)
      }
    }
    fetchTopics()
  }, [subjectId])

  async function handleSave() {
    if (!selectedDate || !selectedTopic) return

    try {
      const session = sessions.find(
        (s) => s.date.replace(/-/g, '_') === selectedDate
      )

      if (!session) return

      await sessionApi.updateSessionTopic(session.id, Number(selectedTopic))

      setSessions((prev) =>
        prev.map((s) =>
          s.id === session.id ? { ...s, topic: selectedTopic } : s
        )
      )

      setFixedTopic(selectedTopic)
      setSelectedTopic('')
      alert('Тема успешно сохранена!')
    } catch (err) {
      console.error('Ошибка при обновлении темы:', err)
      alert('Ошибка при сохранении темы.')
    }
  }

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
      },
    ]
  }, [rowData, currentDateFields, todaySafe])
  console.log(allDates)

  return (
    <div>
      {/* Таблица с оценками */}
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
          />

          <div className="flex items-start justify-between mt-5 gap-10">
            <div className="flex w-[80%] gap-10 flex-col">
              <div className="flex w-full gap-5">
                {/* Выбор даты */}
                <Select
                  label="Дата"
                  selectedKeys={selectedDate ? [selectedDate] : []}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    const session = sessions.find(
                      (s) => s.date.replace(/-/g, '_') === e.target.value
                    )
                    setFixedTopic(session?.topic || '')
                    setSelectedTopic('')
                  }}
                >
                  {allDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date.replace(/_/g, '.')}
                    </SelectItem>
                  ))}
                </Select>

                {/* Если есть уже тема — показываем div с текущей темой */}
                {fixedTopic && (
                  <div className="px-4 py-2 border rounded bg-gray-100 w-full">
                    Текущая тема:{' '}
                    {topics.find((t) => String(t.id) === String(fixedTopic))
                      ?.title || fixedTopic}
                  </div>
                )}

                {/* Select для изменения или выбора темы */}
                <Select
                  label="Тема"
                  selectedKeys={selectedTopic ? [selectedTopic] : []}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  {topics.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.title}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Button onClick={handleSave} appearance="primary">
                Сохранить
              </Button>
            </div>

            <QRGenerator />
          </div>
        </div>
      </div>
    </div>
  )
}
