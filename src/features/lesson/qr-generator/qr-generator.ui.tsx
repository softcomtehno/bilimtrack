import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QRCodeSVG } from 'qrcode.react'
import { gradeApi } from '@/entities/grade'
import { Button } from '@heroui/button'

export function QRGenerator() {
  const [sessionId, setSessionId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function fetchSessionId() {
      try {
        const res = await gradeApi.getGrades(1, 1)
        const today = new Date()
          .toLocaleDateString('ru-RU')
          .split('.')
          .join('-')

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
    <>
      <div className="flex justify-end">
        <Button
          color="primary"
          onClick={() => setIsOpen(true)}
          disabled={!sessionId}
        >
          Показать QR-код
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 "
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all">
                <div className="flex justify-around">
                  <Dialog.Title className="text-2xl font-bold mb-4">
                    QR-код для отметки
                  </Dialog.Title>
                  <Button color="primary" onClick={() => setIsOpen(false)}>
                    Закрыть
                  </Button>
                </div>

                {sessionId ? (
                  <>
                    <div className="flex justify-center">
                      <QRCodeSVG value={url} size={500} />
                    </div>
                    <p className="mt-4 text-sm text-gray-500 break-words">
                      {url}
                    </p>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    Генерация QR-кода...
                  </p>
                )}

                {/* <div className="mt-6">
                  <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
