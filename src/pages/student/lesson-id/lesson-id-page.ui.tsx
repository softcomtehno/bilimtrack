import $api from '@/shared/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function LessonIDPage() {
  const { lessonId } = useParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )

  useEffect(() => {
    async function markAttendance() {
      try {
        await $api.post(
          'https://api.bilim-track.makalabox.com/api/attendance/mark/',
          {
            sessionId: lessonId,
          }
        )
        setStatus('success')
      } catch (err) {
        console.error('Ошибка при отметке:', err)
        setStatus('error')
      }
    }

    if (lessonId) {
      markAttendance()
    }
  }, [lessonId])

  return (
    <div className="flex justify-center items-center h-screen">
      {status === 'loading' && <p>Отмечаем вас...</p>}
      {status === 'success' && (
        <p className="text-green-600 text-xl">✅ Вы успешно отметились!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">
          ❌ Ошибка при отметке. Возможно, время истекло или вы уже отметились.
        </p>
      )}
    </div>
  )
}
