import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { gradeApi } from '@/entities/grade'

export function QRGenerator() {
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    async function fetchSessionId() {
      try {
        const res = await gradeApi.getGrades(1, 1)
        // Форматируем дату как "dd-mm-yyyy"
        const today = new Date()
          .toLocaleDateString('ru-RU') // "17.06.2025"
          .split('.')
          .join('-') // "17-06-2025"

        const session = res.data.sessions.find((s: any) => s.date === today)
        if (session) {
          setSessionId(session.sessionId)
        } else {
          console.warn('Сессия на сегодня не найдена:', today)
        }
      } catch (error) {
        console.error('Ошибка при получении sessionId:', error)
      }
    }

    fetchSessionId()
  }, [])

  const url = sessionId ? `${window.location.origin}/attend/${sessionId}` : ''

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">QR-код для отметки</h2>
      {sessionId ? (
        <>
          <QRCodeSVG value={url} size={256} />
          <p className="text-sm text-gray-500">{url}</p>
        </>
      ) : (
        <p>Генерация QR-кода...</p>
      )}
    </div>
  )
}
