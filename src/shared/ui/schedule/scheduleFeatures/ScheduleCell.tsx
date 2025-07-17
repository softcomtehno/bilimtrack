import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { ScheduleItem, LessonType } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

interface ScheduleCellProps {
  item: ScheduleItem;
  onEdit?: (item: ScheduleItem) => void;
  onDelete?: (id: string) => void;
}

export const ScheduleCell: React.FC<ScheduleCellProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const lessonTypeColors: Record<LessonType, string> = {
    Лекция: "bg-primary-100 border-primary-300 text-primary-800",
    Практика: "bg-secondary-100 border-secondary-300 text-secondary-800",
    Лаборатория: "bg-accent-100 border-accent-300 text-accent-800",
  };

  return (
    <div
      className={cn(
        "rounded-md border p-2 text-xs",
        item.weekType === "Обе"
          ? lessonTypeColors[item.lessonType]
          : item.weekType === "Числитель"
            ? "bg-gray-200 " +
              (lessonTypeColors[item.lessonType]?.replace(/bg-[^ ]+/, "") || "")
            : "bg-white " +
              (lessonTypeColors[item.lessonType]?.replace(/bg-[^ ]+/, "") || "")
      )}
    >
      <div className="font-semibold">{item.subjectName}</div>
      <div className="flex justify-between items-center mt-1">
        <div>
          <div>{item.teacherName}</div>
          <div>Ауд. {item.classroomName}</div>
          <div className="mt-1 font-medium">{item.groupNames.join(", ")}</div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex flex-col gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-1 hover:bg-black/5 rounded"
                title="Редактировать"
              >
                <Edit size={14} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 hover:bg-black/5 rounded text-error-600"
                title="Удалить"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      {item.weekType !== "Обе" && (
        <div className="mt-1 text-2xs font-semibold">
          {item.weekType === "Числитель" ? "Ч" : "З"}
        </div>
      )}
    </div>
  );
};
