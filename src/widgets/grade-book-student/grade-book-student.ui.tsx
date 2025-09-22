import { useEffect, useState } from 'react'
import { gradeApi } from '@/entities/grade'

interface GradeEntry {
  date: string
  grade: number
  isPaid?: boolean
  sessionId?: string
  topicTitle?: string | null // 🔥 новое поле
}

interface GradeBookStudentProps {
  subjectId: string
  className?: string
}

export function GradeBookStudent({
  subjectId,
  className = '',
}: GradeBookStudentProps) {
  const [studentName, setStudentName] = useState('')
  const [gradesByDate, setGradesByDate] = useState<GradeEntry[]>([])
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    async function fetchGrades() {
      setIsLoading(true)
      setError(null)

      try {
        const res = await gradeApi.getStudentGrades(subjectId)
        const { sessions, grades } = res.data
        console.log(res)

        const user = grades[0]?.user?.fullName || 'Неизвестный студент'
        const scores = grades[0]?.scores || []

        const gradesData = sessions.map((session: any) => {
          const foundScore = scores.find((s: any) => s.date === session.date)
          return {
            date: session.date,
            originalDate: session.date,
            grade: foundScore ? foundScore.grade : 0,
            isPaid: foundScore?.isPaid || false,
            sessionId: session.id,
            topicTitle: session.topic?.title || null, // 🔥 добавляем тему
          }
        })

        setStudentName(user)
        setGradesByDate(gradesData)
      } catch (err) {
        console.error('Ошибка при загрузке оценок:', err)
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrades()
  }, [subjectId])

  const handlePayClick = async (date: string, sessionId?: string) => {
    if (!sessionId) return
    try {
      const res = await gradeApi.createAbsencePayment(sessionId)

      const data = res.data

      if (data.paymentLink) {
        // Открываем ссылку в новой вкладке
        window.open(data.paymentLink, '_blank')
      }

      // Обновляем состояние, что "ожидается оплата"
      setGradesByDate((prev) =>
        prev.map((g) =>
          g.sessionId === sessionId ? { ...g, isPaid: false } : g
        )
      )
    } catch (err) {
      console.error('Ошибка при обработке оплаты:', err)
      alert('Не удалось создать платёж. Попробуйте позже.')
    }
  }

  const handleAddMaterial = async () => {
    if (!activeDate) return

    try {
      // console.log('Материалы сохранены:', { linkUrl, file: selectedFile?.name })
      setShowModal(false)
      setLinkUrl('')
      setSelectedFile(null)
    } catch (err) {
      console.error('Ошибка при сохранении материалов:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (isLoading) {
    return (
      <div className={`p-6 rounded-lg border shadow-sm ${className}`}>
        <div className="h-8 w-3/4 mx-auto mb-6 bg-gray-200 rounded" />
        <div className="space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded" />
            ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`p-6 rounded-lg border border-red-200 bg-red-50 text-red-600 text-center ${className}`}
      >
        {error}
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-lg border shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {studentName}
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1">
          Журнал успеваемости
        </p>
      </div>

      {gradesByDate.length > 0 ? (
        <ul className="space-y-3 p-4">
          {gradesByDate.map((entry) => (
            <li
              key={entry.sessionId}
              className={`p-4 rounded-xl shadow-sm border transition-colors ${
                entry.grade === 0
                  ? entry.isPaid
                    ? 'bg-green-50 hover:bg-green-100 border-green-200'
                    : 'bg-red-50 hover:bg-red-100 border-red-200 cursor-pointer'
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() =>
                entry.grade === 0 &&
                !entry.isPaid &&
                handlePayClick(entry.date, entry.sessionId)
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  {entry.topicTitle ? (
                    <p className="text-gray-800 font-medium">
                      {entry.topicTitle}
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium">
                      Тема отсутствует
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  {entry.grade > 0 ? (
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      {entry.grade}
                    </span>
                  ) : entry.isPaid ? (
                    <>
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDate(entry.date)
                          setShowModal(true)
                        }}
                      >
                        +
                      </button>
                      <span className="text-green-600 font-bold">✓</span>
                    </>
                  ) : (
                    <button
                      className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePayClick(entry.date, entry.sessionId)
                      }}
                    >
                      Оплатить
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 text-center text-gray-500">
          Нет данных об оценках
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-center mb-4">
              Дополнительный материал ({activeDate})
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ссылка на материал
              </label>
              <input
                type="url"
                placeholder="https://example.com/article"
                className="w-full px-3 py-2 border rounded-md shadow-sm"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Файл с материалом
              </label>
              <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 text-center">
                <span className="text-sm text-gray-500 mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : 'Нажмите для загрузки файла'}
                </span>
                {selectedFile && (
                  <span className="text-xs text-gray-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                className="px-4 py-2 border rounded-md font-medium"
                onClick={() => {
                  setShowModal(false)
                  setLinkUrl('')
                  setSelectedFile(null)
                }}
              >
                Отмена
              </button>
              <button
                className={`px-4 py-2 bg-blue-600 text-white rounded-md font-medium ${
                  !linkUrl && !selectedFile ? 'opacity-50' : ''
                }`}
                disabled={!linkUrl && !selectedFile}
                onClick={handleAddMaterial}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
