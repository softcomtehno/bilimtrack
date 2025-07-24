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
    Лекция: "border-primary-300 text-primary-800",
    Практика: "border-secondary-300 text-secondary-800",
    Лаборатория: "border-accent-300 text-accent-800",
  };

  // 💡 Кастомный фон в зависимости от предмета
  const subjectBgColor =
    {
      Backend: "bg-secondary-100 border-secondary-300 text-secondary-800",
      Frontend: "bg-primary-100 border-primary-300 text-primary-800",
    }[item.subjectName] || "bg-white"; // остальные — белый фон

  const combinedStyles = cn(
    "rounded-md border p-2 text-xs relative",
    subjectBgColor
    // lessonTypeColors[item.lessonType] || ""
  );

  return (
    <div className={combinedStyles}>
      <div className="flex justify-between">
        <div className="font-semibold">{item.subjectName}</div>
        <div className="font-semibold">{item.lessonType}</div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div>
          <div className="font-semibold">Препод: {item.teacherName}</div>
          <div className="absolute top-[-18px] left-0 bg-orange-500 p-1 rounded-md text-white">
            Ауд. {item.classroomName}
          </div>
          <div className="mt-1 font-medium border p-1 border-orange-500 rounded-md">
            {item.groupNames.join(", ")}
          </div>
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
        <div className="mt-1 text-2xs font-semibold bg-orange-500 w-full text-white text-center rounded-md">
          {item.weekType === "Числитель" ? "Числитель" : "Знаменатель"}
        </div>
      )}
    </div>
  );
};
