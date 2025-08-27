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
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [editing, setEditing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const todayDate = new Date().toLocaleDateString('ru-RU')
  const todaySafe = todayDate.replace(/\./g, '_')
  const columnsPerPage = 9

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function fetchGrades() {
      try {
        const res = await gradeApi.getGrades(groupId, subjectId)
        const { sessions, grades } = res.data

        let dates = sessions.map((s: any) => s.date.replace(/-/g, '_'))
        dates.sort((a, b) => b.localeCompare(a)) // от самой новой к старой

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

        const hasTodaySession = sessions.some(
          (s) => s.date.replace(/-/g, '_') === todaySafe
        )

        setCurrentPage(1)
        setSelectedDate(hasTodaySession ? todaySafe : dates[0])
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

  const currentSession = sessions.find(
    (s) => s.date.replace(/-/g, '_') === selectedDate
  )
  const currentTopic = currentSession?.topic || null

  async function handleSave() {
    if (!selectedDate || !selectedTopic) return
    try {
      const session = currentSession
      if (!session) return
      await sessionApi.updateSessionTopic(session.id, Number(selectedTopic))
      const topicObj =
        topics.find((t) => String(t.id) === String(selectedTopic)) || null
      setSessions((prev) =>
        prev.map((s) => (s.id === session.id ? { ...s, topic: topicObj } : s))
      )
      setEditing(false)
      setSelectedTopic('')
      alert('Тема успешно сохранена!')
    } catch (err) {
      console.error('Ошибка при обновлении темы:', err)
      alert('Ошибка при сохранении темы.')
    }
  }

  // Массив прошлых дат без сегодняшней
  // Массив прошлых дат без сегодняшней
  const pastDates = allDates.filter((d) => d !== todaySafe)

  // Для десктопа — по возрастанию
  const desktopPastDates = [...pastDates].sort((a, b) => a.localeCompare(b))

  // Для мобильного — по убыванию (чтобы первая страница была самой свежей)
  const mobilePastDates = [...pastDates].sort((a, b) => b.localeCompare(a))

  const hasTodaySession = sessions.some(
    (s) => s.date.replace(/-/g, '_') === todaySafe
  )

  const mobileDate = isMobile
    ? currentPage === 1
      ? todaySafe
      : mobilePastDates[currentPage - 2]
    : null

  const desktopDatesOnPage = !isMobile
    ? desktopPastDates.slice(
        (currentPage - 1) * columnsPerPage,
        currentPage * columnsPerPage
      )
    : []

  const columnDefs = useMemo(() => {
    if (isMobile) {
      if (!mobileDate) return []
      return [
        {
          field: 'fullName',
          headerName: 'ФИО',
          pinned: 'left',
          filter: true,
          cellClass: 'hover:bg-blue-100',
          flex: 2,
        },
        {
          field: mobileDate,
          headerName: mobileDate.replace(/_/g, '.'),
          flex: 2,
          cellClass: 'hover:bg-blue-100',
          editable: mobileDate === todaySafe && hasTodaySession,
          valueSetter: (params) => {
            let val = Number(params.newValue)
            if (isNaN(val)) return false
            if (val > 10) val = 10
            if (val < 0) val = 0
            params.data[params.colDef.field!] = val
            return true
          },
        },
      ]
    }

    const cols = [
      {
        field: 'fullName',
        headerName: 'ФИО',
        pinned: 'left',
        filter: true,
        cellClass: 'hover:bg-blue-100',
        flex: 2,
      },
      ...desktopDatesOnPage.map((d) => {
        const session = sessions.find((s) => s.date.replace(/-/g, '_') === d)
        return {
          field: d,
          headerName:
            d.replace(/_/g, '.') +
            (session?.topic ? ` (${session.topic.title})` : ''),
          flex: 1,
          editable: false,
          cellClass: 'hover:bg-blue-100',
        }
      }),
    ]

    if (hasTodaySession) {
      cols.push({
        field: todaySafe,
        headerName: todaySafe.replace(/_/g, '.'),
        flex: 2,
        pinned: 'right',
        cellClass: 'hover:bg-blue-100',
        editable: true,
        valueSetter: (params) => {
          let val = Number(params.newValue)
          if (isNaN(val)) return false
          if (val > 10) val = 10
          if (val < 0) val = 0
          params.data[params.colDef.field!] = val
          return true
        },
      })
    }

    return cols
  }, [isMobile, mobileDate, desktopDatesOnPage, sessions, hasTodaySession])

  const totalPages = isMobile
    ? pastDates.length + (hasTodaySession ? 1 : 0)
    : Math.ceil(pastDates.length / columnsPerPage)

  return (
    <div>
      <div className="flex justify-left my-4">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          page={currentPage}
          onChange={(page) => {
            setCurrentPage(page)
            if (isMobile) {
              setSelectedDate(
                page === 1 && hasTodaySession
                  ? todaySafe
                  : pastDates[hasTodaySession ? page - 2 : page - 1]
              )
            }
          }}
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
          getRowHeight={() => (isMobile ? 50 : 30)}
        />
        <div className="mt-10">
          <QRGenerator groupId={groupId} subjectId={subjectId} />
        </div>

        <div className="flex items-start justify-between mt-5 gap-10">
          <div className="flex w-full gap-10 flex-col">
            <div className="flex w-full gap-5">
              <Select
                label="Дата"
                selectedKeys={selectedDate ? [selectedDate] : []}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  setEditing(false)
                  setSelectedTopic('')
                }}
                renderValue={(items) => (
                  <span>{items[0]?.key.replace(/_/g, '.')}</span>
                )}
              >
                {allDates.map((d) => {
                  const session = sessions.find(
                    (s) => s.date.replace(/-/g, '_') === d
                  )
                  return (
                    <SelectItem key={d} value={d}>
                      {d.replace(/_/g, '.')} —{' '}
                      {session?.topic?.title || 'Без темы'}
                    </SelectItem>
                  )
                })}
              </Select>

              {currentTopic && !editing && (
                <div className="px-4 py-2 border rounded bg-gray-100 w-full flex justify-between items-center">
                  <span>Текущая тема: {currentTopic.title}</span>
                  <Button onClick={() => setEditing(true)}>Изменить</Button>
                </div>
              )}

              {(!currentTopic || editing) && (
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
              )}
            </div>

            {(!currentTopic || editing) && (
              <Button onClick={handleSave} appearance="primary">
                Сохранить
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
