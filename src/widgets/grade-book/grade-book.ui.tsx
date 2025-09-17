import { useEffect, useMemo, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { gradeApi } from '@/entities/grade'
import { QRGenerator } from '@/features/lesson/qr-generator'
import { topicApi } from '@/entities/topic'
import { sessionApi } from '@/entities/session'
import { GradePagination } from './components/grade-pagination.ui'
import { GradeTable } from './components/grade-table.ui'
import { TopicSelector } from './components/topic-selector.ui'
import { SessionControls } from './components/session-controls.ui'

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
  const [selectedCustomDate, setSelectedCustomDate] = useState<Date | null>(
    null
  )

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

  async function fetchGrades() {
    try {
      const res = await gradeApi.getGrades(groupId, subjectId)
      const { sessions, grades } = res.data

      let dates = sessions.map((s: any) => s.date.replace(/-/g, '_'))
      dates.sort((a, b) => b.localeCompare(a))

      const transformedData = grades.map((g: any) => {
        const scores: Record<string, number> = {}
        const scoreIds: Record<string, number> = {}
        const sessionIds: Record<string, string> = {}

        sessions.forEach((session: any) => {
          const key = `${session.date.replace(/-/g, '_')}_${session.id}`
          const score = g.scores.find((sc: any) => sc.sessionId === session.id)
          scores[key] = score ? score.grade : 0
          scoreIds[key] = score?.id
          sessionIds[key] = session.id
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

      setAllDates([...new Set(dates)])
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

  useEffect(() => {
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
    (s) => `${s.date.replace(/-/g, '_')}_${s.id}` === selectedDate
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

  async function handleCreateSession() {
    try {
      const now = new Date()
      const date = now.toISOString().split('T')[0]
      const startTime = now.toISOString().split('T')[1]
      const endTime = new Date(now.getTime() + 80 * 60000)
        .toISOString()
        .split('T')[1]
      await sessionApi.createSession({
        subject: subjectId,
        groups: [groupId],
        date,
        startTime,
        endTime,
      })

      await fetchGrades()
      alert('Занятие успешно создано!')
      window.location.reload()
    } catch (err) {
      console.error('Ошибка при создании занятия:', err)
      alert('Не удалось создать занятие.')
    }
  }

  async function handleCreateSessionWithDate() {
    if (!selectedCustomDate) return
    try {
      const startTime = '09:00:00' // можно поменять по умолчанию
      const endTime = '10:20:00' // например, 80 минут
      await sessionApi.createSession({
        subject: subjectId,
        groups: [groupId],
        date: selectedCustomDate,
        startTime,
        endTime,
      })
      await fetchGrades()
      alert('Занятие успешно создано!')
      setSelectedCustomDate('')
    } catch (err) {
      console.error('Ошибка при создании занятия:', err)
      alert('Не удалось создать занятие.')
    }
  }

  async function handleDeleteSession(sessionId: string) {
    if (!window.confirm('Вы уверены, что хотите удалить это занятие?')) return
    try {
      await sessionApi.deleteSession(sessionId)
      // Обновляем данные
      await fetchGrades()
      alert('Занятие успешно удалено!')
    } catch (err) {
      console.error('Ошибка при удалении занятия:', err)
      alert('Не удалось удалить занятие.')
    }
  }

  const pastDates = allDates.filter((d) => d !== todaySafe)
  const desktopPastDates = [...pastDates].sort((a, b) => a.localeCompare(b))
  const todaySessions = sessions.filter(
    (s) => s.date.replace(/-/g, '_') === todaySafe
  )
  // const hasTodaySession = todaySessions.length > 0

  const orderedSessions = isMobile ? [...sessions].reverse() : sessions

  // мобильный: каждая сессия = отдельная страница
  const mobileSession = isMobile ? orderedSessions[currentPage - 1] : null

  const desktopDatesOnPage = !isMobile
    ? desktopPastDates.slice(
        (currentPage - 1) * columnsPerPage,
        currentPage * columnsPerPage
      )
    : []

  // const columnDefs = useMemo(() => {
  //   const editableSetter = async (params: any) => {
  //     let newValue = Number(params.newValue)
  //     if (isNaN(newValue)) return false
  //     if (newValue > 10) newValue = 10
  //     if (newValue < 0) newValue = 0

  //     const oldValue = params.data[params.colDef.field!]
  //     params.data[params.colDef.field!] = newValue

  //     try {
  //       const scoreId = params.data.scoreIds[params.colDef.field!]
  //       const sessionId = params.data.sessionIds[params.colDef.field!]

  //       if (scoreId) {
  //         await gradeApi.updateGradePartial(scoreId, { grade: newValue })
  //       } else {
  //         const res = await gradeApi.createGrade({
  //           session: sessionId,
  //           grade: newValue,
  //           user: params.data.userId,
  //         })
  //         params.data.scoreIds[params.colDef.field!] = res.data.id
  //       }
  //       return true
  //     } catch (err) {
  //       console.error('Ошибка при обновлении оценки:', err)
  //       params.data[params.colDef.field!] = oldValue || 0
  //       return false
  //     }
  //   }

  //   // мобильный: всегда 2 колонки
  //   if (isMobile && mobileSession) {
  //     const key = `${mobileSession.date.replace(/-/g, '_')}_${mobileSession.id}`
  //     return [
  //       {
  //         field: 'fullName',
  //         headerName: 'ФИО',
  //         pinned: 'left',
  //         flex: 2,
  //       },
  //       {
  //         field: key,
  //         headerName:
  //           mobileSession.date.replace(/-/g, '.') +
  //           (mobileSession.topic ? ` (${mobileSession.topic.title})` : ''),
  //         flex: 2,
  //         editable: mobileSession.date.replace(/-/g, '_') === todaySafe,
  //         valueSetter: editableSetter,
  //       },
  //     ]
  //   }

  //   const cols: any[] = [
  //     {
  //       field: 'fullName',
  //       headerName: 'ФИО',
  //       pinned: 'left',
  //       filter: true,
  //       flex: 2,
  //     },
  //   ]

  //   // прошлые даты
  //   cols.push(
  //     ...desktopDatesOnPage.flatMap((d) =>
  //       sessions
  //         .filter((s) => s.date.replace(/-/g, '_') === d)
  //         .map((session) => {
  //           const key = `${d}_${session.id}`
  //           return {
  //             field: key,
  //             headerName:
  //               d.replace(/_/g, '.') +
  //               (session.topic ? ` (${session.topic.title})` : ''),
  //             flex: 1,
  //             editable: false,
  //           }
  //         })
  //     )
  //   )

  //   // сегодняшние
  //   if (todaySessions.length > 0) {
  //     todaySessions.forEach((session, idx) => {
  //       const key = `${todaySafe}_${session.id}`
  //       cols.push({
  //         field: key,
  //         headerName:
  //           todaySafe.replace(/_/g, '.') +
  //           (session.topic ? ` (${session.topic.title})` : ''),
  //         flex: 2,
  //         pinned: idx === todaySessions.length - 1 ? 'right' : undefined,
  //         editable: true,
  //         valueSetter: editableSetter,
  //       })
  //     })
  //   }

  //   return cols
  // }, [isMobile, mobileSession, desktopDatesOnPage, todaySessions])
  const columnDefs = useMemo(() => {
    const editableSetter = async (params: any) => {
      let newValue = Number(params.newValue)
      if (isNaN(newValue)) return false
      if (newValue > 10) newValue = 10
      if (newValue < 0) newValue = 0

      const oldValue = params.data[params.colDef.field!]
      params.data[params.colDef.field!] = newValue

      try {
        const scoreId = params.data.scoreIds[params.colDef.field!]
        const sessionId = params.data.sessionIds[params.colDef.field!]

        if (scoreId) {
          await gradeApi.updateGradePartial(scoreId, { grade: newValue })
        } else {
          const res = await gradeApi.createGrade({
            session: sessionId,
            grade: newValue,
            user: params.data.userId,
          })
          params.data.scoreIds[params.colDef.field!] = res.data.id
        }
        return true
      } catch (err) {
        console.error('Ошибка при обновлении оценки:', err)
        params.data[params.colDef.field!] = oldValue || 0
        return false
      }
    }

    const cols: any[] = [
      {
        field: 'fullName',
        headerName: 'ФИО',
        pinned: 'left',
        filter: true,
        flex: 2,
      },
    ]

    sessions.forEach((session) => {
      const key = `${session.date.replace(/-/g, '_')}_${session.id}`
      cols.push({
        field: key,
        headerName:
          session.date.replace(/_/g, '.') +
          (session.topic ? ` (${session.topic.title})` : ''),
        flex: 2,
        editable: true, // ВСЕ оценки редактируемы
        valueSetter: editableSetter,
      })
    })

    return cols
  }, [sessions])

  const totalPages = isMobile
    ? sessions.length
    : Math.ceil(pastDates.length / columnsPerPage)

  return (
    <div>
      <SessionControls
        {...{
          selectedCustomDate,
          setSelectedCustomDate,
          handleCreateSession,
          handleCreateSessionWithDate,
          groupId,
          subjectId,
          QRGenerator,
        }}
      />

      <GradePagination {...{ totalPages, currentPage, setCurrentPage }} />

      <GradeTable {...{ rowData, columnDefs, isMobile }} />

      <div className="flex items-start justify-between mt-5 gap-10">
        <TopicSelector
          {...{
            sessions,
            selectedDate,
            setSelectedDate,
            currentTopic,
            editing,
            setEditing,
            topics,
            selectedTopic,
            setSelectedTopic,
            handleSave,
            onDelete: handleDeleteSession, // 🔥 новое
          }}
        />
      </div>
    </div>
  )
}
