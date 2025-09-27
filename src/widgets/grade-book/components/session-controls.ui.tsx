import { Button, DatePicker } from '@heroui/react';
import { parseDate } from '@internationalized/date';

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
    <div className="mt-10 flex justify-between items-center r-lg:flex-col  gap-3">
      <div className="flex gap-3 r-lg:flex-col r-lg:mb-5 items-center w-full ">
        <Button
          onClick={handleCreateSession}
          appearance="primary"
          className="r-lg:w-full"
        >
          Создать занятие
        </Button>

        <div className="flex flex-row-reverse gap-2 items-center w-full">
          <DatePicker
            label="Выберите дату"
            value={selectedCustomDate ? parseDate(selectedCustomDate) : null}
            onChange={(date) => {
              setSelectedCustomDate(date ? date.toString() : '');
            }}
            className="w-48 r-lg:w-full"
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
  );
}
