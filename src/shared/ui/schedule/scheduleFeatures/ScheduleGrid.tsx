import React from "react";
import { ScheduleItem, WeekType } from "@/shared/types";
import { ScheduleCell } from "./ScheduleCell";

// Предположим, у тебя заранее определены эти массивы:
export const DAYS_OF_WEEK = [
  { index: 0, label: "Понедельник" },
  { index: 1, label: "Вторник" },
  { index: 2, label: "Среда" },
  { index: 3, label: "Четверг" },
  { index: 4, label: "Пятница" },
  // { index: 5, label: "Суббота" },
];

export const DEFAULT_TIME_SLOTS = [
  { id: 0, label: "07:30 - 08:50" },
  { id: 1, label: "09:00 - 10:20" },
  { id: 2, label: "10:30 - 11:50" },
  { id: 3, label: "12:10 - 13:30" },
  { id: 4, label: "13:40 - 15:00" },
  { id: 5, label: "15:10 - 16:30" },
  { id: 6, label: "16:40 - 18:00" },
];

interface ScheduleGridProps {
  schedule: ScheduleItem[];
  weekType: WeekType | "Обе";
  onEditItem?: (item: ScheduleItem) => void;
  onDeleteItem?: (id: string) => void;
  filteredGroupId?: string;
  filteredTeacherId?: string;
  filteredClassroomId?: string;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  schedule,
  weekType,
  onEditItem,
  onDeleteItem,
  filteredGroupId,
  filteredTeacherId,
  filteredClassroomId,
}) => {
  const filteredSchedule = schedule.filter((item) => {
    if (
      weekType !== "Обе" &&
      item.weekType !== "Обе" &&
      item.weekType !== weekType
    ) {
      return false;
    }

    if (filteredGroupId && !item.groupIds.includes(filteredGroupId)) {
      return false;
    }

    if (filteredTeacherId && item.teacherId !== filteredTeacherId) {
      return false;
    }

    if (filteredClassroomId && item.classroomId !== filteredClassroomId) {
      return false;
    }

    return true;
  });

  // Строим карту расписания: dayIndex -> lessonTimeId -> ScheduleItem[]
  const scheduleMap: Record<number, Record<number, ScheduleItem[]>> = {};

  for (const day of DAYS_OF_WEEK) {
    scheduleMap[day.index] = {};
    for (const slot of DEFAULT_TIME_SLOTS) {
      scheduleMap[day.index][slot.id] = [];
    }
  }

  for (const item of filteredSchedule) {
    // Получаем индекс дня недели по строке
    const dayIndex = DAYS_OF_WEEK.find((d) => d.label === item.day)?.index;
    // Получаем id временного слота по строке
    const slotId = DEFAULT_TIME_SLOTS.find(
      (s) => s.label === item.timeSlot
    )?.id;
    if (dayIndex !== undefined && slotId !== undefined) {
      if (!scheduleMap[dayIndex][slotId]) {
        scheduleMap[dayIndex][slotId] = [];
      }
      scheduleMap[dayIndex][slotId].push(item);
    }
  }

  return (
    <div className="overflow-x-auto" id="schedule-grid">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-24 p-2 border bg-gray-50 text-sm font-medium text-gray-700">
              Время
            </th>
            {DAYS_OF_WEEK.map((day) => (
              <th
                key={day.index}
                className="p-2 border bg-gray-50 text-sm font-medium text-gray-700"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DEFAULT_TIME_SLOTS.map((slot) => (
            <tr key={slot.id}>
              <td className="p-2 border bg-gray-50 text-xs text-gray-600 font-medium text-center">
                {slot.label}
              </td>
              {DAYS_OF_WEEK.map((day) => (
                <td
                  key={`${day.index}-${slot.id}`}
                  className="p-2 pt-6 w-[200px] border"
                >
                  {scheduleMap[day.index][slot.id].length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {scheduleMap[day.index][slot.id].map((item) => (
                        <ScheduleCell
                          key={item.id}
                          item={item}
                          onEdit={onEditItem}
                          onDelete={onDeleteItem}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-16 flex items-center justify-center text-gray-300 text-xs">
                      Нет занятий
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
