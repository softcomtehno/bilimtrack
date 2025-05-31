import React from "react";
import { ScheduleItem, WeekType } from "@/shared/types";
import { ScheduleCell } from "./ScheduleCell";
import { DAYS_OF_WEEK, DEFAULT_TIME_SLOTS } from "@/shared/lib/utils";

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
  // Фильтруем расписание по типу недели и другим фильтрам
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

  // Группируем занятия по дням и временным слотам
  const scheduleMap: Record<string, Record<string, ScheduleItem[]>> = {};

  DAYS_OF_WEEK.forEach((day) => {
    scheduleMap[day] = {};
    DEFAULT_TIME_SLOTS.forEach((timeSlot) => {
      scheduleMap[day][timeSlot] = [];
    });
  });

  filteredSchedule.forEach((item) => {
    if (!scheduleMap[item.day][item.timeSlot]) {
      scheduleMap[item.day][item.timeSlot] = [];
    }
    scheduleMap[item.day][item.timeSlot].push(item);
  });

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
                key={day}
                className="p-2 border bg-gray-50 text-sm font-medium text-gray-700"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DEFAULT_TIME_SLOTS.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="p-2 border bg-gray-50 text-xs text-gray-600 font-medium text-center">
                {timeSlot}
              </td>
              {DAYS_OF_WEEK.map((day) => (
                <td key={`${day}-${timeSlot}`} className="p-2 w-[200px] border">
                  {scheduleMap[day][timeSlot].length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {scheduleMap[day][timeSlot].map((item) => (
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
