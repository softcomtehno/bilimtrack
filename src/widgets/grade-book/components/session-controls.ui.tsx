import { Button } from '@heroui/react'

export function SessionControls({
  selectedCustomDate,
  setSelectedCustomDate,
  handleCreateSession,
  handleCreateSessionWithDate,
  groupId,
  subjectId,
  QRGenerator,
}) {
  return (
    <div className="mt-10 flex justify-between r-lg:flex-col">
      <div className="flex gap-3 r-lg:flex-col r-lg:mb-5">
        <Button onClick={handleCreateSession} appearance="primary">
          Создать занятие
        </Button>
        <div className="flex flex-row-reverse gap-2 items-center">
          <input
            type="date"
            value={selectedCustomDate || ''}
            onChange={(e) => setSelectedCustomDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <Button
            appearance="primary"
            onClick={handleCreateSessionWithDate}
            disabled={!selectedCustomDate}
            className="r-lg:text-[11px] r-lg:w-full"
          >
            Создать занятие с датой
          </Button>
        </div>
      </div>
      <QRGenerator groupId={groupId} subjectId={subjectId} />
    </div>
  )
}
